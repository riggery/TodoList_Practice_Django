from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.shortcuts import render_to_response
# Decorator to use built-in authentication system
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, Http404
# Used to create and manually log in a user
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate

from todo_list.models import *
from todo_list.forms import *
import json 

@login_required
def home(request):
    
    return render(request, 'todo-list/index.html', {"username":request.user})

@login_required
def add_item(request):
    errors = []
    if request.method=="POST":
        item=request.POST['item']
    if item!="":
        new_item = Item(text=item, user=request.user)
        new_item.save()
    num = Item.objects.filter(user=request.user).count();
    context = {'item':new_item, 'errors':errors, 'num':num}
    return render_to_response('todo-list/temp.html',context)

@login_required
def delete_item(request, item_id):
    errors = []
    try:
	item_to_delete = Item.objects.get(id=item_id, user=request.user)
	item_to_delete.delete()
    except ObjectDoesNotExist:
	errors.append('The item did not exist in the todo list.')
    num = Item.objects.filter(user=request.user).count();
    json_data = json.dumps({"item_id":item_id,"num":num})
    return HttpResponse(json_data, mimetype="application/json")


@login_required
def edit_item(request, item_id):
    errors = []
    #if request.method=="POST":
        #item=request.POST['item']
    item = request.POST.get('item')
    if item!="":
        try:
            item_update = Item.objects.filter(id=item_id).update(text=item)
        except ObjectDoesNotExist:
            errors.append('The item did not exist in the todo list.')
    num = Item.objects.filter(user=request.user).count();
    json_data = json.dumps({"item_id":item_id,"item":item})
    return HttpResponse(json_data, mimetype="application/json")





@login_required
def get_list(request):
    context = {'items':Item.objects.filter(user=request.user)}
    return render(request, 'todo-list/items.xml', context, content_type='application/xml');


@transaction.commit_on_success
def register(request):
    context = {}

    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = RegistrationForm()
        return render(request, 'todo-list/register.html', context)

    # Creates a bound form from the request POST parameters and makes the 
    # form available in the request context dictionary.
    form = RegistrationForm(request.POST)
    context['form'] = form

    # Validates the form.
    if not form.is_valid():
        return render(request, 'todo-list/register.html', context)

    # If we get here the form data was valid.  Register and login the user.
    new_user = User.objects.create_user(username=form.cleaned_data['username'], 
                                        password=form.cleaned_data['password1'])
    new_user.save()

    # Logs in the new user and redirects to his/her todo list
    new_user = authenticate(username=form.cleaned_data['username'], \
                            password=form.cleaned_data['password1'])
    login(request, new_user)
    return redirect('/todolist/')
    
