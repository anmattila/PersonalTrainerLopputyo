import { useEffect, useState } from "react";
import { getTrainingsWithCustomers } from "../trainingapi";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs from "dayjs";
import { ShortText } from "@mui/icons-material";


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
        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            initialView='dayGridMonth'
            events={events}
            slotLabelFormat={{
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
            }}
            headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth, timeGridWeek, timeGridDay"
            }}
            displayEventEnd={true}
            height= {800}
            nowIndicator={true}   
            editable={true}
        />
    )
}

export default Calendar;