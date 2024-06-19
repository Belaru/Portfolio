from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class Address:
    def __init__(self,name,street,city,province): 
        if not isinstance(name,str):
            raise Exception("Firstname should be a string")
        if not isinstance(street,str):
            raise Exception("street should be a string")
        if not isinstance(city,str):
            raise Exception("city should be a string")
        if not isinstance(province,str):
            raise Exception("province should be a string")
        self.name=name
        self.street=street
        self.city=city
        self.province=province
    def __str__(self):
        return f'Name:{self.name}:  street:{self.street},  city:{self.city},  province:{self.province}'
    def __eq__(self, obj):
        if not isinstance(obj,Address):
            raise Exception("Not an address object")
        bool=True
        if(self.name!=obj.name):
            bool=False
        return bool
    
class AddressForm(FlaskForm):
    name = StringField('name',
    validators=[DataRequired()])
    street = StringField('street',
    validators=[DataRequired()])
    city = StringField('city',
    validators=[DataRequired()])
    province = StringField('province',
    validators=[DataRequired()])