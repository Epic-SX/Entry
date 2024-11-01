FROM php:8.1-apache
RUN cd /etc/apache2/mods-enabled \
  && ln -s ../mods-available/rewrite.load
ADD 000-default.conf /etc/apache2/sites-enabled/
#ADD php.ini /usr/local/etc/php/

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update \
  && apt-get -y install vim zip unzip \
  libzip-dev libpng-dev libpq-dev libfreetype6-dev libjpeg-dev libonig-dev \
  nodejs npm
RUN docker-php-ext-install pdo pdo_mysql mysqli zip exif
RUN docker-php-ext-configure gd \
  --with-freetype=/usr/include/ \
  --with-jpeg=/usr/include
RUN docker-php-ext-install -j$(nproc) gd

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN rm -rf node_modules
RUN apt-get install -y nodejs
RUN npm install npm -g n --save-dev cross-env
# RUN npm cache clear --force
RUN npm install webpack --save

RUN pecl install xdebug \
  && docker-php-ext-enable xdebug
