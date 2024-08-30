# Etapa 1: Servidor Nginx
FROM nginx:alpine

# Establecer el directorio de trabajo en Nginx
WORKDIR /usr/share/nginx/html

# Copiar los archivos construidos desde la máquina local al directorio de Nginx
COPY dist/front/browser /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposición del puerto
EXPOSE 4200

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
