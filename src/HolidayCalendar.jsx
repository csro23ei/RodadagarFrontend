import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './HolidayCalendar.css';

const HolidayCalendar = ({ onDateClick }) => {
    const [holidays, setHolidays] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        axios.get('http://sholiday.faboul.se/dagar/v2.1/2015')  // Replace with the actual holiday API URL
            .then(response => {
                console.log(response.data);
                setHolidays(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching holidays: ', error);
                setHolidays([]);  // Set to an empty array on error
            });
    }, []);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            if (Array.isArray(holidays)) {
                const holiday = holidays.find(h => new Date(h.date).toDateString() === date.toDateString());
                return holiday ? <div className="holiday">{holiday.name}</div> : null;
            }
            return null;
        }
    };

    const handleDateClick = (value) => {
        onDateClick(value);
        setDate(value);
    };

    return (
        <div>
            <Calendar
                onClickDay={handleDateClick}
                value={date}
                tileContent={tileContent}
            />
        </div>
    );
};

export default HolidayCalendar;
