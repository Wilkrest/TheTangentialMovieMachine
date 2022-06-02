from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

#Serializers serve to as a medium to handle data transferring from the client to the db and vice-verse
#The serializer also formats the data into json that can be returned through a view
class UserProfileSerializer (serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('birthday', 'favorite_color', 'birth_city')

#Data transformation is done by the serializer as it only grabs the listed fields, ensuring passwords (which are hashed by django) don't get returned when called for
#The serializer validates by checking the properties from the model and the validation can then be used to ensure only valid data enters the db
#The password field is listed by the serializer but it is marked as write only so that the password hash is not returned by the api
#Input sanitization is handled by Django's ORM as in sanitizes data before executing db actions
class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'profile')
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }   
        
    profile = UserProfileSerializer(many=False)

    #this is an overwrite of the User's create function, it is necessary as a UserProfile needs to be created when a new User is added
    def create(self, validated_data):
        #grab the data for the UserProfile from the request data
        profile_data = self.data['profile']

        #Create the user object
        #Need to validate newly created user and user profile objects before saving
        #Additional validation is necessary here to ensure the username is unique
        #or to check if password meets certain criteria
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        newProfile = UserProfile.objects.create(
            birthday=profile_data["birthday"],
            favorite_color=profile_data["favorite_color"],
            birth_city=profile_data["birth_city"],
            user=user
        )

        return user

class FavoriteMovieSerializer (serializers.ModelSerializer):
    class Meta:
        model = FavoriteMovie
        fields = ('id', 'name', 'description', 'release_date', 'user_id', 'movie_db_id')
        read_only_fields = ['id']