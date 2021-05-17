import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { IUser } from '../common/interface';
import { getProfile } from '../store/profile-reducers/profile-selectors';

export const ProfilePage = () => {
    const profile: IUser = useSelector(getProfile, (current: IUser, prev: IUser) => prev === current);

    return (
        <div className="profile">
            <div className="profile-content">
                <div className="profile-content__photo-panel">
                    <img src={profile.src} alt=""
                        className="profile-content__img" />
                    <Button className="profile-content__btn"
                        type="primary">Изменить фото</Button>
                </div>
                <div className="profile-info">
                    <div className="profile-info__panel">
                        <div className="profile-info__name">{profile.name}</div>
                        <div className="profile-info__status"><b>Никнейм:</b> {profile.nickname}</div>
                        <div className="profile-info__status"><b>Статус:</b> {profile.user_status}</div>
                        <div className="profile-info__email"><b>Email:</b> {profile.email}</div>
                        <div className="profile-info__skype"><b>Skype:</b> {profile.skype}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}