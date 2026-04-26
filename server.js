import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors()); 
app.use(express.json());

// 1. Función auxiliar para manejar rangos de fechas
function getMonthBounds(year, monthIndex) {
  const start = new Date(year, monthIndex, 1);
  const end = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

// 2. Ruta principal con lógica de previsión real
app.get('/api/presupuesto', async (req, res) => {
  try {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); 

    // Definir los periodos para la comparativa
    const basePeriod = getMonthBounds(currentYear, currentMonth);
    const historicBasePeriod = getMonthBounds(currentYear - 1, currentMonth);
    const historicTargetPeriod = getMonthBounds(currentYear - 1, currentMonth + 1);

    // 3. Ejecutar las consultas a SQL Server en paralelo
    const [baseData, histBaseData, histTargetData] = await Promise.all([
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { date: { gte: basePeriod.start, lte: basePeriod.end } }
      }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { date: { gte: historicBasePeriod.start, lte: historicBasePeriod.end } }
      }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { date: { gte: historicTargetPeriod.start, lte: historicTargetPeriod.end } }
      })
    ]);

    // 4. Extraer totales (si no hay datos, valor por defecto es 0)
    const currentRevenue = baseData._sum.amount || 0;
    const histBaseRevenue = histBaseData._sum.amount || 0;
    const histTargetRevenue = histTargetData._sum.amount || 0;

    // 5. Cálculo matemático de la tendencia
    let trend = 0;
    if (histBaseRevenue > 0) {
      trend = (histTargetRevenue - histBaseRevenue) / histBaseRevenue;
    }

    const forecast = currentRevenue * (1 + trend);
    const nextMonthName = new Date(currentYear, currentMonth + 1, 1)
      .toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    // 6. Enviar datos reales al frontend
    res.json({
      mesObjetivo: nextMonthName,
      prevision: forecast,
      tendenciaPorcentaje: (trend * 100).toFixed(2)
    });

  } catch (error) {
    console.error("Error en la base de datos:", error);
    res.status(500).json({ error: 'Error interno conectando con SQL Server' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend conectado y escuchando en http://localhost:${PORT}`);
});