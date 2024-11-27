import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        username: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
        role: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newUserData, setNewUserData] = useState({ ...userData });
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    // Загружаем информацию о пользователе при монтировании компонента
    useEffect(() => {
        if (username) {
            fetchUserProfile(username);  // Загружаем профиль пользователя
        } else {
            navigate('/login');
        }
    }, [username, navigate]);

    // Функция для загрузки данных о пользователе
    const fetchUserProfile = async (username) => {
        try {
            const response = await axios.get(`https://5eb6-93-84-5-230.ngrok-free.app/users/${username}`);
            setUserData(response.data); // Сохраняем данные о пользователе
            setNewUserData(response.data); // Сохраняем данные для редактирования
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        }
    };

    // Функция для обновления данных пользователя
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Функция для отправки изменений на сервер
    const handleSave = async () => {
        try {
            const response = await axios.put('https://5eb6-93-84-5-230.ngrok-free.app/api/users/update', newUserData);
            setUserData(response.data); // Обновляем локальные данные после успешного сохранения
            setIsEditing(false); // Выходим из режима редактирования
        } catch (error) {
            console.error('Ошибка при сохранении данных пользователя:', error);
        }
    };

    // Функция для отмены редактирования
    const handleCancel = () => {
        setNewUserData(userData); // Восстанавливаем старые данные
        setIsEditing(false); // Выходим из режима редактирования
    };

    // Выход из системы
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    // Переход в корзину
    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 border rounded p-4 shadow">
                    <h2 className="text-center mb-4">Личный кабинет</h2>

                    {/* Отображение данных профиля или формы редактирования */}
                    {!isEditing ? (
                        <>
                            <p><strong>Имя пользователя:</strong> {userData.username}</p>
                            <p><strong>Имя:</strong> {userData.first_name}</p>
                            <p><strong>Фамилия:</strong> {userData.second_name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Телефон:</strong> {userData.phone}</p>

                            <button
                                className="btn btn-secondary w-100 mt-3"
                                onClick={() => setIsEditing(true)} // Включаем режим редактирования
                            >
                                Редактировать
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Имя</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    value={newUserData.first_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Фамилия</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="second_name"
                                    value={newUserData.second_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={newUserData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Телефон</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={newUserData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <button className="btn btn-primary w-100 mt-3" onClick={handleSave}>
                                Сохранить изменения
                            </button>
                            <button className="btn btn-danger w-100 mt-3" onClick={handleCancel}>
                                Отменить
                            </button>
                        </>
                    )}

                    {/* Кнопки для перехода в корзину и выхода из системы, которые скрываются в режиме редактирования */}
                    {!isEditing && (
                        <>
                            <button className="btn btn-primary w-100 mt-3" onClick={handleGoToCart}>
                                Перейти в корзину
                            </button>
                            <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                                Выйти
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
