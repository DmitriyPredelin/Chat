import React, { useContext, useState } from 'react';
import { useHttp } from "../hooks/useHttp";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import { Input, Button, Tooltip } from 'antd';
import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Message } from '../components/general/message';


const AuthPage = (props: any) => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [show, setShow] = useState(false);

    const { loading, error, request, clearError } = useHttp();

    const [form, setForm] = useState({ email: '', password: '' });

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request(`/register`, 'POST', { ...form });
            Message({ text: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            Message({ text: e.message });
        }
    };

    const loginHandler = async () => {
        try {
            if (!form.email || !form.password) {
                Message({ text: 'Логин и/или пароль пустой' });
                return;
            }
            if (!auth.isAuthentificated) {
                const data = await request(`/login`, 'POST', { ...form });
                auth.login(data.token, data.userId, data.email);
                history.push('/chat');
            } else {
                Message({ text: 'ты уже авторизован!' });
            }
        } catch (e) {
            Message({ text: e.message });
        }
    };

    const { register, handleSubmit, watch, errors } = useForm();

    const visibleTooltip = () => {
        setTimeout(() => setShow(true), 1000)
    }

    const keyPressHandler = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginHandler();
            return false;
        }
    }

    return (
        <div className="auth">
            <div className="auth_panel">
                <div className="auth_element-panel">
                    <h4 className="auth_name">Авторизация</h4>
                    <label className="auth_label" htmlFor="email">Введите Email</label>
                    <Tooltip placement="right" title={'wefwef'} visible={show}>
                        <Input placeholder="Введите email"
                            className="auth_input"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            id="email"
                            name="email"
                            type="email"
                            defaultValue="" ref={register}
                            onChange={changeHandler}
                            onKeyPress={keyPressHandler}
                        />
                    </Tooltip>

                    <label className="auth_label" htmlFor="email">Введите пароль</label>
                    <Input placeholder="Введите пароль"
                        className="auth_input"
                        prefix={<UnlockOutlined className="site-form-item-icon" />}
                        id="password"
                        name="password"
                        type="password"
                        onKeyPress={keyPressHandler}
                        defaultValue="" ref={register}
                        onChange={changeHandler}
                    />
                    <Button disabled={loading}
                        className="auth_btn"
                        htmlType="submit"
                        type="primary"
                        onClick={loginHandler}>Вход</Button>
                    <Button disabled={loading}
                        className="auth_btn"
                        htmlType="submit"
                        type="primary"
                        danger
                        onClick={registerHandler}>Регистрация</Button>

                </div>

            </div>
        </div>



    )
};

export default AuthPage;