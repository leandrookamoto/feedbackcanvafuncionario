import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//As props são enviadas para os componentes App.js, Feedback.js e Canva.js
export default function AlertDialog({
  explicacao = 'Explicação',
  descricao,
  open = false,
  handleClose,
  button = 'Fechar',
  button2,
  handleButton,
  onChangeObservacao
  
}) {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex">
            <img src="./img/global_hitss_logo.png" alt="" width="30" />
            <div className="ml-3">{'Atenção'}</div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {descricao}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {button}
          </Button>
          {button2 && (
            <Button onClick={handleButton} autoFocus>
              {button2}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
