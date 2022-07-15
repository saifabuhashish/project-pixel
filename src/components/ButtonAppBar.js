import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignUp from './SignUp';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 8,
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const headerStyle = {
  minHeight:'100px', 
  backgroundColor:'#386FA4'
}

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={headerStyle}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Pixel Project
          </Typography>
          <Button color="inherit" onClick={handleOpen}>Login</Button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            borderRadius: '8'
          }}
          >
          <Box sx={style}>
          <SignUp></SignUp>
          </Box>
          
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
