# Generated by Django 3.0.3 on 2022-06-02 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_auto_20220602_0310'),
    ]

    operations = [
        migrations.AddField(
            model_name='favoritemovie',
            name='movie_db_id',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
