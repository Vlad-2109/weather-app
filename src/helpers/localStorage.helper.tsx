import { toast } from 'react-toastify';
import { IUser } from '../types/types';

export const localStorageHelper = (weather: any, user: IUser) => {
  if (weather && user) {
    const userWeatherData = {
      user,
      weather,
    };

    const savedData = JSON.parse(
      localStorage.getItem('userWeatherList') || '[]',
    );
    const isUserSaved = savedData.some(
      (item: any) => item.user.email === user.email,
    );

    if (isUserSaved) {
      toast.error('User data already exists in localStorage');
    } else {
      savedData.push(userWeatherData);
      localStorage.setItem('userWeatherList', JSON.stringify(savedData));
      toast.success('Data saved to localStorage');
    }
  } else {
    toast.error('Failed to save data, missing weather or user data');
  }
};
