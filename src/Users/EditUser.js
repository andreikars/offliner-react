import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    let navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        first_name: "",
        second_name: "",
        username: "",
        email: "",
        phone: "",
        role: "",  // Добавляем роль
    });

    const { first_name, second_name, username, email, phone, role } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`https://lazy-experts-look.loca.lt/user/${id}`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Server response:", response);
            navigate("/manageusers");
        } catch (error) {
            console.error("Error during user update:", error);
        }
    };

    const loadUser = async () => {
        const result = await axios.get(`https://lazy-experts-look.loca.lt/user/${id}`);
        setUser(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Редактирование пользователя</h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        {/* Поле для первого имени */}
                        <div className='mb-3'>
                            <label htmlFor='first_name' className='form-label'>
                                Имя
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Введите ваше имя'
                                name="first_name"
                                value={first_name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для фамилии */}
                        <div className='mb-3'>
                            <label htmlFor='second_name' className='form-label'>
                                Фамилия
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Введите вашу фамилию'
                                name="second_name"
                                value={second_name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для username */}
                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>
                                Имя пользователя
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Введите имя пользователя'
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для email */}
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                Email
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Введите ваш email'
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для телефона */}
                        <div className='mb-3'>
                            <label htmlFor='phone' className='form-label'>
                                Номер телефона
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Введите ваш номер телефона'
                                name="phone"
                                value={phone}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для роли */}
                        <div className='mb-3'>
                            <label htmlFor='role' className='form-label'>
                                Роль
                            </label>
                            <select
                                className='form-control'
                                name="role"
                                value={role}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="USER">Пользователь</option>
                                <option value="ADMIN">Администратор</option>
                            </select>
                        </div>

                        {/* Кнопки отправки и отмены */}
                        <button type='submit' className="btn btn-outline-primary">
                            Отправить
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/manageusers">
                            Отмена
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
