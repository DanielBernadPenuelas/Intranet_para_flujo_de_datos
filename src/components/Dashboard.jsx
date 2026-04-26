import React, { useState, useEffect } from 'react';

// Componente reutilizable para las tarjetas de datos
const StatCard = ({ title, value, change, isPositive, loading, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow min-h-[160px] flex flex-col justify-between">
    <div>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
      {loading ? (
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-gray-800">{value}</span>
          {change !== undefined && (
            <span className={`text-sm font-bold px-2 py-1 rounded-md ${parseFloat(change) >= 0 ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
              {parseFloat(change) >= 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>
      )}
    </div>
    <p className="text-xs text-gray-400 mt-4 border-t border-gray-50 pt-4">
      {loading ? "Cargando..." : description}
    </p>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Petición al servidor Node.js
  useEffect(() => {
    const fetchPresupuesto = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/presupuesto');
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPresupuesto();
  }, []);

  // Formateador de moneda (Euro)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-left">
      
      {/* Barra Lateral Estilo Intranet */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            GymNet
          </h2>
          <p className="text-xs text-gray-400 mt-1">Alternativa a PowerAutomate</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md cursor-pointer">
            Dashboard
          </div>
          <div className="flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-lg transition-colors cursor-pointer">
            Socios
          </div>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-800">'flujo de datos gimnasio DEMO'</h1>
            <p className="text-gray-500 mt-1">Gestión automatizada de previsiones y tendencias del centro.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
            <span className="text-sm font-medium text-gray-600">
              {error ? 'Error de Conexión' : 'Servidor Activo'}
            </span>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p className="font-bold">Atención:</p>
            <p>No se pudo obtener la previsión. Verifica que el servidor y Docker estén activos.</p>
          </div>
        )}

        {/* Panel de Métricas Reales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title={`Previsión ${data?.mesObjetivo || ''}`}
            value={data ? formatCurrency(data.prevision) : '--'}
            change={data?.tendenciaPorcentaje}
            isPositive={data?.tendenciaPorcentaje >= 0}
            loading={loading}
            description="Basado en tendencia interanual y cuotas actuales"
          />

          <StatCard 
            title="Estado de Cobros"
            value="Al día"
            loading={loading}
            description="Sincronizado con SQL Server"
          />

          <StatCard 
            title="Sincronización"
            value="100%"
            loading={loading}
            description="Última actualización: hace un momento"
          />
        </div>

        {/* Espacio para lista de socios o logs de automatización */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Actividad de Flujo de Datos</h3>
          <div className="border-t border-gray-50 pt-4 text-sm text-gray-500">
            El sistema está analizando los registros de pagos en el contenedor Docker para proyectar el cierre de mes...
          </div>
        </div>
      </main>
    </div>
  );
}