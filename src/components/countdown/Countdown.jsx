import React, { Component } from 'react';
import { Button, Typography } from '@mui/material';
import './Countdown.css';

// Countdown is a class component with state managed through `this.state`.
export default class Countdown extends Component { // Compare this export with how Timer.jsx is exported. The placement is different but they are the same.
    constructor(props) {
        super(props);

        this.state = { // Sets default state
            // dateTime: props.dateTime
            //           ^-- Generally, don't set props in the Constructor's state unless the component doesn't need to be aware of future changes to this value.
            countdown: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            isCountingDown: false
        }
    }

    // An example of using React's lifecycle methods. This method isn't called on the first render, and requires prop comparison to prevent an infinite re-render loop.
    componentDidUpdate(previousProps) {
        const { isCountingDown, countdown } = this.state;
        const { dateTime } = this.props;
        
        if (new Date(dateTime).getTime() !== new Date(previousProps.dateTime).getTime()) { // Use `.getTime()` on a Date object to get the epoch time for comparison. Or use Moment.js.
            if (isCountingDown) {
                this.stopTimer();
            }

            this.startTimer();
        }

        if (isCountingDown &&
            countdown.days === 0 &&
            countdown.hours === 0 &&
            countdown.minutes === 0 &&
            countdown.seconds === 0) {
            this.stopTimer(); // Stop when the countdown expires
        }
    }

    getRemainingDateTime = () => {
        const difference = new Date(this.props.dateTime) - new Date();
        const { countdown } = this.state;

        if (difference > 0) {
            countdown.days = Math.floor(difference / (1000 * 60 * 60 * 24));
            countdown.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            countdown.minutes = Math.floor((difference / 1000 / 60) % 60);
            countdown.seconds = Math.floor((difference / 1000) % 60);

            this.setState({ // `setState()` will trigger a re-render.
                countdown,
                isCountingDown: true
            });
        }
    }

    startTimer() {
        console.log("startTimer() called...")
        this.timer = setInterval(this.getRemainingDateTime, 1000); // `setInterval()` calls every every x seconds, as opposed to `setTimeout()` which calls once after x seconds.
    }

    stopTimer() {
        console.log("stopTimer() called...")
        clearInterval(this.timer);
        this.timer = null;

        this.setState({
            isCountingDown: false
        });
    }

    render() {
        const { countdown, isCountingDown } = this.state;
        const { dateTime } = this.props; // If the child component needs to be aware of a prop change from the parent, define it here.

        return (
            <div className="countdown-container">
                <div key={dateTime} className="countdown-remaining-container">  {/* Add a key to ensure uniqueness in the VDOM's re-render cycle. */}
                    {Object.entries(countdown).map(([key, value]) => { // An example of iterating over data to dynamically create elements
                        return (
                            <div key={key + value} className="countdown-item">
                                <Typography className="countdown-value" variant="h5">
                                    {key.toUpperCase()}
                                </Typography>
                                <Typography className="countdown-title" variant="h6">
                                    {value}
                                </Typography>
                            </div>
                        )
                    })}
                </div>
                <Button className="countdown-pause-button" variant="contained" onClick={() => this.stopTimer()} disabled={!isCountingDown}>Stop</Button>
            </div>
        )
    }
}