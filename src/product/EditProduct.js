import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "", // ID категории товара
        imageUrl: "",
    });

    const [categories, setCategories] = useState([]); // Список категорий
    const [image, setImage] = useState(null); // Для хранения выбранного изображения
    const { name, description, price, stock, categoryId, imageUrl } = product;

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const onDeleteImage = () => {
        setImage(null); // Убираем изображение
    };

    useEffect(() => {
        loadProduct();
        loadCategories(); // Загрузка категорий
    }, []);

    const loadProduct = async () => {
        const result = await axios.get(`https://lazy-experts-look.loca.lt/api/products/${id}`);
        setProduct(result.data);
    };

    const loadCategories = async () => {
        try {
            const result = await axios.get("https://lazy-experts-look.loca.lt/api/categories");
            console.log(result.data); // Для отладки
            setCategories(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            console.error("Ошибка при загрузке категорий:", error);
            setCategories([]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('categoryId', categoryId);

        // Если изображение выбрано, добавляем его в formData
        if (image) {
            formData.append('image', image);
        } else if (imageUrl) {
            formData.append('imageUrl', imageUrl);  // Если изображение не выбрано, используем текущую ссылку
        }

        try {
            const response = await axios.put(`https://lazy-experts-look.loca.lt/api/products/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Server response:", response);
            navigate("/manageproducts");
        } catch (error) {
            console.error("Error during product update:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Редактирование товара</h2>
                    <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">

                        {/* Поле для названия товара */}
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>
                                Название товара
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Введите название товара'
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для описания товара */}
                        <div className='mb-3'>
                            <label htmlFor='description' className='form-label'>
                                Описание товара
                            </label>
                            <textarea
                                className='form-control'
                                placeholder='Введите описание товара'
                                name="description"
                                value={description}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для цены товара */}
                        <div className='mb-3'>
                            <label htmlFor='price' className='form-label'>
                                Цена
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='Введите цену товара'
                                name="price"
                                value={price}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для количества товара на складе */}
                        <div className='mb-3'>
                            <label htmlFor='stock' className='form-label'>
                                Количество на складе
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='Введите количество товара на складе'
                                name="stock"
                                value={stock}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Поле для категории товара */}
                        <div className='mb-3'>
                            <label htmlFor='category' className='form-label'>
                                Категория
                            </label>
                            <select
                                className='form-control'
                                name="categoryId"
                                value={categoryId}
                                onChange={(e) => onInputChange(e)}
                            >
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>Загрузка категорий...</option>
                                )}
                            </select>
                        </div>

                        {/* Поле для изображения товара */}
                        <div className='mb-3'>
                            <label htmlFor='image' className='form-label'>
                                Изображение товара
                            </label>
                            {imageUrl && (
                                <div className="mb-3">
                                    <img
                                        src={product.imageUrl ? `https://lazy-experts-look.loca.lt/product/${product.imageUrl}` : 'https://via.placeholder.com/500x500'}
                                        alt="Product"
                                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                                    />
                                    <p>Текущее изображение</p>
                                    <button type="button" className="btn btn-danger" onClick={onDeleteImage}>
                                        Удалить изображение
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={onImageChange}
                            />
                        </div>

                        {/* Кнопки отправки и отмены */}
                        <button type='submit' className="btn btn-outline-primary">
                            Отправить
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/manageproducts">
                            Отмена
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
