import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
const axiosWeather = axios.create()
function GetPosition() {
    const [delayed, setDelayed] = useState(false)
    const [iconWeather ,setIconWeather] = useState(null)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude
      axiosWeather.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ed214b2a0a7749d0323ba717326fc4a7&units=metric`).then((res) => {
        if (res.data){
            setIconWeather(res.data.weather[0].icon)
            if (res.data.main.temp<60){
                setDelayed(true)
            }
        }
    });
    });
  }, []);

  return (
    <>
    {delayed &&
        <div className='d-flex'>
        <p> <b>Note: </b> Due to weather conditions in your current location, the delivery will be delayed!</p>
        <div className="weather-icon" style={{marginTop:"-15px"}}><img src={`http://openweathermap.org/img/w/${iconWeather}.png`} /></div>
        </div>
    }

    </>
  )
}

export default GetPosition