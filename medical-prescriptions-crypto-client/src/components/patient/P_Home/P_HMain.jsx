import { Stack, Card, CardContent, List, ListItemButton, Divider, Typography } from '@mui/material';
import Header from '../../layout/Header';
import Subtitle from '../../layout/Subtitle';
import PatientInformation from './PatientInformation';
import PrescriptionHistory from './PrescriptionHistory';
import Usuario from '../../../services/user/Usuario';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/Auth/AuthContext';

function P_HMain() {
  /* DATOS ESTÁTICOS DE PRUEBA ------------------------------- */
  const datosPaciente = {
    nombre: 'Carlos Pérez',
    curp: 'PEPC850101HDFRRN03',
    sexo: 'Masculino',
    fechaNacimiento: '1985-01-01',
    correo: 'carlos.perez@example.com',
    telefono: '555-123-4567',
  };

  const recetas = [
    {
      id: 'RX1001',
      fechaEmision: '2025-06-10',
      clinica: 'IMSS Hospital General 25',
      matricula: 'ABC123456',
      curp: 'PEPC850101HDFRRN03',
      nombrePaciente: 'Carlos Pérez',
      fechaNacimiento: '1985-01-01',
      cedulaMedico: '1234567',
      nombreMedico: 'Dra. Ana López',
      especialidad: 'Medicina Familiar',
      surtida: false,
      fechaSurtido: '2025-06-11',
      diagnostico: 'Faringitis aguda',
      tratamiento: [
        {
          nombre: 'Ibuprofeno',
          dosis: '400mg',
          frecuencia: 'Cada 8 horas',
          duracion: '5 días',
        }
      ],
      firmas: {
        medico: 'MEFI-abc123xyz',
        farmaceutico: null 
      }
    },
    {
      id: 'RX1002',
      fechaEmision: '2025-05-20',
      clinica: 'Centro Médico Siglo XXI',
      matricula: 'XYZ789101',
      curp: 'PEPC850101HDFRRN03',
      nombrePaciente: 'Carlos Pérez',
      fechaNacimiento: '1985-01-01',
      sexo: 'Masculino',
      cedulaMedico: '7654321',
      nombreMedico: 'Dr. Luis Martínez',
      especialidad: 'Cardiología',
      surtida: false,
      fechaSurtido: '',
      diagnostico: 'Hipertensión arterial',
      tratamiento: [
        {
          nombre: 'Losartán',
          dosis: '50mg',
          frecuencia: 'Cada 24 horas',
          duracion: '30 días',
        }
      ],
      firmas: {
        medico: 'MEFI-def456uvw',
        farmaceutico: null
      }
    },
    {
      id: 'RX1003',
      fechaEmision: '2025-06-15',
      clinica: 'UMF 32 IMSS',
      matricula: 'DEF112233',
      curp: 'PEPC850101HDFRRN03',
      nombrePaciente: 'Carlos Pérez',
      fechaNacimiento: '1985-01-01',
      cedulaMedico: '2345678',
      nombreMedico: 'Dr. Hugo Sánchez',
      especialidad: 'Pediatría',
      surtida: false,
      fechaSurtido: '',
      diagnostico: 'Alergia estacional',
      tratamiento: [
        {
          nombre: 'Loratadina',
          dosis: '10mg',
          frecuencia: 'Cada 24 horas',
          duracion: '7 días',
        }
      ],
      firmas: {
        medico: 'MEFI-ghi789rst',
        farmaceutico: null
      }
    },
    {
      id: 'RX1004',
      fechaEmision: '2025-06-01',
      clinica: 'Hospital Regional IMSS 34',
      matricula: 'LMN445566',
      curp: 'PEPC850101HDFRRN03',
      nombrePaciente: 'Carlos Pérez',
      fechaNacimiento: '1985-01-01',
      cedulaMedico: '8765432',
      nombreMedico: 'Dra. Paula Gómez',
      especialidad: 'Dermatología',
      surtida: true,
      fechaSurtido: '2025-06-02',
      diagnostico: 'Dermatitis atópica',
      tratamiento: [
        {
          nombre: 'Hidrocortisona crema',
          dosis: 'Aplicar capa delgada',
          frecuencia: '2 veces al día',
          duracion: '10 días',
        }
      ],
      firmas: {
        medico: 'MEFI-jkl012mno',
        farmaceutico: 'FAFI-xyz987cba'
      }
    }
  ];
  /* DATOS ESTÁTICOS DE PRUEBA ------------------------------- */

  {/* Cambios de back hechos por aarón ------------------------- */}
  // const { auth } = useAuth();

  // const [datosPaciente, setDatosPaciente] = useState({
  //   nombre: auth?.nombre || ''
  // });

  // const [recetas, setRecetas] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchRecetas = async () => {
  //     try {
  //       const response = await Usuario.getRecetas(auth.userId, auth.token);
  //       console.log(response);
  //       if (response.status >= 400) {
  //         const message = response.message || 'Error desconocido';
  //         setError(message);
  //         return;
  //       }

  //       setRecetas(response || []);
  //     } catch (err) {
  //       console.error('Error al obtener recetas:', err);
  //       setError('No se pudo cargar el historial clínico.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRecetas();
  // }, [auth]);
  {/* Cambios de back hechos por aarón ------------------------- */}

  return (
    <Stack
      direction='column'
      sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Header rol='patient' />

      <Card
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: '2%',
        }}
      >
        <CardContent>
          {/* Información general del paciente ---------------- */}
          <Subtitle subtitulo='Información general' />
          <PatientInformation datosPaciente={datosPaciente} />

          <Subtitle subtitulo='Historial clínico' />
          {/* Lista de recetas ----------------- */}
          {recetas.length === 0 ? (
            <Typography>No se encontraron recetas.</Typography>
          ) : (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {recetas.map((receta, index) => (
                <div key={index}>
                  <ListItemButton>
                    {/* Muestra detalles GENERALES de las recetas 
                     Ej. ID, Fecha de emisión, clínica ----------------- */}
                    <PrescriptionHistory receta={receta} />
                  </ListItemButton>
                  {index < recetas.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          )}

          {/* Cambios de back hechos por aarón ------------------------- */}
          {/* {loading ? (
            <Typography>Cargando historial...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : recetas.length === 0 ? (
            <Typography>No se encontraron recetas.</Typography>
          ) : (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {recetas.map((receta, index) => (
                <div key={index}>
                  <ListItemButton>
                    <P_HHistory receta={receta} setView={setView} />
                  </ListItemButton>
                  {index < recetas.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          )} */}
          {/* Cambios de back hechos por aarón ------------------------- */}

        </CardContent>
      </Card>
    </Stack>
  );
}

export default P_HMain;
