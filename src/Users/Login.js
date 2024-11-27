import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');  // Состояние для хранения ошибки
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Очистить предыдущую ошибку

        try {
            const response = await axios.post('https://nine-clubs-wonder.loca.lt/auth/login', credentials);
            const { role, username, userId } = response.data; // Предполагается, что в ответе есть роль и имя пользователя

            // Логируем полученные данные
            console.log('Role:', role);
            console.log('Username:', username);
            console.log('UserId:', userId);

            // Сохраняем роль, имя пользователя и userId в localStorage
            localStorage.setItem('userRole', role);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId); // Сохраняем userId в localStorage

            // Логирование данных
            console.log(response.data); // Логирование ответа от сервера
            console.log(username); // Логирование имени пользователя
            console.log(userId); // Логирование имени пользователя

            // Перенаправляем пользователя в зависимости от его роли
            if (role === 'ADMIN') {
                navigate('/manageusers'); // Перенаправляем администратора на страницу управления пользователями
            } else {
                navigate('/'); // Перенаправляем покупателя на главную страницу
            }
            window.location.reload()
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError('Неверный логин или пароль'); // Если ошибка 500, показываем сообщение о неверных данных
            } else {
                setError('Произошла ошибка. Попробуйте снова позже'); // Для других ошибок
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 border rounded p-4 shadow">
                    <h2 className="text-center mb-4">Вход</h2>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Выводим ошибку, если она есть */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Имя пользователя</label>
                            <input
                                type="text"
                                className="form-control input-highlighted"
                                placeholder="Имя пользователя"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Пароль</label>
                            <input
                                type="password"
                                className="form-control input-highlighted"
                                placeholder="Пароль"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Вход</button>
                        <p className="text-center mt-3">
                            Нет аккаунта? <Link to="/register">Зарегестрируйся здесь</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
