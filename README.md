# testjubelio
Backend and frontend

Clone repository
- git clone https://github.com/ego0/testjubelio

Backend:
- cd backend
- npm install
- /config/db.js sesuaikan database_name, username, password dengan local database
- import db.sql ke local database  "psql -U username dbname < dbexport.sql"
- node app.js or nodemon app.js

frontend:
- cd frontend
- npm install
- npm start

NOTED:
- MOBX tidak menggunakan decorator karena feature nya juga sedikit jadi memutuskan untuk tidak menginstall babel, etc
- HAPI.JS(v18)
- AXIOS untuk HTT request
- SEQUELIZE orm postgresql
- XML2JSON untuk mengconvert XML to Json
- minus
  - belum bisa edit image 
  - validation form edit di front end belum
  - return json masih standar
