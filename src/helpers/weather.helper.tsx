import weatherClear from '../assets/img/weather[0].svg';

import weatherMainly from '../assets/img/weather[1,2,3].svg';
import weatherFog from '../assets/img/weather[45,48].svg';
import weatherDrizzle from '../assets/img/weather[51,53,55].svg';
import weatherFreezing from '../assets/img/weather[56,57].svg';
import weatherRain from '../assets/img/weather[61,63,65].svg';
import weatherFreezingRain from '../assets/img/weather[66,67].svg';
import weatherSnow from '../assets/img/weather[71,73,75].svg';
import weatherSnowGrains from '../assets/img/weather[77].svg';
import weatherRainShowers from '../assets/img/weather[80,81,82].svg';
import weatherSnowShowers from '../assets/img/weather[85,86].svg';
import weatherThunderstorm from '../assets/img/weather[95].svg';
import weatherThunderstormSlight from '../assets/img/weather[96,99].svg';

const weatherIcons: { [key: number]: string } = {
  0: weatherClear,
  1: weatherMainly,
  2: weatherMainly,
  3: weatherMainly,
  45: weatherFog,
  48: weatherFog,
  51: weatherDrizzle,
  53: weatherDrizzle,
  55: weatherDrizzle,
  56: weatherFreezing,
  57: weatherFreezing,
  61: weatherRain,
  63: weatherRain,
  65: weatherRain,
  66: weatherFreezingRain,
  67: weatherFreezingRain,
  71: weatherSnow,
  73: weatherSnow,
  75: weatherSnow,
  77: weatherSnowGrains,
  80: weatherRainShowers,
  81: weatherRainShowers,
  82: weatherRainShowers,
  85: weatherSnowShowers,
  86: weatherSnowShowers,
  95: weatherThunderstorm,
  96: weatherThunderstormSlight,
  99: weatherThunderstormSlight,
};

export const getWeatherIcon = (weatherCode: number): string => {
  return weatherIcons[weatherCode] || weatherClear;
};
