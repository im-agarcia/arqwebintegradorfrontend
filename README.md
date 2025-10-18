# ABM de Usuarios - Arquitectura Web

### Consideración previa

Profesor, quería consultarle si considera útil que incorpore un **módulo de autenticación (login)** utilizando **Firebase Authentication**.  
Vi que es una implementación bastante simple y rápida, y podría complementar el ABM de usuarios agregando registro e inicio de sesión sin alterar la estructura principal del proyecto.  
¿Le parece adecuado incluirlo o preferimos mantener el enfoque solo en el ABM y la arquitectura cliente-servidor?

## Repositorios del Proyecto

- **Frontend:** [https://github.com/im-agarcia/arqwebintegradorfrontend.git](https://github.com/im-agarcia/arqwebintegradorfrontend.git)
- **Backend:** [https://github.com/im-agarcia/arqwebintegradorbackend.git](https://github.com/im-agarcia/arqwebintegradorbackend.git)

## Inicio Rápido

```bash
# 1. Backend
cd backend
npm install
node server.js

# 2. Frontend (en nueva terminal)
cd frontend
npm install
npm run dev

# 3. Abrir navegador
# http://localhost:3000 (desarrollo)
# http://localhost:3001 (producción)
```

## Descripción del Proyecto

Este proyecto es una aplicación web completa que implementa un sistema de **ABM (Alta, Baja, Modificación)** de usuarios, desarrollado como trabajo práctico integrador para la materia **Arquitectura Web**. La aplicación demuestra los conceptos fundamentales de arquitectura cliente-servidor, comunicación HTTP, APIs REST, y optimización web.

### Propósito Educativo

- **Arquitectura Cliente-Servidor**: Separación clara entre frontend (React) y backend (Node.js/Express)
- **Comunicación HTTP**: Uso de métodos REST (GET, POST, PUT, DELETE) para operaciones CRUD
- **Optimización Web**: Implementación de bundling, minificación y compresión GZIP
- **Persistencia de Datos**: Simulación con localStorage y preparación para bases de datos reales
- **Gestión de Estado**: Uso de hooks de React y manejo de sesiones con cookies

## Estructura del Proyecto

```
tpintegrador/
├── frontend/                 # Aplicación React con Vite
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── UserTable.jsx    # Tabla de usuarios con Material UI
│   │   │   └── UserForm.jsx     # Formulario de alta/edición
│   │   ├── api.js          # Funciones de comunicación con backend
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Punto de entrada
│   ├── dist/               # Build optimizado (generado automáticamente)
│   ├── package.json
│   └── vite.config.js      # Configuración de Vite
├── backend/                 # Servidor Express
│   ├── server.js           # Servidor principal con endpoints REST
│   └── package.json
└── README.md
```

## Tecnologías Utilizadas

### Frontend
- **React.js 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de build y desarrollo
- **Material UI** - Componentes de interfaz
- **JavaScript ES6+** - Lenguaje de programación
- **localStorage** - Persistencia local de datos
- **Cookies** - Gestión de sesiones

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **CORS** - Habilitación de comunicación cross-origin
- **Compression** - Compresión GZIP
- **Cookie Parser** - Manejo de cookies

### Optimizaciones
- **Bundling** - Agrupación de archivos con Vite
- **Minificación** - Reducción del tamaño de archivos
- **Compresión GZIP** - Compresión de respuestas HTTP
- **Code Splitting** - División de código en chunks

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

### 1. Clonar los repositorios
```bash
# Clonar backend
git clone https://github.com/im-agarcia/arqwebintegradorbackend.git backend
cd backend

# Clonar frontend (en otra terminal o después)
git clone https://github.com/im-agarcia/arqwebintegradorfrontend.git frontend
cd frontend
```

---

## EJECUTAR BACKEND LOCALMENTE

### **Paso 1: Abrir Terminal**
- Abre PowerShell o CMD
- Navega al directorio del proyecto

### **Paso 2: Ir a la carpeta backend**
```bash
cd backend
```

### **Paso 3: Instalar dependencias**
```bash
npm install
```
*Esto instalará Express, CORS, compression y cookie-parser*

### **Paso 4: Ejecutar el servidor**
```bash
node server.js
```

### **Paso 5: Verificar que funciona**
Deberías ver en consola:
```
🚀 Servidor ejecutándose en http://localhost:3001
📊 API REST disponible en http://localhost:3001/api/usuarios
🌐 Frontend servido desde Express
```

### **Paso 6: Probar la API**
- Abre tu navegador en: `http://localhost:3001/api/usuarios`
- Deberías ver una respuesta JSON con los usuarios

### **Paso 7: Probar la aplicación completa**
- Abre tu navegador en: `http://localhost:3001`
- Deberías ver la interfaz de React con la tabla de usuarios

### ⚠️ **Si hay problemas:**

#### **Error: Puerto en uso**
```bash
# Encontrar proceso que usa puerto 3001
netstat -ano | findstr :3001

# Terminar proceso (reemplaza PID)
taskkill /PID <PID> /F
```

#### **Error: Módulo no encontrado**
```bash
# Asegúrate de estar en la carpeta backend
cd backend
npm install
```

### Verificación del Backend:
- Servidor ejecutándose en `http://localhost:3001`
- Mensaje en consola: `Servidor ejecutándose en http://localhost:3001`
- API disponible en `http://localhost:3001/api/usuarios`
- Frontend servido desde Express en `http://localhost:3001`

---

## EJECUTAR FRONTEND LOCALMENTE

### Opción A: Modo Desarrollo (Recomendado)
```bash
# En una nueva terminal
cd frontend
npm install
npm run dev
```
- Aplicación en `http://localhost:3000`
- Hot reload activado
- Proxy configurado para API

### Opción B: Modo Producción (Servido desde Express)
```bash
# En la carpeta frontend
npm install
npm run build

# El build se genera en frontend/dist/
# El backend ya está configurado para servir estos archivos
# Accede a http://localhost:3001 para ver la app completa
```

---

## Verificar que Todo Funciona

1. **Backend funcionando:** `http://localhost:3001/api/usuarios`
2. **Frontend funcionando:** `http://localhost:3000` (desarrollo) o `http://localhost:3001` (producción)
3. **Aplicación completa:** Deberías ver la interfaz de gestión de usuarios

## API REST Endpoints

### Base URL: `http://localhost:3001/api`

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/usuarios` | Listar todos los usuarios | - |
| `POST` | `/usuarios` | Crear nuevo usuario | `{ nombre, email, telefono }` |
| `PUT` | `/usuarios/:id` | Actualizar usuario | `{ nombre, email, telefono }` |
| `DELETE` | `/usuarios/:id` | Eliminar usuario | - |

### Ejemplo de Uso
```javascript
// Crear usuario
POST /api/usuarios
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "123456789"
}

// Respuesta
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "123456789"
  },
  "message": "Usuario creado correctamente"
}
```

## Conceptos de Arquitectura Web Aplicados

### 1. **Arquitectura Cliente-Servidor**
- **Cliente (Frontend)**: React.js ejecutándose en el navegador
- **Servidor (Backend)**: Node.js/Express ejecutándose en el servidor
- **Comunicación**: HTTP/HTTPS con JSON

### 2. **Protocolo HTTP y REST**
- **GET**: Obtener recursos (listar usuarios)
- **POST**: Crear recursos (nuevo usuario)
- **PUT**: Actualizar recursos (modificar usuario)
- **DELETE**: Eliminar recursos (eliminar usuario)
- **Códigos de Estado**: 200, 201, 400, 404, 500

### 3. **Separación de Responsabilidades**
- **Frontend**: Interfaz de usuario, validación, experiencia del usuario
- **Backend**: Lógica de negocio, validación de datos, API REST
- **Comunicación**: Capa de abstracción con funciones API

### 4. **Persistencia de Datos**
- **localStorage**: Simulación de base de datos local
- **Sincronización**: Backend como fuente de verdad, localStorage como caché
- **Preparación**: Comentarios para integración con Firebase/MongoDB

## Optimizaciones Implementadas

### 1. **Bundling con Vite**
- **Code Splitting**: Separación de vendor, MUI y código de aplicación
- **Tree Shaking**: Eliminación de código no utilizado
- **Hot Module Replacement**: Recarga rápida en desarrollo

### 2. **Minificación**
- **Terser**: Minificación de JavaScript
- **CSS Minification**: Compresión de estilos
- **Tamaño Final**: ~400KB total (comprimido: ~120KB)

### 3. **Compresión GZIP**
- **Express Compression**: Compresión automática de respuestas
- **Reducción**: ~70% de reducción en tamaño de transferencia
- **Headers**: `Content-Encoding: gzip`

## Integración con Bases de Datos Reales

### Firebase (Comentado en el código)
```javascript
// Backend - server.js
const admin = require('firebase-admin');
const db = admin.firestore();

// Operaciones CRUD
db.collection('usuarios').add(nuevoUsuario);
db.collection('usuarios').doc(id).update(datos);
db.collection('usuarios').doc(id).delete();
```

### MongoDB (Comentado en el código)
```javascript
// Backend - server.js
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Operaciones CRUD
Usuario.create(nuevoUsuario);
Usuario.findByIdAndUpdate(id, datos);
Usuario.findByIdAndDelete(id);
```

## PWA (Progressive Web App) - Preparación

Para convertir en PWA, se podría implementar:
1. **Manifest.json**: Metadatos de la aplicación
2. **Service Worker**: Funcionalidad offline
3. **Cache API**: Almacenamiento de recursos
4. **Notificaciones Push**: Alertas del sistema

## Despliegue Gratuito

### Backend en Render.com
1. Conectar repositorio GitHub: `https://github.com/im-agarcia/arqwebintegradorbackend.git`
2. Configurar build: `npm install`
3. Configurar start: `node server.js`
4. URL: `https://tu-app.onrender.com`

### Frontend en Netlify
1. Conectar repositorio GitHub: `https://github.com/im-agarcia/arqwebintegradorfrontend.git`
2. Build command: `npm run build`
3. Publish directory: `dist`
4. URL: `https://tu-app.netlify.app`

### Configuración de Variables de Entorno
```bash
# Backend
API_URL=https://tu-backend.onrender.com

# Frontend
VITE_API_URL=https://tu-backend.onrender.com
```

## Métricas de Rendimiento

### Build de Producción
- **Tamaño Total**: ~400KB
- **Tamaño Comprimido**: ~120KB
- **Tiempo de Build**: ~18 segundos
- **Chunks**: 3 (vendor, mui, app)

### Optimizaciones Aplicadas
- Minificación de JavaScript
- Compresión GZIP
- Code Splitting
- Tree Shaking
- Caching de recursos estáticos

## Testing y Validación

### Funcionalidades Implementadas
- CRUD completo de usuarios
- Validación de formularios
- Manejo de errores
- Persistencia local
- Gestión de sesiones
- Interfaz responsive

### Casos de Uso
1. **Crear Usuario**: Formulario con validación
2. **Listar Usuarios**: Tabla con Material UI
3. **Editar Usuario**: Formulario pre-poblado
4. **Eliminar Usuario**: Confirmación con diálogo
5. **Sincronización**: Backend + localStorage

## Recursos de Aprendizaje

### Arquitectura Web
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [REST API Design](https://restfulapi.net/)
- [Cliente-Servidor Architecture](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)

### React y Node.js
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)

### Optimización Web
- [Web Performance](https://web.dev/performance/)
- [Bundle Analysis](https://webpack.js.org/guides/code-splitting/)

## Contribuciones

Este es un proyecto educativo. Para contribuir:
1. Fork del repositorio
2. Crear rama feature
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request


---

**Desarrollado para la materia Arquitectura Web**  
*Demostrando conceptos de cliente-servidor, HTTP, REST y optimización web*
