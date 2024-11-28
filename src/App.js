import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import ManageUsers from './pages/ManageUsers';
import Page from './pages/Page';
import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';
import ViewUser from './Users/ViewUser';
import Register from './Users/Register';
import Login from './Users/Login';
import Cart from './pages/Cart';
import EditProduct from './product/EditProduct';
import Checkout from './pages/checkout';
import ProductDetail from './product/ViewProduct';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './Other/ProtectedRoute'; // Импортируем компонент для защиты маршрутов
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageProducts from './pages/ManageProducts';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Маршруты для авторизованных пользователей */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute roleRequired="USER">
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />

          {/* Главная страница доступна всем */}
          <Route path="/" element={<Page />} />

          {/* Страница управления пользователями доступна только администратору */}
          <Route
            path="/manageusers"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manageproducts"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <ManageProducts />
              </ProtectedRoute>
            }
          />

          {/* Страница добавления пользователя доступна только администратору */}
          <Route
            path="/adduser"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AddUser />
              </ProtectedRoute>
            }
          />


          <Route
            path="/editproduct/:id"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <EditProduct />
              </ProtectedRoute>
            }
          />

          {/* Страница редактирования пользователя доступна только администратору */}
          <Route
            path="/edituser/:id"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <EditUser />
              </ProtectedRoute>
            }
          />

          {/* Страница просмотра пользователя доступна только администратору */}
          <Route
            path="/viewuser/:id"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <ViewUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute roleRequired="USER">
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<Cart />} />

          {/* Страница регистрации доступна всем */}
          <Route path="/register" element={<Register />} />

          {/* Страница логина доступна всем */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
