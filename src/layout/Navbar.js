import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState(''); // Для поиска товаров
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

  // Обработчик изменения значения в поисковой строке
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
            Offliner
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
                    <Link className="nav-link active" aria-current="page" to="/manageusers">
                      Управление пользователями
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/manageproducts">
                      Управление товарами
                    </Link>
                  </li>
                </>
              )}


            </ul>

            {/* Общий поиск для всех */}
            <div className="d-flex mx-auto" style={{ width: '55%' }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Поиск товаров"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ minWidth: '100%' }}
              />
            </div>

            {/* Кнопки регистрации, входа и выхода справа */}
            <div className="d-flex ms-auto">
              {!role && (
                <>
                  <Link className="btn btn-outline-light ms-2" to="/register">
                    Регистрация
                  </Link>
                  <Link className="btn btn-outline-light ms-2" to="/login">
                    Вход
                  </Link>
                </>
              )}

              {/* Личный кабинет и выход для авторизованных пользователей */}
              {username && (
                <>
                  <Link className="btn btn-outline-light ms-2" to="/profile">
                    {username}
                  </Link>
                  <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
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
