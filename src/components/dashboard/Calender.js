import React from 'react'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar} from '@hassanmojab/react-modern-calendar-datepicker';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeDate } from '../../redux/actions/loginRegisterActions';
import { Route } from 'react-router';
export const Calender = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const dispatch = useDispatch();
    const history=useHistory();
    const change = (e)=>{
        // console.log(e);
        setSelectedDay(e);
        dispatch(changeDate(e));
        history.push("/mainPage");
    }
    return (
        <div>
        <Calendar
        value={selectedDay}
        onChange={change}
        shouldHighlightWeekends
        />
        </div>
    )
}
