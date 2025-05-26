import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // Для списка категорий
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '', // Для выбранной категории
        image: null
    });

    // Загрузка продуктов и категорий
    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    // Загрузка продуктов с сервера
    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/api/products");
        setProducts(result.data);
    };

    // Загрузка категорий с сервера
    const loadCategories = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/categories");
            // Логируем для отладки
            console.log(result.data); 
            setCategories(Array.isArray(result.data) ? result.data : []); // Обеспечиваем, что это массив
        } catch (error) {
            console.error("Ошибка при загрузке категорий:", error);
            setCategories([]); // Если ошибка, устанавливаем пустой массив
        }
    };

    // Удаление продукта
    const deleteProduct = async (id) => {
        await axios.delete(`http://8.211.51.110:8080/api/products/${id}`);
        loadProducts();
    };

    // Обработчик для ввода данных нового товара
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Обработчик для выбора файла изображения
    const handleImageChange = (e) => {
        setNewProduct({ ...newProduct, image: e.target.files[0] });
    };

    // Добавление нового продукта
    const addProduct = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("price", newProduct.price);
        formData.append("stock", newProduct.stock);
        formData.append("categoryId", newProduct.categoryId); // Передаем ID категории
        console.log(newProduct.categoryId); // Just log the categoryId
        if (newProduct.image) {
            formData.append("image", newProduct.image); // Добавляем изображение
        }
    
        try {
            await axios.post("http://localhost:8080/api/products", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setNewProduct({
                name: '',
                description: '',
                price: '',
                stock: '',
                categoryId: '',
                image: null
            });
            loadProducts();
        } catch (error) {
            console.error("Произошла ошибка при добавлении товара!", error);
        }
    };

    return (
        <div className="container">
            <div className="py-4">
                {/* Таблица с товарами */}
                <h3>Управление товарами</h3>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Цена</th>
                            <th scope="col">В наличии</th>
                            <th scope="col">Категория</th>
                            <th scope="col">Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td className="description-column">{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category?.name || "Без категории"}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/product/${product.id}`}
                                        >
                                            Просмотр
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/editproduct/${product.id}`}
                                        >
                                            Редактировать
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteProduct(product.id)}
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

            {/* Форма для добавления нового товара */}
            <div className="mt-4">
                <h4>Добавить новый товар</h4>
                <form onSubmit={addProduct}>
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <label htmlFor="name" className="form-label">Название товара</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                id="name"
                                name="name"
                                value={newProduct.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="description" className="form-label">Описание</label>
                            <textarea
                                className="form-control form-control-sm"
                                id="description"
                                name="description"
                                value={newProduct.description}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', resize: 'none', maxHeight: '100px' }}  // Уменьшаем высоту и ширину
                            />
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="price" className="form-label">Цена</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                id="price"
                                name="price"
                                value={newProduct.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-1 mb-2">
                            <label htmlFor="stock" className="form-label">В наличии</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                id="stock"
                                name="stock"
                                value={newProduct.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="categoryId" className="form-label">Категория</label>
                            <select
                                className="form-control form-control-sm"
                                id="categoryId"
                                name="categoryId"
                                value={newProduct.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Выберите категорию</option>
                                {Array.isArray(categories) && categories.length > 0 ? (
                                    categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Категории отсутствуют</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="image" className="form-label">Изображение товара</label>
                            <input
                                type="file"
                                className="form-control form-control-sm"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm mt-2">Добавить товар</button>
                </form>
            </div>
        </div>
    );
}
