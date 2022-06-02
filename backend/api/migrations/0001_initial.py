# Generated by Django 4.0.4 on 2022-05-31 18:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=25)),
                ('lastName', models.CharField(max_length=25)),
                ('birthday', models.DateField()),
                ('favoriteColor', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='SavedMovie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('rating', models.PositiveSmallIntegerField()),
                ('searchType', models.CharField(choices=[('FN', 'First Name'), ('LN', 'Last Name'), ('BD', 'Birthday'), ('FC', 'Favorite Color'), ('SW', 'Search Word')], max_length=2)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.userprofile')),
            ],
        ),
    ]