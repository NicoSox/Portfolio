# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Backend - Configuración de correo

El formulario de contacto del portfolio utiliza un backend con Nodemailer para enviar correos electrónicos reales.

### Configuración

1. Navegar a la carpeta backend:
   ```bash
   cd backend
   npm install
   ```

2. Crear archivo `.env` basado en `.env.example` con tus credenciales:
   ```
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=tu_app_password_de_gmail
   PORT=5000
   ```

3. Para Gmail, generar App Password en: https://myaccount.google.com/apppasswords
   - Inicia sesión en tu cuenta de Google
   - Ve a "Seguridad" → "Verificación en dos pasos" (debe estar activada)
   - Busca "Contraseñas de aplicaciones"
   - Genera una nueva contraseña para "Correo"
   - Copia la contraseña de 16 caracteres generada

4. Ejecutar el servidor backend:
   ```bash
   npm start
   ```

5. El backend correrá en `http://localhost:5000`

### Uso en desarrollo

Para usar el formulario de contacto en desarrollo:

1. En una terminal, ejecuta el frontend:
   ```bash
   npm run dev
   ```

2. En otra terminal, ejecuta el backend:
   ```bash
   cd backend
   npm start
   ```

3. El formulario enviará correos al EMAIL_USER configurado en el archivo .env

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
