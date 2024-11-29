import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
        RAWpassword: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Логируем данные перед отправкой
        console.log('Form data:', formData);
    
        // Проверка на пустой пароль
        if (!formData.password) {
            setErrors(prev => ({
                ...prev,
                password: 'Пароль не может быть пустым'
            }));
            return;  // Останавливаем выполнение, если пароль пустой
        }
    
        try {
            await axios.post('http://8.211.51.110:8080/auth/register', formData);
            alert('Регистрация прошла успешно');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data); // Устанавливаем ошибки, полученные от сервера
            } else {
                alert('Ошибка регистрации: ' + error.message);
            }
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 border rounded p-4 shadow">
                    <h2 className="text-center mb-4">Регистрация</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Имя</label>
                            <input 
                                type="text" 
                                className="form-control input-highlighted"  
                                placeholder="Введите имя" 
                                name="first_name" 
                                value={formData.first_name} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Фамилия</label>
                            <input 
                                type="text" 
                                className="form-control input-highlighted"
                                placeholder="Введите фамилию" 
                                name="second_name" 
                                value={formData.second_name} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Имя пользователя</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.username ? 'is-invalid' : ''} input-highlighted`} 
                                placeholder="Введите имя пользователя" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className={`form-control ${errors.email ? 'is-invalid' : ''} input-highlighted`} 
                                placeholder="Введите email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Номер телефона</label>
                            <input 
                                type="tel" 
                                className={`form-control ${errors.phone ? 'is-invalid' : ''} input-highlighted `} 
                                placeholder="Введите номер телефона" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Пароль</label>
                            <input 
                                type="password" 
                                className={`form-control ${errors.password ? 'is-invalid' : ''} input-highlighted`} 
                                placeholder="Введите пароль" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Регистрация</button>
                        <p className="text-center mt-3">
                            Уже есть аккаунт? <Link to="/login">Войти здесь</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
