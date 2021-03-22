#! /bin/bash
sudo apt update
sudo apt install nginx -y
sudo apt-get install git -y
sudo apt update
sudo apt install python3-pip -y
sudo pip3 install virtualenv
virtualenv .venv
source .venv/bin/activate
git clone https://github.com/KMVanesa/Uber-Bus-App.git
pip3 install -r Uber-Bus-App/back-end/requirements.txt
pip3 install gunicorn
sudo cp wsgi.py Uber-Bus-App/back-end/
sudo cp back-end.service /etc/systemd/system/back-end.service 
sudo systemctl daemon-reload
sudo systemctl start back-end
sudo systemctl enable back-end
sudo systemctl daemon-reload
sudo cp back-end.nginx /etc/nginx/sites-available/
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/back-end.nginx /etc/nginx/sites-enabled/back-end.nginx
sudo systemctl reload nginx