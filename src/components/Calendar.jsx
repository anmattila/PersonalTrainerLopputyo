import { useEffect, useState } from "react";
import { getTrainingsWithCustomers } from "../trainingapi";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from "dayjs";


function Calendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getTrainingsWithCustomers()
            .then(data => {
                const events = data.map(training => ({
                    title: `${training.activity} / ${training.customer?.firstname} ${training.customer?.lastname}`,
                    start: training.date,
                    end: dayjs(training.date).add(training.duration, "minute").toISOString()
                }))
                setEvents(events)
            })
            .catch(error => console.log("Error in fetching", error))
    }, []);


    return (
        <>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView='dayGridMonth'
            events={events}
            displayEventEnd={true}
            nowIndicator={true}
            eventDisplay="block"
            eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }}
            headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth, timeGridWeek, timeGridDay"
            }}
        />
        </>
    )
}

export default Calendar;