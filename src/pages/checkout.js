import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Состояние для отслеживания успеха оплаты
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
        const response = await axios.get(`https://yellow-knives-see.loca.lt/api/cart?userId=${userId}`);
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

  // Симуляция оплаты
  const handlePayment = () => {
    setTimeout(() => {
      // Очистить корзину
      axios.delete(`https://yellow-knives-see.loca.lt/api/cart/clear?userId=${userId}`)
        .then(() => {
          localStorage.removeItem('cart'); // Удаляем корзину из localStorage
          setPaymentSuccess(true); // Устанавливаем состояние успешной оплаты
        })
        .catch((error) => {
          console.error("Ошибка при очистке корзины", error);
        });
    }, 2000); // Симуляция процесса оплаты (2 секунды)
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Оформление заказа</h2>

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
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatPrice(item.product.price)} руб.</td>
                  <td>{formatPrice(item.product.price * item.quantity)} руб.</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <h4>Общая сумма: {formatPrice(totalPrice)} руб.</h4>
          </div>

          <button className="btn btn-primary mt-3" onClick={handlePayment}>
            Оплатить
          </button>

          {/* Сообщение об успешной оплате */}
          {paymentSuccess && (
            <div className="alert alert-success mt-4">
              <strong>Оплата прошла успешно!</strong> Ваши товары ожидают выдачи на пункте самовывоза по адресу "БГУИР Корпус 3".
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
