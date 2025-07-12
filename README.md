# devTinder

- create a vite + react application
- remove a unnecessary code and create Hello world app
- Install tailwind CSS
- Install daisy UI
- Add navbar component to App.jsx
- create a Navbar seperate component file
- Install react-router 
- Create BrowserRouter > Routes > Route=/ Body > ChildrenRoutes
- Create a outlet in body components
- create a footer
- create a login page
- Install axios 
- CORS - install cors in backend => add the middleware in backend  with confirgration: origin, credentials: true
- whenever your arr making an API call so pass axios => {withcredentials: true}
- Install redux-toolkit and react-redux 
- configure Store => Provider => createSlice => add reducer to store
- Add reduc tool in chrome devtool
- Login and see if your data is  comming properly in the store
- Navbar should update as soon as user loggedin
- you should not be access any other routes without login
- if the token is not present, redirect user to /login page 
- logout feature 
- Get the feed and add the feed in the store
- build the User card on feed
- Edit Profile features
- Show toast on save of the profile
- New Page - See all connections
- New Page - see all requests
- feature - Accept/reject connection request
- feature - send interested/ingnored connection request
- feature SignUp 

# Deployment 
- Sign up on AWS
- Launching the instance
- chmod 400 devTinder-secret.pem  (it’s for Linux/macOS only)
- Open terminal and run -> icacls "devTinder-key.pem" /inheritance:r /grant:r "%USERNAME%:R"
- ssh -i "devTinder.pem" ubuntu@ec2-44-215-110-23.compute-1.amazonaws.com
- install node(should be match to the current version of local system)  ---> curl -fsSL https://deb.nodesource.com/setup_22.x | sudo-E bash -sudo apt install -y nodejs
- git clone the frontEnd and backend project
- git checkout -- package.json


FrontEnd
 - npm install -> installed dependencies 
 - npm run build - creat dist for production 

Install the nginx
 - sudo apt update && sudo apt install nginx -y
 - sudo systemctl start nginx
 - sudo systemctl enable nginx
 - copy code for dist(build files) to var/www/html
 - sudo cp -r ~/devTinder-Fronend/dist/* /var/www/html/
 - enable port :80 for intances (Aws Security group)
 - sudo nginx -t sudo systemctl reload nginx
 - Make sure: You're using http://, not https://

 backend 
- Allow EC2 instace public IP on mongoDb server(Add IP)
- Now backend was running on 7777 -> enable port :7777 for intances (Aws Security group)
- Now we have to keep our application runing 24*7 then we have to Install pm2
- sudo npm install -g pm2
- Now we have to run npm-start via pm2 So 
- pm2 start src/app.js --name devtinder-backend

# Nginx config
Now our
 FRONTEND running - http://<your-ec2-ip>
 BACKEND runnit - http://<your-ec2-ip>:7777

 Domain Name => devtinder.com = http://<your-ec2-ip>
 FRONTEND - devtinder.com
 BackEND - devtinder.com:7777  => devtinder.com/api/ (We have to map /api/ to :7777 nginx proxy pass)

 - NGINX Config: Should correctly proxy /api to port 7777 (your backend port).
 - sudo nano /etc/nginx/sites-available/default

Paste it below the existing location / { ... } block:

server {
    listen 80;
    server_name <your-ec2-ip>;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:7777;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

 You’ve reloaded NGINX after editing:
- sudo nginx -t
sudo systemctl reload nginx

