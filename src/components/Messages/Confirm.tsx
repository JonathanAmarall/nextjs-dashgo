import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  text: string;
  title: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  open: boolean;
  userConfirm: any;
  handleConfirm: (id: any) => void;
  handleClickOpen: () => void;
  handleCancel: () => void;
}

export function Confirm({
  title,
  text,
  variant = 'text',
  color,
  open,
  userConfirm,
  handleCancel,
  handleClickOpen,
  handleConfirm,
}: Props) {
  const [user, setUser] = useState(userConfirm);
  return (
    <div>
      <Button variant={variant} color={color} onClick={handleClickOpen}>
        Remover
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button color="primary" onClick={() => handleConfirm(user)}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
