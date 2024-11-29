import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
    const { id } = useParams(); // Получаем ID товара из URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Загрузка информации о товаре
        const loadProduct = async () => {
            try {
                const result = await axios.get(`http://8.211.51.110:8080/api/products/${id}`);
                setProduct(result.data);
            } catch (error) {
                console.error('Error loading product details:', error);
            }
        };

        loadProduct();
    }, [id]);

    const handleAddToCart = async () => {
        const username = localStorage.getItem('username'); // Получаем имя пользователя из localStorage
        if (!username) {
            alert('Для добавления товара в корзину, нужно войти в систему!');
            return;
        }

        const userId = localStorage.getItem('userId'); // ID пользователя из localStorage
        if (!userId) {
            alert('Не удалось получить ID пользователя');
            return;
        }

        if (!product) {
            alert('Не удалось получить информацию о товаре');
            return;
        }

        try {
            const quantity = 1; // Количество товара по умолчанию

            const cartItem = {
                product: { id: product.id },
                user: { id: userId },
                quantity: quantity
            };

            // Отправка запроса на добавление товара в корзину
            await axios.post('http://8.211.51.110:8080/api/cart', cartItem);

            alert('Товар добавлен в корзину!');
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
            alert('Произошла ошибка при добавлении товара в корзину');
        }
    };

    if (!product) {
        return <div>Loading...</div>; // Если данные о товаре еще не загружены
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    {/* Изображение товара */}
                    <img
                        src={product.imageUrl ? `http://8.211.51.110:8080/product/${product.imageUrl}` : 'https://via.placeholder.com/500x500'}
                        alt={product.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    {/* Информация о товаре */}
                    <h2>{product.name}</h2>
                    <p className="text-muted">Категория: {product.category?.name || 'No Category'}</p>
                    <p className="h4 text-success">{product.price} р.</p>
                    <p className="text-secondary">{product.stock} на складе</p>

                    {/* Описание товара */}
                    <h5>Описание</h5>
                    <p>{product.description}</p>

                    {/* Добавить в корзину */}
                    <button className="btn btn-primary btn-lg mt-3" onClick={handleAddToCart}>
                        Добавить в корзину
                    </button>
                </div>
            </div>

            {/* Отзывы о товаре */}
            <div className="mt-5">
                <h4>Отзывы</h4>
                {/* Пример отзывов */}
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">John Doe</h5>
                        <p className="card-text">Great product! Really happy with the quality and performance.</p>
                    </div>
                </div>
                <div className="card mt-2">
                    <div className="card-body">
                        <h5 className="card-title">Jane Smith</h5>
                        <p className="card-text">Good value for money. Would recommend to others.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
