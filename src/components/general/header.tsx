import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IUser } from "../../common/interface"
import {  useAuthProvider } from "../../context/AuthContext"
import { SET_PROFILE_SAGA } from "../../store/profile-reducers/profile-reducer"
import { getProfile } from "../../store/profile-reducers/profile-selectors"

export const Header = () => {
    const dispatch = useDispatch();
    const auth = useAuthProvider();
    const profileId : number = auth.userId;
    useEffect(() => {
        dispatch({type : SET_PROFILE_SAGA, profileId : profileId});
        return () => {
            dispatch({type : SET_PROFILE_SAGA, profileId : 0});
        }
    }, [profileId])
    
    const profile : IUser = useSelector(getProfile)
    return (
        <div className="header">
            <div className="title-panel__chat-title">Chatter</div>
            {profile.name + ' ' + profile.email}
        </div>
    )
}