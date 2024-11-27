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
                const result = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(result.data);
            } catch (error) {
                console.error('Error loading product details:', error);
            }
        };

        loadProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>; // Если данные о товаре еще не загружены
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    {/* Изображение товара */}
                    <img
                        src={product.imageUrl ? `http://localhost:8080/product/${product.imageUrl}` : 'https://via.placeholder.com/500x500'}
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
                    <button className="btn btn-primary btn-lg mt-3">
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
