from .models import *
from django_filters import rest_framework as filters

#could not get filtering to work but I added a foreign key to the favorite movies model to facilitate filtering by related user id
class FavoriteMoviesFilter(filters.FilterSet):
    class Meta:
        model: FavoriteMovie
        fields = ['user_id']