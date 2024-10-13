import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import highestTemperature from '../assets/img/high-temperature.svg';
import lowestTemperature from '../assets/img/low-temperature.svg';
import currentTemperature from '../assets/img/currentTemperature.png';
import { ModalWindowProps } from '../types/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  background: '#7cc2b7',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '32px',
};

export const ModalWindow: React.FC<ModalWindowProps> = ({
  open,
  weatherModal,
  handleClose,
}) => {
  console.log('weatherModal', weatherModal);

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
            <div className="font-primary text-stone-900">
              <div className="text-center font-semibold text-3xl mb-5">
                Weather info
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-medium gap-x-1">
                  <img className="block w-7 h-7" src={currentTemperature} />
                  <p>Current Temperature:</p>
                  <p>{weatherModal?.current.temperature.toFixed(0)}</p>
                  <div className="text-xs self-start">°C</div>
                </div>
                <div className="flex items-center font-medium gap-x-1">
                  <img className="block w-7 h-7" src={highestTemperature} />
                  <p>Max Temperature:</p>
                  <p>{weatherModal?.daily.maxTemperature.toFixed(0)}</p>
                  <div className="text-xs self-start">°C</div>
                </div>
                <div className="flex items-center font-medium gap-x-1">
                  <img className="block w-7 h-7" src={lowestTemperature} />
                  <p>Min Temperature:</p>
                  <p>{weatherModal?.daily.minTemperature.toFixed(0)}</p>
                  <div className="text-xs self-start">°C</div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
