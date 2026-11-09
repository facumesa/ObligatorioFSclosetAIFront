# ClosetAI — Gestor inteligente de armario

**Desarrollo Full Stack integrado con IA — Obligatorio 2**

**Estudiante:** Facundo Mesa  
**Año:** 2026

## Descripción del proyecto

ClosetAI es una aplicación web que permite administrar un armario digital, organizar prendas de vestir y crear combinaciones de ropa (*outfits*).

La aplicación incorpora inteligencia artificial generativa para recomendar combinaciones utilizando las prendas disponibles del usuario y las condiciones meteorológicas de una ciudad seleccionada.

Este repositorio contiene el frontend desarrollado con React, correspondiente al Obligatorio 2. Se comunica mediante una API REST con el backend desarrollado en el Obligatorio 1.

## Funcionalidades principales

- **Autenticación:** registro, inicio de sesión, cierre de sesión y protección de rutas.
- **Mi Armario:** creación, visualización, edición y eliminación de prendas con imágenes almacenadas en Cloudinary.
- **Mis Outfits:** creación, edición, eliminación y visualización de combinaciones, con filtros, favoritos y paginación.
- **Recomendaciones con IA:** integración con Google Gemini para recomendar outfits utilizando prendas reales del usuario.
- **Integración meteorológica:** consulta del clima mediante Open-Meteo para adaptar las recomendaciones a la ubicación seleccionada.
- **Creación asistida:** posibilidad de convertir una recomendación de Gemini en un outfit, precargando automáticamente el formulario.
- **Panel de administración:** gestión de categorías mediante operaciones CRUD, restringidas a administradores.
- **Planes de usuario:** funcionalidades diferenciadas para usuarios Plus y Premium.
- **Dashboard:** estadísticas del armario, gráficos de distribución de prendas, resumen de outfits y clima.
- **Experiencia de usuario:** formularios validados, notificaciones toast, indicadores de carga, ventanas modales y diseño responsive.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Desarrollo de la interfaz |
| Vite | Entorno de desarrollo y compilación |
| React Router | Navegación y rutas protegidas |
| Redux Toolkit / React Redux | Estado global y caché de datos |
| React Hook Form | Gestión de formularios |
| Yup | Validaciones |
| Chart.js / React Chart.js 2 | Gráficos de estadísticas |
| React Modal | Ventanas modales |
| React Hot Toast | Notificaciones |
| React Icons | Iconografía |
| CSS | Estilos y diseño responsive |

### Servicios utilizados mediante el backend

- **MongoDB:** persistencia de usuarios, prendas, categorías y outfits.
- **Cloudinary:** almacenamiento de imágenes de prendas.
- **Google Gemini:** generación de recomendaciones mediante inteligencia artificial.
- **Open-Meteo:** obtención de datos meteorológicos.

## Instalación y ejecución local

### Requisitos

- Node.js y npm.
- Acceso a la API REST de ClosetAI.

### 1. Instalar dependencias

Desde la carpeta del frontend:

```bash
npm install
```

### 2. Configurar la API

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://obligatorio-f-scloset-ai.vercel.app
```

Esta variable define la URL del backend que utilizará el frontend.

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir en el navegador la dirección local indicada por Vite.

### 4. Generar la versión de producción

```bash
npm run build
```

La compilación se genera en la carpeta `dist/`.

Para visualizarla localmente:

```bash
npm run preview
```

## Organización del proyecto

```text
src/
├── components/
│   ├── admin/             # Administración de categorías
│   ├── auth/              # Autenticación y rutas protegidas
│   ├── dashboard/         # Panel principal y estadísticas
│   ├── layout/            # Navegación
│   ├── outfits/           # Gestión de outfits
│   ├── prendas/           # Gestión del armario
│   ├── recomendaciones/   # Recomendaciones de IA
│   ├── spinner/           # Indicadores de carga
│   └── validations/       # Schemas Yup
├── store/
│   ├── slices/            # Estados y reducers de Redux
│   └── store.js           # Configuración del store
└── App.jsx                # Rutas y estructura principal
```

La aplicación organiza sus componentes por funcionalidad. Los componentes principales administran las solicitudes a la API y el estado global, mientras que los componentes visuales presentan tarjetas, formularios, filtros y modales.

## Flujo de recomendaciones con inteligencia artificial

1. El usuario registra sus prendas en el armario digital.
2. Selecciona una ciudad para consultar las condiciones meteorológicas.
3. El frontend solicita una recomendación al backend.
4. El backend consulta las prendas del usuario y el clima, y envía esa información a Google Gemini.
5. Gemini devuelve una recomendación estructurada con identificadores de prendas.
6. El frontend muestra la combinación sugerida y permite abrir el formulario de creación de outfits con los campos precargados.
7. El usuario revisa la propuesta, selecciona una categoría y guarda el outfit.

Las recomendaciones no sustituyen la validación del formulario ni las restricciones del backend. Si el servicio de IA no está disponible, el resto de la aplicación puede continuar funcionando.

## Aplicación publicada

**Frontend:**  
https://obligatorio-f-scloset-ai-front-5iyq.vercel.app/

**Backend:**  
https://obligatorio-f-scloset-ai.vercel.app/

Ambas aplicaciones se encuentran publicadas en Vercel.

## Consideraciones

- Las rutas protegidas requieren autenticación.
- Las operaciones administrativas requieren permisos de administrador.
- El estado global se administra mediante Redux Toolkit.
- Las validaciones de formularios se realizan con Yup.
- Las claves privadas de los servicios externos se mantienen en el backend y no deben incorporarse al código del frontend.

---

**ClosetAI — Obligatorio 2, Desarrollo Full Stack integrado con IA.**
