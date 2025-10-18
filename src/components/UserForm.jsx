import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { usuariosAPI, localStorageAPI, cookieAPI } from '../api';

const UserForm = ({ open, onClose, usuario, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Resetear formulario cuando se abre/cierra
  useEffect(() => {
    if (open) {
      if (usuario) {
        // Modo edición
        setFormData({
          nombre: usuario.nombre || '',
          email: usuario.email || '',
          telefono: usuario.telefono || ''
        });
      } else {
        // Modo creación
        setFormData({
          nombre: '',
          email: '',
          telefono: ''
        });
      }
      setError(null);
      setSuccess(false);
    }
  }, [open, usuario]);

  // Manejar cambios en los campos del formulario
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Limpiar errores al escribir
    if (error) setError(null);
  };

  // Validar formulario
  const validateForm = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El email no tiene un formato válido');
      return false;
    }
    
    return true;
  };

  // Manejar envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (usuario) {
        // Modo edición - PUT request
        response = await usuariosAPI.update(usuario.id, formData);
      } else {
        // Modo creación - POST request
        response = await usuariosAPI.create(formData);
      }
      
      // Mostrar mensaje de éxito
      setSuccess(true);
      
      // Simular guardado de sesión en cookie (solo para nuevos usuarios)
      if (!usuario) {
        cookieAPI.setActiveUser(formData.nombre);
      }
      
      // Notificar al componente padre
      onSave(response.data);
      
      // Cerrar formulario después de un breve delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Error guardando usuario:', error);
      setError(error.message || 'Error al guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cierre del formulario
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
          </Typography>
          <IconButton onClick={handleClose} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            {/* Campo Nombre */}
            <TextField
              label="Nombre *"
              value={formData.nombre}
              onChange={handleChange('nombre')}
              fullWidth
              required
              disabled={loading}
              helperText="Nombre completo del usuario"
            />
            
            {/* Campo Email */}
            <TextField
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              fullWidth
              required
              disabled={loading}
              helperText="Dirección de correo electrónico"
            />
            
            {/* Campo Teléfono */}
            <TextField
              label="Teléfono"
              value={formData.telefono}
              onChange={handleChange('telefono')}
              fullWidth
              disabled={loading}
              helperText="Número de teléfono (opcional)"
            />
            
            {/* Mensajes de estado */}
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success">
                {usuario ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente'}
              </Alert>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={handleClose} 
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Guardando...' : (usuario ? 'Actualizar' : 'Crear')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;
