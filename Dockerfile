FROM ubuntu 
RUN apt update 
RUN apt install apache2 -y
RUN apt install apache2-utils -y
RUN apt clean 
COPY index.html main.js styles.css /var/www/html/
ADD --chown=www-data:www-data images /var/www/html/
ADD --chown=www-data:www-data sounds /var/www/html/
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
