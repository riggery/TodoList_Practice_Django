from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'TodoList.views.home', name='home'),
    # url(r'^TodoList/', include('TodoList.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    #url(r'^$', 'TodoList.views.home', name='home'),
    url(r'^$', 'todo_list.views.home', name='home'),
    url(r'^add-item', 'todo_list.views.add_item'),
    url(r'^delete-item/(?P<item_id>\d+)$', 'todo_list.views.delete_item'),
    url(r'^edit-item/(?P<item_id>\d+)$', 'todo_list.views.edit_item'),
    url(r'^get-list$', 'todo_list.views.get_list'),
    url(r'^login$', 'django.contrib.auth.views.login', {'template_name':'todo-list/login.html'}, name='login'),
    # Route to logout a user and send them back to the login page
    url(r'^logout$', 'django.contrib.auth.views.logout_then_login', name='logout'),
    url(r'^register$', 'todo_list.views.register', name='register'),
)
