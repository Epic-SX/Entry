ls
cd /etc
ls
c apache2/
ls
cd apache2/
ls
vim apache2.conf 
cd conf-enabled
ls
cd ..
ls
cd sites-enabled/
ls
vim 000-default.conf
exit
ls
cd ..
ls
cd garden_entry
ls
composer update
cd setup
ls
vim setup.sh
cd app
ls
cd ../app
ls
cd ../setup
ls
cd ..
ls
ls -la
exit
cd ../garden_entry/
cd setup
ls
cat setup1.sh
composer update --ignore-platform-req=ext-gd
cat setup1.sh
ls
rm phpunit
cd ..
composer update --ignore-platform-req=ext-gd
APP_NAME="Yamata Kindergarten"
APP_ENV=staging
APP_KEY=base64:p47QjdTjVf391vpgdLNwygc7IGuMs6K05/i0IPQH0tE=
APP_DEBUG=true
APP_URL=https://ga-t.yamata-youchien.com/
INFO_EMAIL=masaki.ichikawa@yamata.org
LOG_CHANNEL=stack
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=garden_entry_t
DB_USERNAME=procareer
DB_PASSWORD=mocp-1laF
BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=database
SESSION_DRIVER=file
SESSION_LIFETIME=120
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=renraku@yamata.org
MAIL_PASSWORD=kdgczkxdscghttme
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=renraku@kuriharagakuen.ac.jp
MAIL_FROM_NAME=やまた幼稚園
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1
MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
STRIPE_API_KEY=pk_test_51L3aVrKpdXoeribFLA0g65Q3vUPIUm7gLHRqcAW9d5cCXZWYwrwd8jVb9iDWnRTNSwkGmcXUNUES3fbwFNXsPaOz00fGAcFpxR
STRIPE_SECRET_API_KEY=sk_test_51L3aVrKpdXoeribFbsIqS3WQ4hbyedoQ1jWwdX714lCAvP7gDmwdVl0WPPWlXiGlNTSsYXMG0v6iwOECG7Ux7cth00aEJOLe0z
cat ./setup/setup1.sh
composer require stripe/stripe-php
cat ./setup/setup.sh
composer require --dev phpunit/php-code-coverage
cd setup
rm setup1.sh
cd ..
ls
cd storage
ls
cd app
ls
cd public
ls
cd ..
ls
cd ..
ls
ls -la
cd logs
ls
docker exec -it kurihara-www-1
cd ../..
cd setup
cp setup.sh setup1.sh
vim setup1.sh
cd ..
./setup/setup1.sh
chmod 755 ./setup/setup1.sh
./setup/setup1.sh
cd app/Views
ls
grep -r datepicker ./*
cd ..
grep -r APP_ENV ./*
mysql
ls
mysql
exit
ls
cd ..
ls
cd ..
ls
cd ursula
ls
cd setup
ls
./setup.sh
ls
ls -la
chmod 755 ./*
ls
ls -la
cd ..
ls
chmod 755 re_compose.sh
./re_compose.sh 
cat re_compose.sh
sudo composer install
composer install
cat re_compose.sh
npm update
vim .env
npm run build
vim .env
php artisan cache:clear
php artisan config:clear
php artisan config:clear
ls
cd cache
ls
mkdir cache
chmod 777 cache
ls
exit
cd ../..
ls
cd ursula
ls
ls -la
rm controllers
rm views
./phpunit
cd setup
ls
./copy_font.sh 
vim copy_font.sh
./copy_font.sh 
cd ..
./phpunit
exit
ls
cd ..
cd ../ursula
ls
cd storage
ls
cd framework/views/
ls
cd ..
ls
ls -la
cd views
rm ./*
ls
cd ../../..
php artisan make:migration crea alter_students
php artisan make:migration crea update_students_table
php artisan make:migration update_students_table
composer require doctrine/dbal
git status
exit
ls
cd ../../
cd ursula
ls
./phpunit
./phpunit
./phpunit
./phpunit
git commit -am "test all and debug"
exit
ls
cd ..
cd ..
ls
cd ursula
ls
npm update
composer update
composer autodump
php artisan autodump
ls
cd public
ls
cd storage
ls
cd img
ls
cd face_photo/
ls
git add no_image.png
cd ../../..
cd ..
vim .gitignore 
git status
exit
ls
cd ..
ls
cd ..
ls
cd ursula
ls
cd setup
ls
cat db_copy_ursula.sh 
./db_copy_ursula.sh develop
exit
ls
cd ../..
ls
cd ursula
ls
php artisan create_user 2023
php artisan create_user 2023
git status
exit
ls
cd ../..
cd ursula
ls
php artisan create_school_classes 2023
php artisan create_school_classes 2023
ls
exit
ls
cd ..
cd ..
ls
cd ursula
ls
composer update
exit
cd ../..
ls
cd ursula
ls
php artisan create_schedules_20230412
php artisan create_schedules_20230412
php artisan create_schedules_20230412
cd setup
ls
cd ..
php artisan create_schedules_20230412
exit
ls
cd ..
ls
cd ..
ls
cd garden_entry/
ls
cd config
git status
git commit -a
git pull origin master
cd ..
git commit -am "update file"
cat ./setup/setup.sh
cd setup
ls
cat git_deploy.sh 
cd ..
ls
git commit -am "update setup"
git config --global user.email "ichikawa@procareer.co.jp"
git config --global user.name "masaki ichikawa"
git commit -am "update setup"
git pull origin master
ls
cd app
ls
cd Controllers
ls
cd Auth
ls
vim RegisterController.php 
cd ../../..
php artisan route:list
git status
git commit -am "update email templates"
git push origin master
exit
ls
cd ../..
ls
cd ursula
ls
cd /usr/bin/php
ls
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/QueryModels/ValueObjects/SchoolClassResultAggrigateTest.php 
./phpunit ./tests/QueryModels/ValueObjects/SchoolClassResultAggrigateTest.php 
./phpunit ./tests/QueryModels/ValueObjects/SchoolClassResultAggrigateTest.php 
./phpunit ./tests/QueryModels/ValueObjects/SchoolClassResultAggrigateTest.php 
./phpunit ./tests/QueryModels/ValueObjects/SchoolClassResultAggrigateTest.php 
./phpunit ./tests/QueryModels/ValueObjects/SchoolClassResultAggrigateTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php -vvv
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit ./tests/QueryModels/SchoolRecordQueryModelTest.php 
./phpunit
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
cd setup
ls
cat db_copy_ursula.sh 
sudo ./db_copy_ursula.sh develop
./db_copy_ursula.sh develop
cd ..
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
exit
ls
cd ../..
ls
cd ursula
ls
./phpunit
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/Usecases/StudentUsecaseTest.php 
./phpunit ./tests/DomainModels/SchoolClassDomainModel
./phpunit ./tests/DomainModels/SchoolClassDomainModel.php
./phpunit ./tests/DomainModels/SchoolClassDomainModelTest.php 
./phpunit ./tests/DomainModels/SchoolClassDomainModelTest.php 
./phpunit
./phpunit
grep -r ./tests/*
grep -r var_dump ./tests/*
grep -r echo ./tests/*
grep -r var_dump ./app/*
git status
exit
cd ../..
ls
cd ursula
ls
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
./phpunit ./tests/Models/StudentTest.php 
exit
cd ../..
cd ursula
ls
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
./phpunit ./tests/Usecases/SchoolRecordUsecaseTest.php 
exit
ls
cd ..
ls
cd ..
ls
cd kurihara-lex
ls
exit
ls
cd ..
ls
cd ..
ls
cd ~
ls
exit
