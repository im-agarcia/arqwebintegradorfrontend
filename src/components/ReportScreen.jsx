import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { usuariosAPI, localStorageAPI } from '../api';

const ReportScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    conTelefono: 0,
    sinTelefono: 0,
    porcentajeConTelefono: 0
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    setLoading(true);
    try {
      // Intentar cargar desde el backend
      const response = await usuariosAPI.getAll();
      setUsuarios(response.data);
      calcularEstadisticas(response.data);
    } catch (error) {
      console.warn('Error conectando con backend, cargando desde localStorage:', error);
      // Si falla, cargar desde localStorage
      const usuariosLocales = localStorageAPI.getUsuarios();
      setUsuarios(usuariosLocales);
      calcularEstadisticas(usuariosLocales);
    } finally {
      setLoading(false);
    }
  };

  const calcularEstadisticas = (listaUsuarios) => {
    const total = listaUsuarios.length;
    const conTelefono = listaUsuarios.filter(u => u.telefono && u.telefono.trim() !== '').length;
    const sinTelefono = total - conTelefono;
    const porcentajeConTelefono = total > 0 ? Math.round((conTelefono / total) * 100) : 0;

    setStats({
      total,
      conTelefono,
      sinTelefono,
      porcentajeConTelefono
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Cargando reporte...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Título */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          <AssessmentIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Reporte de Usuarios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Análisis y estadísticas del sistema de gestión de usuarios
        </Typography>
      </Box>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total de Usuarios
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PhoneIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.conTelefono}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Con Teléfono
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EmailIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.sinTelefono}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sin Teléfono
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AssessmentIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.porcentajeConTelefono}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    % Con Teléfono
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Tabla detallada de usuarios */}
      <Paper elevation={2}>
        <Box p={3}>
          <Typography variant="h5" component="h2" gutterBottom>
            Listado Detallado de Usuarios
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Información completa de todos los usuarios registrados en el sistema
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Teléfono</strong></TableCell>
                  <TableCell align="center"><strong>Estado</strong></TableCell>
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
                        <Chip
                          label={usuario.telefono ? 'Completo' : 'Incompleto'}
                          color={usuario.telefono ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      {/* Resumen adicional */}
      <Box mt={4}>
        <Paper elevation={1} sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Resumen del Reporte
          </Typography>
          <Typography variant="body2" paragraph>
            Este reporte muestra un análisis completo del sistema de gestión de usuarios.
            Se incluyen estadísticas generales, porcentajes de completitud de datos y
            un listado detallado de todos los usuarios registrados.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fecha de generación:</strong> {new Date().toLocaleString('es-AR')}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ReportScreen;

