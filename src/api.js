// api.js - Funciones para comunicación con el backend
// Aplica el patrón Cliente-Servidor: el frontend (cliente) se comunica con el backend (servidor) via HTTP

const API_BASE_URL = 'http://localhost:3001/api';

// Función genérica para hacer requests HTTP
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error en la petición');
    }
    
    return data;
  } catch (error) {
    console.error('Error en API request:', error);
    throw error;
  }
};

// CRUD de usuarios - Implementa REST API
export const usuariosAPI = {
  // GET - Obtener todos los usuarios
  getAll: () => apiRequest('/usuarios'),
  
  // POST - Crear nuevo usuario
  create: (usuario) => apiRequest('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  }),
  
  // PUT - Actualizar usuario existente
  update: (id, usuario) => apiRequest(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(usuario),
  }),
  
  // DELETE - Eliminar usuario
  delete: (id) => apiRequest(`/usuarios/${id}`, {
    method: 'DELETE',
  }),
};

// Funciones para localStorage (simulación de persistencia)
export const localStorageAPI = {
  // Guardar usuarios en localStorage
  saveUsuarios: (usuarios) => {
    try {
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      return true;
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
      return false;
    }
  },
  
  // Obtener usuarios de localStorage
  getUsuarios: () => {
    try {
      const usuarios = localStorage.getItem('usuarios');
      return usuarios ? JSON.parse(usuarios) : [];
    } catch (error) {
      console.error('Error leyendo de localStorage:', error);
      return [];
    }
  },
  
  // Limpiar localStorage
  clearUsuarios: () => {
    try {
      localStorage.removeItem('usuarios');
      return true;
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
      return false;
    }
  },
};

// Funciones para manejo de cookies (simulación de sesión)
export const cookieAPI = {
  // Guardar nombre de usuario activo en cookie
  setActiveUser: (nombre) => {
    try {
      document.cookie = `activeUser=${encodeURIComponent(nombre)}; path=/; max-age=86400`; // 24 horas
      return true;
    } catch (error) {
      console.error('Error guardando cookie:', error);
      return false;
    }
  },
  
  // Obtener nombre de usuario activo de cookie
  getActiveUser: () => {
    try {
      const cookies = document.cookie.split(';');
      const activeUserCookie = cookies.find(cookie => 
        cookie.trim().startsWith('activeUser=')
      );
      
      if (activeUserCookie) {
        return decodeURIComponent(activeUserCookie.split('=')[1]);
      }
      return null;
    } catch (error) {
      console.error('Error leyendo cookie:', error);
      return null;
    }
  },
  
  // Limpiar cookie de usuario activo
  clearActiveUser: () => {
    try {
      document.cookie = 'activeUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return true;
    } catch (error) {
      console.error('Error limpiando cookie:', error);
      return false;
    }
  },
};

/*
INTEGRACIÓN CON FIREBASE:
Para integrar Firebase en el frontend, se podría:

1. Instalar Firebase:
   npm install firebase

2. Configurar Firebase:
   import { initializeApp } from 'firebase/app';
   import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
   
   const firebaseConfig = {
     // Configuración de Firebase
   };
   
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

3. Reemplazar las funciones de API:
   - getAll: getDocs(collection(db, 'usuarios'))
   - create: addDoc(collection(db, 'usuarios'), usuario)
   - update: updateDoc(doc(db, 'usuarios', id), usuario)
   - delete: deleteDoc(doc(db, 'usuarios', id))

4. Manejar autenticación con Firebase Auth para sesiones reales

PWA (Progressive Web App):
Para convertir en PWA, se podría:

1. Crear manifest.json
2. Implementar Service Worker
3. Agregar funcionalidades offline
4. Usar Cache API para almacenar datos localmente
5. Implementar notificaciones push
*/
