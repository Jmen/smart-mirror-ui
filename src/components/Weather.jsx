import React, { useEffect, useState } from "react";

export const Weather = () => {

    const [temperature, setTemperature] = useState(100);
    const [feels_like, setFeelsLike] = useState(100);
    const [icon, setIcon] = useState('');

    useEffect( () => {
        const update = async () => {
            const response = await fetch("https://jaimen-smart-mirror-ui.builtwithdark.com/home")

            const data = await response.json()

            setTemperature(data.weather.temperature)
            setFeelsLike(data.weather.feels_like)
            setIcon(data.weather.icon)
        };

        update()

        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, []);

    return (<div style={{marginLeft: "75px", marginTop: "30px"}}>
        <div>
            <div style={{display: "flex"}}>
                <div>
                    <div style={{fontSize:30}}>Actual {temperature}&deg;C</div>
                    <div style={{fontSize:30}}>Feels Like</div>
                </div>
                <div style={{flewGrow: 1, marginLeft: 20}}>
                    <img src={icon} alt="weather icon" width="128" height="128"/>
                </div>
            </div>
            <div style={{fontSize:100}}>{feels_like}&deg;C</div>
        </div>
    </div>);
};