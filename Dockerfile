# Используем официальный образ Node.js как базовый
FROM node:16 AS build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Используем Nginx для обслуживания собранного приложения
FROM nginx:alpine

# Копируем собранные файлы в папку, обслуживаемую Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Открываем 80-й порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
