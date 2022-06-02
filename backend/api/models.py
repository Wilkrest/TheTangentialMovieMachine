from django.db import models
from django.contrib.auth.models import User

#The purpose of this model to display a one to one relation between entities
#UserProfiles stores additional information for Users created using django's user authentication system
#The user property is used to maintain a one to one relation with the User model, making it such that each UserProfile record must have a User record
#Ultimately the user property should not be nullable to ensure every UserProfile record has a corresponding User record
#Additionally I set the on_delete to cascade as a UserProfile record should not exist without a User record
#For the sake of the client app every field on this model should not be nullable to ensure the components work, but I made it so to speed development
#Properties should not be nullable if necessary for an app's business logic
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', null=True) #connect user profile to user model
    birthday = models.DateField(null=True)
    favorite_color = models.CharField(max_length=25, null=True)
    birth_city = models.CharField(max_length=50, null=True)

    def __str__(self):
        return str(self.user)

#The purpose of this model is to display a one to many relation between entities
#A User can have multiple FavoriteMovies associated with their account (User/UserProfile)
#The many to one relation is facilitated through the user_id property
class FavoriteMovie(models.Model):
    name = models.CharField(max_length=50)
    release_date = models.DateField(null=True)
    description = models.TextField(null=True)
    rating = models.PositiveSmallIntegerField(null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_db_id = models.IntegerField()

    def __str__(self):
        return self.name 
