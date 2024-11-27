import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]); // Для хранения товаров
  const [categories, setCategories] = useState([]); // Для хранения категорий
  const [searchQuery, setSearchQuery] = useState(''); // Для поиска товаров
  const [selectedCategory, setSelectedCategory] = useState(null); // Для выбранной категории
  const [username, setUsername] = useState(localStorage.getItem('username')); // Для имени пользователя
  const [role, setRole] = useState(localStorage.getItem('userRole')); // Для роли пользователя
  const navigate = useNavigate();

  // Загружаем товары и категории при инициализации компонента
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [selectedCategory]); // Перезагружаем товары при изменении категории

  // Функция для загрузки товаров с сервера
  const loadProducts = async () => {
    try {
      let url = 'https://nine-clubs-wonder.loca.lt/api/products/all';
      if (selectedCategory) {
        console.log(`Fetching products with category ID: ${selectedCategory.id}`);
        url = `https://nine-clubs-wonder.loca.lt/api/products?categoryId=${selectedCategory.id}`;
      }
      const result = await axios.get(url);
      setProducts(result.data);
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  };


  // Функция для загрузки категорий с сервера
  const loadCategories = async () => {
    try {
      const result = await axios.get('https://nine-clubs-wonder.loca.lt/api/categories');
      setCategories(result.data); // Сохраняем данные категорий
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  };

  // Обработчик изменения значения в поисковой строке
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик изменения выбранной категории
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Устанавливаем выбранную категорию
  };

  // Фильтруем товары по поисковому запросу
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функция для добавления товара в корзину
  const handleAddToCart = async (productId) => {
    if (!username) {
      alert('Для добавления товара в корзину, нужно войти в систему!');
      return;
    }
  
    const userId = localStorage.getItem('userId'); // ID пользователя из localStorage
    if (!userId) {
      alert('Не удалось получить ID пользователя');
      return;
    }
  
    if (!productId) {
      alert('Не удалось получить ID товара');
      return;
    }
  
    try {
      const quantity = 1; // Количество товара по умолчанию
  
      const cartItem = {
        product: { id: productId },
        user: { id: userId },
        quantity: quantity
      };
  
      // Отправка запроса на добавление товара в корзину
      await axios.post('https://nine-clubs-wonder.loca.lt/api/cart', cartItem);
  
      alert('Товар добавлен в корзину!');
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
      alert('Произошла ошибка при добавлении товара в корзину');
    }
  };

  return (
    <div>
      {/* Заголовок для главной страницы */}
      <div className="container" style={{ marginTop: '40px' }}>
        <h2 className="text-left mb-4" style={{ fontWeight: 'bold' }}>Каталог</h2>

        {/* Поиск товаров */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск товаров"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Раздел с категориями */}
        <div className="row mb-4">
          <div className="col-md-12">
            <ul className="list-inline">
              <li className="list-inline-item">
                <button
                  onClick={() => setSelectedCategory(null)} // Для сброса выбранной категории
                  className="btn btn-outline-primary"
                >
                  Все категории
                </button>
              </li>
              {categories.map((category) => (
                <li className="list-inline-item" key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category)} // Выбор категории
                    className="btn btn-outline-primary"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img
                    src={`https://nine-clubs-wonder.loca.lt${product.imageUrl}`} // Путь, начинающийся с /product/
                    className="card-img-top"
                    alt={product.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Цена: {product.price} руб.</p>
                    <p className="card-text">В наличии: {product.stock}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">
                      Подробнее
                    </Link>
                    {/* Кнопка для добавления товара в корзину */}
                    <button
                      className="btn btn-success ms-3"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
}
