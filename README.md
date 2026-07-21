# ✨ Constelaria 🌙

> *Explorando el cosmos y la mecánica celeste a través del código.*

¡Bienvenido/a a **Constelaria**! Una plataforma web interactiva y súper completa diseñada para calcular cartas astrales, entender el zodíaco y sumergirse en el fascinante mundo de la astrología. 

🌌 **Nota importante:** Este es un **proyecto 100% personal y de aprendizaje continuo**. Nació puramente de la curiosidad técnica y el amor por el desarrollo web y el universo astrológico. No es una herramienta profesional, sino un laboratorio espacial donde el código y los astros se encuentran.

---

## 🔮 Características Principales

*   **Calculadora de Carta Astral:** Ingresando fecha, hora y lugar de nacimiento, el sistema calcula la posición exacta de los astros utilizando efemérides astronómicas reales.
*   **Diccionario Astrológico:** Una biblioteca inmersiva para aprender sobre:
    *   Los 12 Signos Zodiacales y sus Elementos (Fuego, Tierra, Aire, Agua).
    *   Los Planetas y su significado psicológico.
    *   Las 12 Casas Astrológicas.
    *   Las Constelaciones reales.
*   **Diseño Estelar:** Una interfaz inmersiva, mística y moderna, con una paleta de colores cuidadosamente seleccionada (violetas profundos de noche y acentos en dorado metálico).

---

## 🛠️ Tecnologías y Herramientas

Este proyecto está construido sobre un stack **MERN** moderno, fuertemente tipado y optimizado para una experiencia de desarrollo sin fricciones.

### Frontend
*   **React + Vite:** Para una carga veloz y un renderizado de componentes fluido.
*   **TypeScript:** Tipado estricto para evitar que los planetas se salgan de su órbita.
*   **Tailwind CSS (v4):** Estilos manejados íntegramente desde CSS moderno con la última versión del framework, creando interfaces responsivas y estéticas.
*   **Axios:** Para la comunicación telepática (HTTP) con el servidor.

### Backend
*   **Node.js & Express:** El motor principal de nuestra nave, robusto y rápido.
*   **TypeScript:** Manteniendo la coherencia de los datos astrológicos desde el servidor hasta el cliente.
*   **MongoDB & Mongoose:** Base de datos NoSQL perfecta para almacenar las infinitas combinaciones de interpretaciones astrológicas.
*   **Ephemeris:** Librería matemática pura en JavaScript para el cálculo de la mecánica celeste y posiciones planetarias (elegida específicamente para evitar problemas de compilación de binarios en entornos locales).

---

## 🚀 Despegue Rápido (Instalación Local)

Si quieres clonar este repositorio y levantar el universo en tu propia máquina, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/constelaria.git](https://github.com/tu-usuario/constelaria.git)
cd constelaria
```
### 2. Configurar el Backend

```bash
cd backend
npm install
```

* Crea un archivo `.env` en la raíz de la carpeta `backend` e incluye tus variables de entorno (como `PORT=3000` y la URI de tu base de datos MongoDB).
* Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

### 3. Configurar el Frontend
Abre una nueva terminal y navega al frontend:

```bash
cd frontend
npm install
npm run dev
```

*El frontend se levantará por defecto en `http://localhost:5173`.*

---

## 📁 Estructura del Universo (Carpetas)

El proyecto adopta una arquitectura limpia, separando claramente las responsabilidades:

- `/backend/src/controllers` - La lógica detrás de cada endpoint.
- `/backend/src/models` - Esquemas de datos para MongoDB (Signos, Planetas).
- `/backend/src/services` - Servicios complejos, incluyendo el motor de cálculo astrológico.
- `/frontend/src/components` - Piezas reutilizables de la interfaz (Header, Rueda Zodiacal).
- `/frontend/src/pages` - Vistas completas de la aplicación.
- `/frontend/src/types` - Definiciones e interfaces de TypeScript compartidas.

---

💫 *Desarrollado entre código, café y estrellas.*
