import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {

    const [user, setUser] = useState({
        first_name: "",
        second_name: "",
        username: "",
        email: "",
        phone: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`https://lazy-experts-look.loca.lt/user/${id}`);
        setUser(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Детали пользователя</h2>

                    <div className="card">
                        <div className="card-header">
                            Детали пользователя с ID: {user.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Имя:</b>
                                    {user.first_name}
                                </li>
                                <li className="list-group-item">
                                    <b>Фамилия:</b>
                                    {user.second_name}
                                </li>
                                <li className="list-group-item">
                                    <b>Имя пользователя:</b>
                                    {user.username}
                                </li>
                                <li className="list-group-item">
                                    <b>Email:</b>
                                    {user.email}
                                </li>
                                <li className="list-group-item">
                                    <b>Номер телефона:</b>
                                    {user.phone}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/manageusers"}>
                        Назад
                    </Link>
                </div>
            </div>
        </div>
    );
}
