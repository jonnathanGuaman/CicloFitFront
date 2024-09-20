# Usar una imagen base de Node.js para construir la aplicación
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build --prod

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos de la aplicación construida a la carpeta de Nginx
COPY --from=build /app/dist/login/browser /usr/share/nginx/html 

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
