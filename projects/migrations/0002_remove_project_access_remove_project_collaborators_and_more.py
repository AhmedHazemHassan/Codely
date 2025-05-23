# Generated by Django 5.1.4 on 2024-12-21 18:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='access',
        ),
        migrations.RemoveField(
            model_name='project',
            name='collaborators',
        ),
        migrations.RemoveField(
            model_name='project',
            name='created_at',
        ),
        migrations.AddField(
            model_name='project',
            name='visible_to',
            field=models.CharField(choices=[('Everyone', 'Everyone'), ('Team', 'Team'), ('Private', 'Private')], default='Everyone', max_length=50),
        ),
        migrations.AlterField(
            model_name='project',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
    ]
