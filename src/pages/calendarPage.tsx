import { Row, Calendar, Badge } from "antd";
import { CalendarDay } from "../components/calendar/calendar-day"


import {ModalWindow } from "components/calendar/modal-window"
import { useState } from "react";
import locale from "components/general/locale";

function getListData(value: any) {
    let listData: Array<{ type: "warning" | "success" | "error" | "processing" | "default" | undefined; content: string }> = [];

    const month = value.month();
    const day = value.date();

    if (month === 4 && day === 8) {
        listData = [
            { type: 'warning', content: 'Важное дело номер 1' },
            { type: 'success', content: 'Важное дело номер 2' },
        ];
    }
    return listData || [];
}

function dateCellRender(value: any) {
    const listData = getListData(value);
    return (

        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </ul>


    );
}

function getMonthData(value: any) {
    switch (value.month()) {
        case 0: case 1: case 11: return 'ЗИМА'; break;
    }

    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value: any) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
        </div>
    ) : null;
}


export const CalendarPage = () => {
    const [visible, setVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null)

    const onSelect = (value : any) => {
        setSelectedDay(value);
        setVisible(true)
    }

    return (
        <div className="calendar__general">
            <Calendar dateCellRender={dateCellRender}  monthCellRender={monthCellRender} onSelect={onSelect} locale={locale} />
            <ModalWindow visible={visible} setVisible={setVisible} selectedDay={selectedDay}/>
        </div>

    )
}

