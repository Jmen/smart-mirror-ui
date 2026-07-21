import React from 'react';

const COLOUR_STOPS = [
    { temp: 0, colour: [93, 138, 235] },
    { temp: 8, colour: [104, 196, 174] },
    { temp: 15, colour: [163, 198, 101] },
    { temp: 21, colour: [240, 197, 65] },
    { temp: 28, colour: [242, 153, 60] }
];

const colourAt = (temp) => {
    const first = COLOUR_STOPS[0];
    const last = COLOUR_STOPS[COLOUR_STOPS.length - 1];

    if (temp <= first.temp) return first.colour;
    if (temp >= last.temp) return last.colour;

    const upperIndex = COLOUR_STOPS.findIndex(stop => temp <= stop.temp);
    const lower = COLOUR_STOPS[upperIndex - 1];
    const upper = COLOUR_STOPS[upperIndex];
    const ratio = (temp - lower.temp) / (upper.temp - lower.temp);

    return lower.colour.map((channel, i) => Math.round(channel + (upper.colour[i] - channel) * ratio));
};

const gradient = (min, max) => {
    const stops = [];

    for (let i = 0; i <= 10; i++) {
        const [r, g, b] = colourAt(min + ((max - min) * i) / 10);
        stops.push(`rgb(${r}, ${g}, ${b}) ${i * 10}%`);
    }

    return `linear-gradient(to right, ${stops.join(', ')})`;
};

const Bar = ({ label, min, max, domain, current }) => {

    const span = domain.max - domain.min;
    const left = ((min - domain.min) / span) * 100;
    const width = ((max - min) / span) * 100;

    const showDot = current !== undefined && current >= min && current <= max;
    const dotLeft = showDot ? ((current - min) / (max - min)) * 100 : 0;

    return (
        <div style={{display: "flex", alignItems: "center", marginTop: 20}}>
            <div style={{fontSize: 30, width: 220}}>{label}</div>
            <div style={{fontSize: 30, width: 90, color: "#8e8e93"}}>{min}&deg;</div>
            <div style={{flexGrow: 1, position: "relative", height: 10, borderRadius: 5, backgroundColor: "#2c2c2e", marginRight: 30}}>
                <div style={{
                    position: "absolute",
                    left: `${left}%`,
                    width: `${width}%`,
                    height: "100%",
                    borderRadius: 5,
                    background: gradient(min, max)
                }}>
                    {showDot &&
                        <div style={{
                            position: "absolute",
                            left: `${dotLeft}%`,
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: "white",
                            boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.6)"
                        }}/>
                    }
                </div>
            </div>
            <div style={{fontSize: 30, width: 70, textAlign: "right"}}>{max}&deg;</div>
        </div>
    );
};

export const DailyComparison = ({ today, yesterday, current }) => {

    if (!today || !yesterday) return null;

    const domain = {
        min: Math.min(today.min, yesterday.min),
        max: Math.max(today.max, yesterday.max)
    };

    const difference = today.max - yesterday.max;
    const description = Math.abs(difference) <= 1
        ? "similar to"
        : difference > 0 ? "warmer than" : "cooler than";

    return (
        <div style={{marginLeft: "75px", marginTop: "60px", width: 850}}>
            <div style={{fontSize: 30, color: "#8e8e93"}}>
                The high temperature today is {description} yesterday
            </div>
            <Bar label="Today" min={today.min} max={today.max} domain={domain} current={current}/>
            <Bar label="Yesterday" min={yesterday.min} max={yesterday.max} domain={domain}/>
        </div>
    );
};
