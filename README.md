# Desarrollo de una Plataforma de Software Integrada para Asistir en la Gestión de Parques Eólicos mediante Visualización y Análisis de Datos Geoespaciales y Meteorológicos

## Trabajo Fin de Máster

### Información General

- **Autor:** John Alberto López Hernández
- **Tutor:** Juan Carlos Torres Cantero
- **Fecha de Lectura:** 15/09/2024
- **Institución:** Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación, Universidad de Granada

### Resumen

Este Trabajo Fin de Máster presenta el desarrollo de una plataforma web innovadora para la visualización y análisis de variables meteorológicas en parques eólicos. El proyecto aborda los desafíos en la gestión de grandes volúmenes de datos meteorológicos mediante la integración de tecnologías modernas de procesamiento y visualización.

Características principales:
- Optimización del almacenamiento y acceso a datos utilizando el formato Zarr.
- Reducción superior al 50% en el tamaño de almacenamiento.
- Mejora significativa en los tiempos de acceso a datos.
- Implementación de una API en Python con FastAPI para acceso eficiente a datos históricos.
- Integración de GeoServer para la visualización geoespacial de capas NetCDF diarias.
- Interfaz de usuario desarrollada en React.js, ofreciendo visualizaciones interactivas y responsivas.

Este trabajo contribuye al sector de la energía eólica proporcionando una herramienta avanzada para la gestión de datos meteorológicos, con el potencial de mejorar la eficiencia operativa y la toma de decisiones en parques eólicos.

### Objetivos

1. Optimizar el almacenamiento y acceso a datos meteorológicos.
2. Desarrollar una API eficiente para el acceso a datos históricos.
3. Implementar un sistema avanzado de visualización geoespacial.
4. Diseñar y desarrollar una interfaz de usuario intuitiva y responsiva.
5. Evaluar la usabilidad y efectividad de la plataforma mediante pruebas con expertos.

### Estructura del Proyecto

Entiendo. Aquí tienes el README completo en un solo mensaje de consola, sin divisiones:
Copy# Desarrollo de una Plataforma de Software Integrada para Asistir en la Gestión de Parques Eólicos mediante Visualización y Análisis de Datos Geoespaciales y Meteorológicos

## Trabajo Fin de Máster

### Información General

- **Autor:** John Alberto López Hernández
- **Tutor:** Juan Carlos Torres Cantero
- **Fecha de Lectura:** 15/09/2024
- **Institución:** Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación, Universidad de Granada

### Resumen

Este Trabajo Fin de Máster presenta el desarrollo de una plataforma web innovadora para la visualización y análisis de variables meteorológicas en parques eólicos. El proyecto aborda los desafíos en la gestión de grandes volúmenes de datos meteorológicos mediante la integración de tecnologías modernas de procesamiento y visualización.

Características principales:
- Optimización del almacenamiento y acceso a datos utilizando el formato Zarr.
- Reducción superior al 50% en el tamaño de almacenamiento.
- Mejora significativa en los tiempos de acceso a datos.
- Implementación de una API en Python con FastAPI para acceso eficiente a datos históricos.
- Integración de GeoServer para la visualización geoespacial de capas NetCDF diarias.
- Interfaz de usuario desarrollada en React.js, ofreciendo visualizaciones interactivas y responsivas.

Este trabajo contribuye al sector de la energía eólica proporcionando una herramienta avanzada para la gestión de datos meteorológicos, con el potencial de mejorar la eficiencia operativa y la toma de decisiones en parques eólicos.

### Objetivos

1. Optimizar el almacenamiento y acceso a datos meteorológicos.
2. Desarrollar una API eficiente para el acceso a datos históricos.
3. Implementar un sistema avanzado de visualización geoespacial.
4. Diseñar y desarrollar una interfaz de usuario intuitiva y responsiva.
5. Evaluar la usabilidad y efectividad de la plataforma mediante pruebas con expertos.

### Estructura del Proyecto
.
├── API/
│   ├── .github/workflows/
│   ├── pycache/
│   ├── .gitignore
│   ├── api.py
│   ├── api_manager.py
│   ├── pt2zarr.py
│   ├── README.md
│   ├── requirements.txt
│   ├── startup.sh
│   ├── variables.env
│   └── variables_properties.csv
└── MeteoVizor/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── common/
│   ├── components/
│   ├── constant/
│   ├── context/
│   ├── hooks/
│   ├── layout/
│   ├── pages/
│   ├── routes/
│   ├── types/
│   └── utils/
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts

### Componentes Principales

1. **API (Backend)**
   - Desarrollado en Python utilizando FastAPI.
   - `api.py`: Punto de entrada de la API.
   - `api_manager.py`: Lógica principal de la API.
   - `pt2zarr.py`: Script para conversión de datos a formato Zarr.

2. **MeteoVizor (Frontend)**
   - Desarrollado en React con TypeScript y Vite.
   - `src/`: Contiene todo el código fuente del frontend.
   - `public/`: Archivos estáticos y recursos públicos.

### Tecnologías Utilizadas

- **Backend:** 
  - Python (FastAPI)
  - Zarr para optimización de almacenamiento
  - GeoServer para servicios de mapas
- **Frontend:** 
  - React
  - TypeScript
  - Vite
  - ECharts para visualizaciones
  - Leaflet para mapas interactivos
- **Estilos:** SCSS
- **Gestión de Estado:** React Context
- **Control de Versiones:** Git
- **Despliegue:** Azure (para almacenamiento en la nube)

### Instalación y Uso

#### Requisitos Previos
- Python 3.8+
- Node.js 14+
- npm o yarn

#### API (Backend)

1. Navega al directorio `API/`:
cd API

2. Instala las dependencias:
pip install -r requirements.txt

3. Configura las variables de entorno en `variables.env`
4. Ejecuta la API:

python api.py

#### MeteoVizor (Frontend)

1. Navega al directorio `MeteoVizor/`:
2. Instala las dependencias:
npm install
3. Inicia el servidor de desarrollo:
npm run dev

### Funcionalidades Principales

- Visualización interactiva de datos meteorológicos en mapas.
- Análisis de series temporales de variables meteorológicas.
- Comparación de datos entre diferentes ubicaciones geográficas.
- Acceso eficiente a datos históricos mediante API optimizada.
- Interfaz de usuario intuitiva para exploración de datos.

### Resultados y Logros

- Reducción del 60% en el tamaño de almacenamiento de datos.
- Mejora significativa en los tiempos de acceso a datos.
- Interfaz de usuario con alta puntuación en evaluaciones de usabilidad (8.8/10).
- Integración exitosa de múltiples tecnologías para una solución completa.

### Contribuciones

Este proyecto es parte de un Trabajo Fin de Máster y no está abierto a contribuciones externas en este momento. Sin embargo, se agradecen comentarios y sugerencias para mejoras futuras.

### Licencia

[Información sobre la licencia del proyecto]

### Contacto

John Alberto López Hernández - [johnalbh@correo.urg.es]

### Agradecimientos

- Juan Carlos Torres Cantero, por su guía y supervisión como tutor del proyecto.
- La Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación de la Universidad de Granada, por proporcionar los recursos y el apoyo necesarios para este trabajo.
