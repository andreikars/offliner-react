import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Подключение Bootstrap JS

export default function Navbar() {
  const [role, setRole] = useState(localStorage.getItem('userRole')); // Для роли пользователя
  const [username, setUsername] = useState(localStorage.getItem('username')); // Для имени пользователя
  const navigate = useNavigate();

  // Обновление состояния при изменениях в localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('userRole'));
      setUsername(localStorage.getItem('username'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setRole(null);
    setUsername(null);
    navigate('/login'); // Перенаправление на страницу входа
    window.location.reload(); // Перезагрузим страницу после успешного входа
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <img
              src="/logo.png" // Путь к вашему логотипу
              alt="Offliner Logo"
              style={{ height: '40px', width: '130px' }}  // Настройте размер лого по желанию
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Пользователь с ролью ADMIN */}
              {role === 'ADMIN' && (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-outline-light ms-2 mb-2 mb-lg-0" to="/manageusers">
                      Управление пользователями
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-light ms-2 mb-2 mb-lg-0" to="/manageproducts">
                      Управление товарами
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Кнопки регистрации, входа и выхода справа */}
            <div className="d-flex flex-column flex-lg-row align-items-center ms-auto">
              {/* Если нет авторизации */}
              {!role && (
                <>
                  <Link className="btn btn-outline-light ms-2 mb-2 mb-lg-0" to="/register">
                    Регистрация
                  </Link>
                  <Link className="btn btn-light ms-2 mb-2 mb-lg-0" to="/login">
                    Вход
                  </Link>
                </>
              )}

              {/* Личный кабинет и выход для авторизованных пользователей */}
              {username && (
                <>
                  <Link className="btn btn-outline-light ms-2 mb-2 mb-lg-0" to="/profile">
                    Личный кабинет: {username}
                  </Link>
                  <button className="btn btn-light ms-2 mb-2 mb-lg-0" onClick={handleLogout}>
                    Выйти
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
