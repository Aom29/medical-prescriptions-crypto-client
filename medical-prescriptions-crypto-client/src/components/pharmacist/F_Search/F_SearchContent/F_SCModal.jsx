import { Box, Divider, IconButton, Dialog, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Subtitle from '../../../layout/Subtitle';

function F_SCModal ({ open, onClose, recetas }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Información general de la receta ------------------- */}
        <Subtitle subtitulo='Información de la receta' />


        <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
        {/* Diagnóstico ---------------------------------------- */}
        <Subtitle subtitulo='Diagnóstico' />
        <PrescriptionDiagnosis
          diagnosis={recetas.diagnostico}
        />

        <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
        {/* Tratamiento ---------------------------------------- */}
        <Subtitle subtitulo='Tratamiento' />
        {medicamentos.map((med, idx) => (
          <>
          <PrescriptionTreatment key={idx} medicamento={med} />
          <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
          </>
        ))}

        {/* Firmas ---------------------------------------- */}
        <Subtitle subtitulo='Firmas' />
        <PrescriptionSign
          label='Firma médico'
        />

      </DialogContent>
    </Dialog>
  );
}

export default F_SCModal;