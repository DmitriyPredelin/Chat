import { CalendarDay } from "../components/calendar/calendar-day"
import { Row, Col } from 'antd';

export const CalendarPage = () => {
    let massiv: Array<Number> = [];
    for (let i = 0; i < 42; i++) {
        massiv[i] = i
    }

    return (
        <div className="calendar-general">
            <div>Апрель 2021</div>
            <div className="calendar-panel">
                {massiv.map((_, index) => {
                    return <CalendarDay key={index} />
                })}
            </div>
        </div>
    )
}