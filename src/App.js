import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Header from './components/header/Header'
import Timer from './components/timer/Timer'
import { createServer } from "miragejs"
import moment from 'moment';
import './App.css';

const fakeServerGetDaysRemaining = (endDate) => { // a simple function simulating a server method that returns a date diff in days
    const parsedDate = JSON.parse(endDate);

    if (parsedDate && parsedDate.endDate) {
        const dateToProcess = moment(new Date(parsedDate.endDate));
        const today = moment(new Date());
        const diffDays = dateToProcess.diff(today, 'days');
        return diffDays;
    }

    return null;
}

createServer({ // Uses miragejs to create a fake endpoint for testing client-side functionality
    routes() {
        this.post("/daysremaining", (schema, request) => {
            const daysRemaining = fakeServerGetDaysRemaining(request.requestBody);

            return { daysRemaining }
        })
    }
})

function App() {
    return (
        <div className="App">
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Header /> {/* Imported components */}
                <Timer /> {/* Imported components */}
            </LocalizationProvider>
        </div>
    );
}

export default App;
