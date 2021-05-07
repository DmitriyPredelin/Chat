import { Redirect, Route, Switch } from 'react-router-dom';
import { CalendarPage } from '../../pages/calendarPage';
import { ChatPage } from '../../pages/chatPage';
import { ProfilePage } from "../../pages/profilerPage";
import { SeaBattlePage } from '../../pages/seaBattlePage';

type RoutingProps = {
    isAuthentificated: boolean
}

export const Routing: React.FC<RoutingProps> = ({ isAuthentificated }) => {
    return (<Switch>
        <Route path="/chat">
            <ChatPage />
        </Route>
        <Route path="/profile">
            <ProfilePage />
        </Route>
        <Route path="/calendar">
            <CalendarPage />
        </Route>
        <Route path="/sea_battle">
            <SeaBattlePage />
        </Route>
        <Route exact path="/">
            {isAuthentificated ? <Redirect to="/chat" /> : <Redirect to="/auth" />}
        </Route>
    </Switch>
    )
}
