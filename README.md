# Intranet para Flujo de Datos
 
Plataforma interna diseñada para gestionar, monitorear y optimizar el flujo de datos dentro de la organización. Este proyecto proporciona herramientas centralizadas para facilitar la integración, procesamiento y visualización de datos entre diferentes sistemas y departamentos.
 
## Descripción General
 
La Intranet para Flujo de Datos es una solución empresarial que permite a los equipos:
- Monitorear el estado de pipelines de datos en tiempo real
- Gestionar transferencias de datos entre sistemas
- Visualizar métricas y estadísticas de procesamiento
- Registrar y auditar operaciones de datos
- Colaborar en tareas relacionadas con datos
## Características Principales
 
### Gestión de Pipelines
- Crear y configurar pipelines de datos personalizados
- Monitoreo en tiempo real del estado y progreso
- Alertas automáticas ante anomalías o fallos
- Historial completo de ejecuciones
### Visualización de Datos
- Dashboards interactivos y personalizables
- Gráficas de métricas de desempeño
- Reportes detallados por período
- Exportación de datos en múltiples formatos
### Control de Acceso
- Autenticación segura integrada
- Control de permisos basado en roles
- Auditoría de accesos y operaciones
- Gestión de usuarios y grupos
### Integración
- API REST para integración con sistemas externos
- Conectores predefinidos para bases de datos comunes
- Soporte para múltiples formatos de datos
- Webhooks para automatizaciones
## Requisitos del Sistema
 
### Software
- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB >= 4.4 (o base de datos compatible)
- Redis >= 5.0 (opcional, para caché)
### Hardware Recomendado
- Procesador: Mínimo 2 cores
- RAM: Mínimo 4GB
- Almacenamiento: 20GB disponibles
### Navegadores Soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
## Instalación
 
### 1. Clonar el Repositorio
 
```bash
git clone https://github.com/DanielBernadPenuelas/Intranet_para_flujo_de_datos.git
cd Intranet_para_flujo_de_datos
```
 
### 2. Instalar Dependencias
 
```bash
npm install
```
 
### 3. Configurar Variables de Entorno
 
Crear archivo `.env` en la raíz del proyecto:
 
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/intranet_datos
REDIS_URL=redis://localhost:6379
JWT_SECRET=tu_clave_secreta_aqui
API_BASE_URL=http://localhost:3000
```
 
### 4. Inicializar Base de Datos
 
```bash
npm run setup:db
```
 
### 5. Iniciar la Aplicación
 
```bash
npm start
```
 
La aplicación estará disponible en `http://localhost:3000`
 
## Estructura del Proyecto
 
```
Intranet_para_flujo_de_datos/
├── src/
│   ├── api/                 # Rutas y controladores REST
│   ├── models/              # Esquemas de bases de datos
│   ├── services/            # Lógica de negocio
│   ├── middlewares/         # Middlewares personalizados
│   ├── utils/               # Funciones auxiliares
│   └── config/              # Configuraciones
├── public/                  # Archivos estáticos
├── views/                   # Templates HTML
├── tests/                   # Tests unitarios e integración
├── docs/                    # Documentación adicional
├── .env.example             # Variables de entorno de ejemplo
├── package.json
└── README.md
```
 
## Uso
 
### Acceso Inicial
 
1. Abrir `http://localhost:3000` en el navegador
2. Usar credenciales de administrador por defecto (ver documentación de instalación)
3. Cambiar contraseña al primer acceso
### Crear un Pipeline
 
1. Navegar a "Pipelines" en el menú principal
2. Hacer clic en "Nuevo Pipeline"
3. Configurar fuente de datos y destino
4. Definir reglas de transformación (si aplica)
5. Guardar y activar el pipeline
### Monitorear Ejecuciones
 
1. Ir a "Monitor" en el dashboard
2. Seleccionar el pipeline a revisar
3. Ver estadísticas en tiempo real
4. Descargar reportes de ejecución
## API
 
### Endpoints Principales
 
#### Autenticación
```
POST   /api/auth/login          - Iniciar sesión
POST   /api/auth/logout         - Cerrar sesión
POST   /api/auth/refresh        - Renovar token
```
 
#### Pipelines
```
GET    /api/pipelines            - Listar pipelines
POST   /api/pipelines            - Crear pipeline
GET    /api/pipelines/:id        - Obtener detalles
PUT    /api/pipelines/:id        - Actualizar pipeline
DELETE /api/pipelines/:id        - Eliminar pipeline
POST   /api/pipelines/:id/run    - Ejecutar pipeline
```
 
#### Monitoreo
```
GET    /api/monitor/status       - Estado general del sistema
GET    /api/executions           - Historial de ejecuciones
GET    /api/executions/:id       - Detalles de ejecución
GET    /api/metrics              - Métricas agregadas
```
 
Para documentación completa de la API, consultar `/api/docs`
 
## Desarrollo
 
### Scripts Disponibles
 
```bash
npm start              # Inicia la aplicación en producción
npm run dev            # Inicia en modo desarrollo con hot reload
npm test               # Ejecuta todos los tests
npm run test:watch     # Ejecuta tests en modo observación
npm run lint           # Verifica el código con ESLint
npm run build          # Compila para producción
npm run db:migrate     # Ejecuta migraciones de base de datos
```
 
### Contribuir
 
1. Crear una rama para tu feature: `git checkout -b feature/mi-feature`
2. Commit los cambios: `git commit -am 'Agregar nueva feature'`
3. Push a la rama: `git push origin feature/mi-feature`
4. Abrir un Pull Request
### Estándares de Código
 
- Usar ESLint para validación
- Seguir convenciones de nombres camelCase
- Comentar funciones complejas
- Escribir tests para nuevas funcionalidades
## Seguridad
 
- Todas las conexiones se realizan bajo HTTPS en producción
- Las contraseñas se almacenan con hash bcrypt
- Validación de entrada en todos los endpoints
- Protección contra CSRF activada
- Rate limiting para prevenir abuso
- Auditoría completa de operaciones sensibles
Para reportar vulnerabilidades, contactar a los mantenedores de forma privada.
 
## Rendimiento
 
### Optimizaciones Implementadas
 
- Caché en Redis para consultas frecuentes
- Paginación en endpoints que retornan muchos registros
- Indexación optimizada en bases de datos
- Compresión GZIP en respuestas HTTP
- CDN para activos estáticos
### Monitoreo
 
La aplicación incluye herramientas integradas para monitorear:
- Tiempo de respuesta de endpoints
- Uso de memoria y CPU
- Cantidad de conexiones activas
- Errores y excepciones
## Troubleshooting
 
### Problema: No se conecta a la base de datos
 
Verificar:
- Que MongoDB está en ejecución
- Que la URL en `.env` es correcta
- Permisos de autenticación
### Problema: Pipelines fallan aleatoriamente
 
Posibles causas:
- Timeout de conexión (aumentar en configuración)
- Recursos insuficientes del servidor
- Datos malformados en la fuente
### Problema: Dashboard lento
 
Soluciones:
- Verificar estado de Redis
- Reducir rango de fechas en reportes
- Aumentar recursos del servidor
 
## Changelog
 
### Versión 1.0.0 (2024)
- Lanzamiento inicial
- Características core de gestión de pipelines
- Dashboard básico de monitoreo
- API REST completa
---
 
Última actualización: 2026
