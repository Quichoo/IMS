# Generated by Django 5.0.1 on 2024-03-26 03:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ims', '0013_alter_item_cafe_stock_alter_item_commissary_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spoiledmaterialreport',
            name='spoil_amount',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='transacted_amount',
            field=models.FloatField(),
        ),
    ]