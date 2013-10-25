# README: Django Todo-List Practice

###Features

User login/register (Django User module) 

Ajax add Edit Delete Todo List (Jquery Ajax (json,XML,HTML))


Installation
------------

### Pre-requisites
  - Python 2.7.2
  - Django
  https://docs.djangoproject.com/en/1.5/intro/install/#install-django

### Run
#### Database
  To sync and create tables, do:
  `python manage.py syncdb`
#### RunServer  
`python manage.py runserver`

Type in browser `https://localhost:8000/todolist`


### Settings

Look in [/TodoList/settings.py](https://github.com/riggery/TodoList_Practice_Django/blob/master/TodoList/settings.py) to see a list of available settings.




### Details
- Django User module and From modual([form.py](https://github.com/riggery/TodoList_Practice_Django/blob/master/todo_list/forms.py)) are used to build login/register functionality.
- [/todo_list/Views.py](https://github.com/riggery/TodoList_Practice_Django/blob/master/todo_list/views.py) include five main controller functions (register, add_item, delete_item, edit_item, get_list). 
  All functions are called by Jquery ajax in [ajax.js](https://github.com/riggery/TodoList_Practice_Django/blob/master/todo_list/static/js/ajax.js). 
  Three data passing format(XML, JSON, Html) are used to receive response from add_item, delete_item, edit_item, get_list accordingly. So every time only update items are sent and updated instead passing all data. 

### ScreenShot



### Reference
- Static web page design refer to Abiyasa Suhardi 'todotodo' 
