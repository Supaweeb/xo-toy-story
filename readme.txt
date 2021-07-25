### Setup step ###

In the backend directory (cd ./backend), you can run:
### `python -m pip install Django`
to install Django

### pip install djangorestframework django-cors-headers`
to install djangorestframework django-cors-headers for this project

### `python manage.py runserver`
To run server open http://localhost:8000/admin to view backend as admin

In the fontend directory (cd ./fontend), you can run:

### `npm install`
For install module library in this app

### `npm install axios`
To install axios for using API you can open
api root from http://localhost:8000/api

And run the app by:
### `npm start`
Open http://localhost:3000 to view it in the browser

### Application design ###
The application is XO game (Tic tae toe game)
Fontend : ReactJS JS CSS Reactstrap
Backend : Django
Database : SQLite3
Computer : Using minimax and alpha beta pruning to find
which way computer should make the move
API : Axios to GET POST data

### Algorithm ###

Algorithm to find best way move for computer are:
- Minimax
To find which taken best score from computer move
and set depth to 1 because it take too long to search
which way the computer should make the move 
- Alpha beta pruning
Used to reduce number of node for analysis from minimax algorithm