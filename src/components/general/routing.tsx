import { useAuthProvider } from 'context/AuthContext';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CalendarPage } from '../../pages/calendarPage';
import { ChatPage } from '../../pages/chatPage';
import { ProfilePage } from "../../pages/profilerPage";
import { SeaBattlePage } from '../../pages/seaBattlePage';


export const Routing: React.FC = () => {
    const { isAuth } = useAuthProvider();

    const MemoSeaBattlePage : React.FC = React.memo(SeaBattlePage);

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
            <MemoSeaBattlePage />
        </Route>
        <Route exact path="/">
            {isAuth ? <Redirect to="/chat" /> : <Redirect to="/auth" />}
        </Route>
    </Switch>
    )
}
