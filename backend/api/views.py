#django imports
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout

#rest framework imports
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

#app imports
from api.models import *
from api.serializers import *
from api.filters import *

#If the view is returning data then it will be formatted in JSON, this will make the data more usable on the client app
#The views need to ensure the requesting user is authenticated before processing the request, they do not in this example

#csrf_exempt is used to allow testing with postman
@csrf_exempt
@api_view(['GET', 'POST'])
#DRFW fix, needed because the views were created as function views rather than class views
#used to avoid using viewsets as that would hide a lot of the intricacies of a rest api 
@permission_classes((permissions.AllowAny,))
#The users/ endpoint points to this view which handles the request based on the given HTTP method, consistent with RESTful api design
def user_profile_all(request): 
    if request.method == 'GET':
        users = User.objects.all()
        serializers = UserSerializer(users, many=True)
        return JsonResponse(serializers.data, safe=False)
    
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)

        #here the serializer type checks the given form data and saves if valid else returns http 400
        if serializer.is_valid():
            serializer.save()   
            return JsonResponse(serializer.data, status=201)
        #need to return more accurate status codes, if username already exists (409) etc...
        else:
            return HttpResponse(status=400)
        
    else:
        return HttpResponse(status = 405)


@csrf_exempt
def user_profile_single (request, pk):
    #check if record exists, return 404 if not
    try:
        userProfile = User.objects.get(id=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    #depending on the HTTP request method create, read, update, or delete the record  
    if request.method == 'GET':
        serializer = UserSerializer(userProfile)
        return JsonResponse(serializer.data)

    elif request.method == 'PATCH':
        data = JSONParser().parse(request)
        serializer = UserSerializer(userProfile, data=data)

        #validate the client data
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        userProfile.delete()
        return HttpResponse(status=204)

    #if not supported method return 405
    else:
        return HttpResponse(status=405)

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def favorite_movie_all(request):
    if request.method == 'GET':
        favoriteMovies = FavoriteMovie.objects.all()
        serializers = FavoriteMovieSerializer(favoriteMovies, many=True)
        return JsonResponse(serializers.data, safe=False)

    elif request.method == 'POST':
        serializer = FavoriteMovieSerializer(data=request.data)

        #here the serializer type checks the given form data and saves if valid else returns http 400
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)

        return HttpResponse(status=400)

    else:
        return HttpResponse(status = 405)

@csrf_exempt
def favorite_movie_single (request, pk):
    #check if record exists, return 404 if not
    try:
        favoriteMovie = FavoriteMovie.objects.get(id=pk)
    except FavoriteMovie.DoesNotExist:
        return HttpResponse(status=404)

    #depending on the HTTP request method create, read, update, or delete the record  
    if request.method == 'GET':
        serializer = FavoriteMovieSerializer(favoriteMovie)
        return JsonResponse(serializer.data)

    elif request.method == 'PATCH':
        data = JSONParser().parse(request)
        serializer = FavoriteMovieSerializer(favoriteMovie, data=data)

        #validate the client data
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        FavoriteMovie.delete()
        return HttpResponse(status=204)

    #if not supported method return 405
    else:
        return HttpResponse(status=405)

@csrf_exempt
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login_user(request):
    #this data needs to be sanitized before using if django does not already sanitize them
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)

    if user is not None:
        #log user in to get user ID from the request
        login(request, user)

        #get the user data to return to the client
        userProfile = User.objects.get(id=request.user.id)

        #not actually using sessions so log user out
        logout(request)

        serializer = UserSerializer(userProfile)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=401)



# #this will handle POST and GET requests using DRFW
#avoid using these to show understanding of building REST api
# class UserProfileViewSet(viewsets.ModelViewSet):
#     usersQuerySet = UserProfile.objects.values('id', 'user__first_name', 'user__last_name', 'favoriteColor', 'birthday')
#     serializer_class = UserProfileSerializer