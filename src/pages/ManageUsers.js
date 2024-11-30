import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    // Функция загрузки пользователей
    useEffect(() => {
        loadUsers();
    }, []);

    // Загрузка пользователей с сервера
    const loadUsers = async () => {
        const result = await axios.get("http://8.211.51.110:8080/users");
        setUsers(result.data);
    };

    // Удаление пользователя
    const deleteUser = async (id) => {
        await axios.delete(`http://8.211.51.110:8080/user/${id}`);
        loadUsers();
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Телефон</th>
                            <th scope="col">Имя пользователя</th>
                            <th scope="col">Электронная почта</th>
                            <th scope="col">Роль</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.first_name}</td>
                                    <td>{user.second_name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link
                                            className='btn btn-primary mx-2'
                                            to={`/viewuser/${user.id}`}
                                        >
                                            Просмотр
                                        </Link>
                                        <Link
                                            className='btn btn-outline-primary mx-2'
                                            to={`/edituser/${user.id}`}
                                        >
                                            Редактировать
                                        </Link>
                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
