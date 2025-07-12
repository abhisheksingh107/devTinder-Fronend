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
- Open terminal and run - icacls "devTinder-secret.pem" /inheritance:r /grant:r "%USERNAME%:R"
- ssh -i "devTinder.pem" ubuntu@ec2-44-215-110-23.compute-1.amazonaws.com
- install node(should be match to the current version of local system)
- git clone the frontEnd and backend project
- git checkout -- package.json
FrontEnd
 - npm install
 - npm run build
 - sudo apt update && sudo apt install nginx -y
 - sudo systemctl start nginx
 - sudo systemctl enable nginx
 - copy code for dist(build files) to var/www/html
 - sudo cp -r ~/devTinder-Fronend/dist/* /var/www/html/
 - open port 80 in AWS

 backend 
- Allow ec2 instace public Ip on mongoDb server
- Installed pm2
- npm install -g pm2
- pm2 start src/app.js --name devtinder-backend
- pm2 save
- pm2 startup