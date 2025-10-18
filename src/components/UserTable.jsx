import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { usuariosAPI, localStorageAPI, cookieAPI } from '../api';

const UserTable = ({ onEditUser, onAddUser }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, usuario: null });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsuarios();
  }, []);

  // Función para cargar usuarios desde el backend
  const loadUsuarios = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Intentar cargar desde el backend primero
      const response = await usuariosAPI.getAll();
      setUsuarios(response.data);
      
      // Sincronizar con localStorage
      localStorageAPI.saveUsuarios(response.data);
      
    } catch (error) {
      console.warn('Error conectando con backend, cargando desde localStorage:', error);
      
      // Si falla el backend, cargar desde localStorage
      const usuariosLocales = localStorageAPI.getUsuarios();
      setUsuarios(usuariosLocales);
      
      if (usuariosLocales.length === 0) {
        setError('No se pudo conectar con el servidor y no hay datos locales');
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar usuario
  const handleDelete = async (usuario) => {
    setDeleteDialog({ open: true, usuario });
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (!deleteDialog.usuario) return;
    
    setLoading(true);
    try {
      // Intentar eliminar desde el backend
      await usuariosAPI.delete(deleteDialog.usuario.id);
      
      // Actualizar lista local
      const updatedUsuarios = usuarios.filter(u => u.id !== deleteDialog.usuario.id);
      setUsuarios(updatedUsuarios);
      
      // Sincronizar con localStorage
      localStorageAPI.saveUsuarios(updatedUsuarios);
      
    } catch (error) {
      console.warn('Error eliminando desde backend, eliminando localmente:', error);
      
      // Si falla el backend, eliminar localmente
      const updatedUsuarios = usuarios.filter(u => u.id !== deleteDialog.usuario.id);
      setUsuarios(updatedUsuarios);
      localStorageAPI.saveUsuarios(updatedUsuarios);
    } finally {
      setLoading(false);
      setDeleteDialog({ open: false, usuario: null });
    }
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    setDeleteDialog({ open: false, usuario: null });
  };

  if (loading && usuarios.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Cargando usuarios...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header con acciones */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Gestión de Usuarios
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadUsuarios}
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Actualizar
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddUser}
          >
            Nuevo Usuario
          </Button>
        </Box>
      </Box>

      {/* Indicador de usuario activo */}
      {cookieAPI.getActiveUser() && (
        <Box mb={2}>
          <Chip
            label={`Usuario activo: ${cookieAPI.getActiveUser()}`}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      {/* Mensaje de error */}
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tabla de usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No hay usuarios registrados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((usuario) => (
                <TableRow key={usuario.id} hover>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefono || '-'}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => onEditUser(usuario)}
                      title="Editar usuario"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(usuario)}
                      title="Eliminar usuario"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={deleteDialog.open} onClose={cancelDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar al usuario{' '}
            <strong>{deleteDialog.usuario?.nombre}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
