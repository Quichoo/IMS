# Generated by Django 5.0.1 on 2024-03-10 16:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ims', '0011_item_category_item_um_item_um_amount_notification'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='um_amount',
        ),
    ]
