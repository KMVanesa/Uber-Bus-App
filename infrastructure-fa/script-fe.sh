#! /bin/bash
sudo apt update
sudo apt install nginx -y
sudo apt-get install git -y
sudo apt update
git clone https://github.com/KMVanesa/Uber-Bus-App.git
sudo cp front-end.nginx /etc/nginx/sites-available/
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/front-end.nginx /etc/nginx/sites-enabled/front-end.nginx
sudo systemctl reload nginx