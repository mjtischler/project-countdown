import React, { useState, useEffect } from 'react';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Box, Card, CardContent, Tooltip, Zoom, TextField } from '@mui/material';
import { GetDaysRemaining } from '../../api/DateProcessor';
import moment from 'moment';
import './Timer.css';
import Countdown from '../countdown/Countdown';

// An example of returning an HTML element from a pure function.
const GetTextFromDaysRemaining = (daysRemaining) => {
    let string; // We use `let` here because the variable will be reassigned.

    if (isNaN(daysRemaining) || daysRemaining === null) { // Checks for null. Remember, !daysRemaining won't work here because 0 is falsy.
        string = "?";
    } else if (daysRemaining < 0) {
        string = "OVERDUE";
    } else if (daysRemaining === 0) {
        string = "Within a day";
    } else {
        string = daysRemaining;
    }

    return ( // Returning HTML is valid in React.
        <div>
            Project Days Remaining: <b>{string}</b>
        </div>
    )
};

// Timer is a functional component with state managed through `useState()`.
const Timer = () => {
    const [endDate, setEndDate] = useState(null);
    const [daysRemaining, setDaysRemaining] = useState(null);

    const handleDateTimeChange = (newValue) => {
        setEndDate(newValue); // `setEndDate()` will trigger a re-render.
    };

    useEffect(() => {
        const getData = async () => { // This makes an API call and thus is async/await. Also see: Promises.
            const data = await GetDaysRemaining(endDate);
            setDaysRemaining(data); // `setDaysRemaining()` will trigger a re-render.
        }

        getData();
    }, [endDate]); // Any change to the values placed in this array will trigger a call to this instance of `useEffect()`.

    return (
        <div className="timer-container">
            <Box className="timer-box">
                <Card>
                    <CardContent>
                        <Countdown dateTime={endDate} />

                        <div className="timer-tooltip-container">
                            <Tooltip title="Set via the useState() value `endDate`." TransitionComponent={Zoom} arrow>
                                {/* Compare this rendering method to how {GetTextFromDaysRemaining(daysRemaining)} is rendered below */}
                                <div>Project End Date: <b>{endDate ? moment(endDate).format("MM/DD/yyyy").toString() : "?"}</b></div> 
                            </Tooltip>
                            <Tooltip title="Set via the useState() value `daysRemaining`, as returned from the bogus API call." TransitionComponent={Zoom} arrow>
                                {/* Compare to above */}
                                {GetTextFromDaysRemaining(daysRemaining)}
                            </Tooltip>
                        </div>

                        <DateTimePicker
                            label="Project End Date"
                            value={endDate}
                            onChange={handleDateTimeChange}
                            renderInput={(params) => <TextField {...params} />} // `...params` is an example of using the Spread Operator.
                        />
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
};

export default Timer;  // Compare this export with how Countdown.jsx is exported. The placement is different but they are the same.