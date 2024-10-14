import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Card } from '../components/Card';
import { ModalWindow } from '../components/ModalWindow';
import { getLocalStorage } from '../helpers/localStorage.helper';
import { IUser, IUserWeatherData, IWeather } from '../types/types';
import { ModalMapWindow } from '../components/ModalMapWindow';

export const SavedCards: React.FC = () => {
  const [userWeatherData, setUserWeatherData] = useState<IUserWeatherData[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<number>(6);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [weatherModal, setWeatherModal] = useState<IWeather | null>(null);
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const [userMapModal, setUserMapModal] = useState<IUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const data = getLocalStorage();
    setUserWeatherData(data);
  }, []);

  const handleShowMore = () => {
    setVisibleUsers((prevValue) => prevValue + 6);
  };

  const handleOpenModal = (weather: any) => {
    setWeatherModal(weather);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenMapModal = (user: IUser) => {
    setUserMapModal(user);
    setOpenMapModal(true);
  };

  const handleCloseMapModal = () => {
    setOpenMapModal(false);
  };

  return (
    <>
      <div className="text-center mt-10 ">
        <Button
          variant="contained"
          className="backdrop-blur-[50px]"
          startIcon={<NavigateBeforeIcon />}
          sx={{
            backgroundColor: 'transparent',
            borderRadius: '8px',
          }}
          onClick={() => navigate('/')}
        >
          All cards
        </Button>
      </div>
      {userWeatherData.length === 0 ? (
        <div className="mt-20 font-primary font-medium text-white text-5xl text-center">
          No saved cards
        </div>
      ) : (
        <>
          <div className="w-full min-h-screen py-10 px-2 font-primary grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 ">
            {userWeatherData.slice(0, visibleUsers).map((userWeatherItem: IUserWeatherData) => (
                <Card
                  key={userWeatherItem.user.login.uuid}
                  user={userWeatherItem.user}
                  saveButton={false}
                  loading={false}
                  onWeatherClick={handleOpenModal}
                  onMapClick={handleOpenMapModal}
                />
              ))}
          </div>
          {visibleUsers < userWeatherData.length && (
            <div className="text-center mb-10">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1fd63b',
                  borderRadius: '8px',
                }}
                onClick={handleShowMore}
              >
                Show more
              </Button>
            </div>
          )}
          <ModalWindow
            open={openModal}
            handleClose={handleCloseModal}
            weatherModal={weatherModal}
          />
          <ModalMapWindow
            open={openMapModal}
            handleClose={handleCloseMapModal}
            userMapModal={userMapModal}
          />
        </>
      )}
    </>
  );
};
