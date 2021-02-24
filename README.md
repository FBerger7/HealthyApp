<h1>HEALTHY APP</h1>  
An app which tracks your weight and height and can calculate your BMI index.

<h2>Install guide</h2>

1. Clone this repository into your local machine

2. Install Python 3.8 if you don't have it already installed on your machine

3. Install Node.js if you don't have it already installed on your machine

4. Create a virtual environment in your project - [Click here for more info](https://docs.python.org/3/tutorial/venv.html)

5. Install python requirements with the command: ```pip install -r requirements.txt```

6. Add npm modules with the command: ```npm install```

<h2>Starting the app guide</h2>

1. In the project folder start the django server by running the command: ```python manage.py runserver```

2. In the react_app folder start the react server by running the command: ```npm start```

3. The app should be running under the http://localhost:3000 address

<h2>Screens from working app</h2>  
"Home" view in the app, where the user is informed to log in  

![Sign in view](/resources/app_images/1.jpg?raw=true)  

"Sign in" view in the app, where you can register your account  

![Sign in view](/resources/app_images/2.jpg?raw=true)  

"Login" view in the app, where you can login into your account  

![Sign in view](/resources/app_images/3.jpg?raw=true)  

"Home" view for a logged in user, which displays a welcome message for the user and an Airly widget displaying the air condition  

![Sign in view](/resources/app_images/4.jpg?raw=true)

"Map" view for a logged in user, which displays an OpenStreetMap made with the Leaflet library    

![Sign in view](/resources/app_images/5.jpg?raw=true)

"BMI" view for a logged in user, which displays a BMI index calculator where the user can input their height and weight which will be stored in the database      

![Sign in view](/resources/app_images/6.jpg?raw=true)
