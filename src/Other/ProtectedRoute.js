import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  // Получаем роль пользователя из localStorage
  const userRole = localStorage.getItem('userRole');
  
  // Проверяем, есть ли роль и если она не совпадает с требуемой ролью, перенаправляем
  if (!userRole || (roleRequired && !userRole.includes(roleRequired))) {
    // Если роль не найдена или не соответствует требуемой, перенаправляем на главную страницу
    return <Navigate to="/" replace />;
  }

  return children; // Если роль соответствует, показываем компонент
};

export default ProtectedRoute;
