import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Card } from '../components/Card';
import { ModalWindow } from '../components/Modal';
import { IUser, IWeather } from '../types/types';

export const Home: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [weatherModal, setWeatherModal] = useState<IWeather | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://randomuser.me/api/?results=30');
        setLoading(false);
        setUsers(response.data.results);
      } catch (error) {
        setLoading(false);
        const err = error as AxiosError;
        toast.error(err.message);
      }
    };

    fetchUsers();
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

  //sm: mobile 640
  //md: tablet 768
  //xl:pc 1280
  return (
    <>
      <div className="text-center mt-10 ">
        <Button
          variant="contained"
          className="backdrop-blur-[50px]"
          endIcon={<NavigateNextIcon />}
          sx={{
            backgroundColor: 'transparent',
            borderRadius: '8px',
          }}
          onClick={() => navigate('/saved-cards')}
        >
          Saved cards
        </Button>
      </div>
      {loading && (
        <div className="h-full flex items-center justify-center mt-32">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
      <div className="w-full min-h-screen py-10 px-2 font-primary grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 ">
        {users.slice(0, visibleUsers).map((user: IUser) => (
          <Card
            key={user.login.uuid}
            user={user}
            saveButton={true}
            loading={loading}
            onWeatherClick={handleOpenModal}
          />
        ))}
      </div>
      {visibleUsers < users.length && (
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
    </>
  );
};
