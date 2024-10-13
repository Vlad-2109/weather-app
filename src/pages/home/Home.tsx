import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { Card } from '../../components/Card';
import { IUser } from '../../types/types';
import { ModalWindow } from '../../components/Modal';

export const Home: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [weatherModal, setWeatherModal] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://randomuser.me/api/?results=30',
        );
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
      <div className="w-full min-h-screen py-10 px-2 font-primary grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 ">
        {users.slice(0, visibleUsers).map((user) => (
          <Card
            key={user.login.uuid}
            user={user}
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
