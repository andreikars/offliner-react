import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Получаем userId из localStorage

  // Функция для округления до двух знаков после запятой
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  useEffect(() => {
    // Получаем товары в корзине текущего пользователя
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://8.211.51.110:8080/api/cart?userId=${userId}`);
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке корзины", error);
      }
    };

    fetchCartItems();
  }, [userId]); // Зависимость от userId

  // Вычисление общей цены корзины
  const calculateTotalPrice = (cartItems) => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);
  };

  // Обработчик для изменения количества товара в корзине
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10); // Преобразуем в число

    if (quantity <= 0) return; // Количество не может быть меньше 1
    if (isNaN(quantity)) return; // Проверка на некорректный ввод

    try {
      // Отправляем обновление на сервер
      await axios.put(`http://8.211.51.110:8080/api/cart/${cartItemId}`, { quantity });

      // Обновляем локальное состояние корзины
      const updatedCart = cartItems.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      );
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error("Ошибка при обновлении количества", error);
    }
  };

  // Обработчик для удаления товара из корзины
  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://8.211.51.110:8080/api/cart/${cartItemId}`);
      const updatedCart = cartItems.filter(item => item.id !== cartItemId);
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error("Ошибка при удалении товара", error);
    }
  };

  
  // Переход к оформлению заказа
  const handleCheckout = () => {
    navigate('/checkout'); // Переход на страницу оформления заказа
  };

  return (
    <div className="container mt-4">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Товар</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Итого</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="form-control"
                      min="1"
                    />
                  </td>
                  <td>{formatPrice(item.product.price)} руб.</td>
                  <td>{formatPrice(item.product.price * item.quantity)} руб.</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <h4>Общая сумма: {formatPrice(totalPrice)} руб.</h4>
            <button
              className="btn btn-success"
              onClick={handleCheckout}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
