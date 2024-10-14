import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { FaMale, FaFemale } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import Button from '@mui/material/Button';
import { getWeatherData } from '../api/weather.api';
import { getWeatherIcon } from '../helpers/weather.helper';
import { setLocalStorage } from '../helpers/localStorage.helper';
import highestTemperature from '../assets/img/high-temperature.svg';
import lowestTemperature from '../assets/img/low-temperature.svg';
import { CardProps, IUser, IWeather } from '../types/types';

export const Card: React.FC<CardProps> = ({user, loading, saveButton, onWeatherClick, onMapClick}) => {

  const [weather, setWeather] = useState<IWeather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (user) {
        try {
          const latitude = user.location.coordinates.latitude;
          const longitude = user.location.coordinates.longitude;
          const weatherData = await getWeatherData(latitude, longitude);
          setWeather(weatherData);
        } catch (err: any) {
          const error = err.response?.data.message;
          toast.error(error.toString());
        }
      }
    };

    fetchWeather();

    const intervalId = setInterval(() => {
      fetchWeather();
    }, 300000)

    return () => clearInterval(intervalId);

  }, [user]);

  const saveHandler = (weather: any, user: IUser) => {
    setLocalStorage(weather, user);
  };

  return (
    <div className="w-[350px] h-[410px] bg-black/20  text-white backdrop-blur-[32px] rounded-[32px] py-6 px-6 mx-auto">
      {loading ? (
        <div className="h-full flex items-center justify-center">
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
      ) : (
        <div className="">
          <div className="flex items-center gap-x-5">
            <div>
              <img
                className="block rounded-full h-12 w-12"
                src={user.picture.thumbnail}
                srcSet={`
                    ${user.picture.large} 1024w,
                    ${user.picture.medium} 768w,
                    ${user.picture.thumbnail} 480w`}
                sizes="
                    (min-width: 1024px) 1024px,
                    (min-width: 768px) 768px,
                    480px"
                alt="User Profile"
              />
            </div>
            <div className="flex flex-col gap-y-1 truncate">
              <div className="text-sm  flex items-center gap-x-1">
                <div>{user.gender === 'male' ? <FaMale /> : <FaFemale />}</div>
                <p className="truncate">
                  {user.name.first} {user.name.last}
                </p>
              </div>
              <div className="text-sm flex items-center gap-x-1">
                <div className="">
                  <MdOutlineEmail />
                </div>
                <p className="truncate">{user.email}</p>
              </div>
              <div className="text-sm flex items-center gap-x-1 cursor-pointer hover:underline" onClick={() => onMapClick(user)}>
                <div className="">
                  <IoLocationSharp />
                </div>
                <p className="truncate">
                  {user.location.city} / {user.location.country}
                </p>
              </div>
            </div>
          </div>

          <div className="my-10 h-[100px]">
            <div className="flex justify-center items-center">
              <img
                className="block w-[100px] h-full"
                src={getWeatherIcon(weather?.current.weatherCode ?? 0)}
                alt="weather-icon"
              />
              <div className="h-full text-[100px] leading-[100px] font-light">
                {weather?.current.temperature.toFixed(0)}
              </div>
              <div className="text-xl self-start">°C</div>
            </div>
          </div>
          <div className="w-full mx-auto flex flex-row justify-between">
            <div className="flex gap-x-1 items-center">
              <img
                className="block w-[35px] h-[35px]"
                src={lowestTemperature}
                alt="lowest temperature"
              />
              <p className="text-3xl">
                {weather?.daily.minTemperature.toFixed(0)}
              </p>
              <div className="text-xs self-start">°C</div>
            </div>
            <div className="flex gap-x-1 items-center">
              <img
                className="block w-[35px] h-[35px]"
                src={highestTemperature}
                alt="highest temperature"
              />
              <p className="text-3xl">
                {weather?.daily.maxTemperature.toFixed(0)}
              </p>
              <div className="text-xs self-start">°C</div>
            </div>
          </div>
          <div
            className={`flex flex-row ${!saveButton ? 'justify-center' : 'justify-between'} items-center mt-10`}
          >
            <div className={`${!saveButton ? 'hidden' : ''}`}>
              <Button
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  borderRadius: '8px',
                }}
                onClick={() => saveHandler(weather, user)}
              >
                Save
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  borderRadius: '8px',
                }}
                onClick={() => onWeatherClick(weather)}
              >
                Weather
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
