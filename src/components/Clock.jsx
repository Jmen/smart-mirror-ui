import React, {useEffect, useState} from 'react';

export const Clock = () => {

    const [time, setTime] = useState(new Date());

    useEffect( () => {
        const interval = setInterval(() => { setTime(new Date()) }, 1000);
        return () => clearInterval(interval);
    }, []);

    let date = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const clock = {
        hour: "2-digit",
        minute: "2-digit"
    };

    return (
        <div style={{marginLeft: "75px", marginTop: "125px"}}>
            <div style={{fontSize:30}}>{time.toLocaleDateString("en-GB", date)}</div>
            <div style={{fontSize:175}}>{time.toLocaleTimeString("en-GB", clock)}</div>
        </div>
    )
}