import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ModalMapWindowProps } from '../types/types';
import { UserMap } from './UserMap';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const ModalMapWindow: React.FC<ModalMapWindowProps> = ({ open, userMapModal, handleClose }) => {

  const latitude: number = parseFloat(userMapModal?.location.coordinates.latitude);
  const longitude: number = parseFloat(userMapModal?.location.coordinates.longitude);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <UserMap
              latitude={latitude}
              longitude={longitude}
              userPicture={userMapModal?.picture.thumbnail}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
