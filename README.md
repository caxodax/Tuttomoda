# tuttomoda - Tienda de Ropa Online

Una tienda en línea moderna y elegante construida con React y Supabase.

## 🚀 Tecnologías Utilizadas

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Zustand (Estado global)
  - React Router DOM
  - Lucide React (Iconos)
  - React Hot Toast (Notificaciones)
  - Swiper (Carrusel)
  - React Zoom Pan Pinch (Zoom de imágenes)

- **Backend:**
  - Supabase (Base de datos y autenticación)
  - PostgreSQL
  - Row Level Security (RLS)

## 📦 Instalación

1. Clona el repositorio
```bash
git clone <url-del-repositorio>
cd tuttomoda-ecommerce
```

2. Instala las dependencias
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y añade tus variables de entorno:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

4. Inicia el servidor de desarrollo
```bash
npm run dev
```

## 🌐 Despliegue

### Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una

2. Desde el Dashboard de Vercel:
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Selecciona el repositorio de tuttomoda

3. Configura las variables de entorno:
   - En la sección "Settings" > "Environment Variables"
   - Añade las siguientes variables:
     ```
     VITE_SUPABASE_URL=tu_url_de_supabase
     VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     ```

4. Despliega:
   - Vercel detectará automáticamente que es un proyecto Vite
   - Haz clic en "Deploy"

### Despliegue en Netlify

1. Crea una cuenta en [Netlify](https://netlify.com) si aún no tienes una

2. Desde el Dashboard de Netlify:
   - Haz clic en "New site from Git"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio de tuttomoda

3. Configura el despliegue:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Configura las variables de entorno:
   - Ve a Site settings > Build & deploy > Environment
   - Añade las variables:
     ```
     VITE_SUPABASE_URL=tu_url_de_supabase
     VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     ```

5. Despliega:
   - Haz clic en "Deploy site"

## 🔒 Autenticación

El panel de administración utiliza autenticación de Supabase. Para acceder: 

1. URL: `/admin/login`
2. Credenciales por defecto:
   - Email: admin@tuttomoda.com
   - Contraseña: tuttomoda2025

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
