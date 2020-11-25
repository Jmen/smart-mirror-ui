import React from 'react';


export class Clock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            time: new Date()
        }
    }

    componentDidMount() {
        setInterval(this.update, 1000)
    }

    update = () => {
        this.setState({
            time: new Date()
        })
    };

    render() {
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
                <div style={{fontSize:30}}>{this.state.time.toLocaleDateString("en-GB", date)}</div>
                <div style={{fontSize:175}}>{this.state.time.toLocaleTimeString("en-GB", clock)}</div>
            </div>
        )
    }
}