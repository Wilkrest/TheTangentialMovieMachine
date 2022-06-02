from django.urls import path
from api import views

#I was not able to successfully implement filtering, sorting, and paging but those would be necessary when retrieving data
#I am not providing a path to retrieve User objects without UserProfiles as they are tied together
#If it was necessary I could create two separate endpoints for either User or UserProfile
#For example when interacting with a single record
#users/<int:pk>/userprofile would provide just the UserProfiles while
#user/<int:pk>/ would just provide the User record
urlpatterns = [
    #user paths 
    #These paths provide a combination of a User record and a UserProfile record
    #The structure of their returned data is tailored to the client app as the app uses data from the both the User and UserProfile records
    path('users/', views.user_profile_all),
    path('users/<int:pk>/',views.user_profile_single),
    
    #movie paths
    #These paths return the full FavoriteMovie records as they are already fit to be used by the client app
    path('favoritemovies/', views.favorite_movie_all),
    path('favoritemovies/<int:pk>/', views.favorite_movie_single),
    
    #login path
    #I used this endpoint as nothing is being created in the db on user login so I felt a path such as api/session/ POST would not be accurate
    #However, with good RESTful API design it's better to avoid using verbs in endpoints so I'm not sure on the best way to set the endpoint up 
    path('login/', views.login_user)
]
