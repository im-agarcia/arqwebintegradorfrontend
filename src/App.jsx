import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { Person as PersonIcon, Assessment as AssessmentIcon } from '@mui/icons-material';
import { Tabs, Tab, Button } from '@mui/material';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import ReportScreen from './components/ReportScreen';
import { cookieAPI } from './api';

// Configuración del tema Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [currentView, setCurrentView] = useState('usuarios'); // 'usuarios' o 'reporte'
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Verificar usuario activo al cargar la aplicación
  useEffect(() => {
    const activeUser = cookieAPI.getActiveUser();
    if (activeUser) {
      showSnackbar(`Bienvenido de vuelta, ${activeUser}!`, 'info');
    }
  }, []);

  // Mostrar notificación
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Cerrar notificación
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Abrir formulario para nuevo usuario
  const handleAddUser = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  // Abrir formulario para editar usuario
  const handleEditUser = (usuario) => {
    setEditingUser(usuario);
    setFormOpen(true);
  };

  // Cerrar formulario
  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingUser(null);
  };

  // Manejar guardado de usuario
  const handleSaveUser = (usuario) => {
    if (editingUser) {
      showSnackbar('Usuario actualizado correctamente', 'success');
    } else {
      showSnackbar('Usuario creado correctamente', 'success');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Barra de navegación */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <PersonIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ABM de Usuarios - Arquitectura Web
          </Typography>
          
          {/* Tabs de navegación */}
          <Tabs 
            value={currentView} 
            onChange={(e, newValue) => setCurrentView(newValue)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ mr: 3 }}
          >
            <Tab 
              icon={<PersonIcon />} 
              label="Usuarios" 
              value="usuarios"
              iconPosition="start"
            />
            <Tab 
              icon={<AssessmentIcon />} 
              label="Reporte" 
              value="reporte"
              iconPosition="start"
            />
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              React + Express + REST API
            </Typography>
            {/* Logo educativo con aclaración */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
              <img 
                src="/src/media/logo-up.png" 
                alt="Logo Universidad de Palermo" 
                style={{ 
                  height: '24px', 
                  width: '24px',
                  opacity: 0.7
                }} 
              />

            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sistema de Gestión de Usuarios
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Aplicación web que demuestra los conceptos de Arquitectura Web mediante un ABM (Alta, Baja, Modificación) 
            de usuarios implementado con React.js en el frontend y Node.js/Express en el backend.
          </Typography>
          
          {/* Información técnica */}
          <Box 
            sx={{ 
              bgcolor: 'grey.50', 
              p: 2, 
              borderRadius: 1, 
              border: '1px solid',
              borderColor: 'grey.200',
              mb: 3
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tecnologías Aplicadas:
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Frontend:</strong> React.js con Vite, Material UI, localStorage, cookies<br/>
              <strong>Backend:</strong> Node.js con Express, CORS, compresión GZIP<br/>
              <strong>Comunicación:</strong> HTTP REST API, JSON<br/>
              <strong>Arquitectura:</strong> Cliente-Servidor, separación de responsabilidades
            </Typography>
          </Box>
        </Box>

        {/* Contenido según la vista seleccionada */}
        {currentView === 'usuarios' ? (
          <UserTable 
            onEditUser={handleEditUser}
            onAddUser={handleAddUser}
          />
        ) : (
          <ReportScreen />
        )}

        {/* Formulario de usuario */}
        <UserForm
          open={formOpen}
          onClose={handleCloseForm}
          usuario={editingUser}
          onSave={handleSaveUser}
        />

        {/* Notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          bgcolor: 'grey.100', 
          py: 3, 
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'grey.300'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Proyecto educativo - Arquitectura Web | 
            Frontend: React + Vite | 
            Backend: Node.js + Express | 
            Persistencia: localStorage + REST API
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Optimizado con bundling (Vite), minificación y compresión GZIP
          </Typography>
          
          {/* Aclaración educativa sobre el logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, gap: 1 }}>
            <img 
              src="/src/media/logo-up.png" 
              alt="Logo Universidad de Palermo" 
              style={{ 
                height: '16px', 
                width: '16px',
                opacity: 0.6
              }} 
            />
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                fontSize: '0.7rem',
                fontStyle: 'italic',
                opacity: 0.8
              }}
            >
              Logo utilizado únicamente con fines educativos - Sin fines comerciales
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
