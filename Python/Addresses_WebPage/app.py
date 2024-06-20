from flask import Flask, request, flash, render_template, abort, url_for, escape
from adress import Address, AddressForm
import secrets
app = Flask(__name__)
app.secret_key=secrets.token_urlsafe(32)
addresses=[Address("Sushies","Catherine", "Westmount", "Quebec" ),
         Address("Tacos","Claude","Laval","Quebec")]

@app.route('/')
def homepage():
    title="Home Page"
    return render_template('index.html', title=title)
@app.route('/addressbook/<name>')
def get_address(name):
    name = escape(name)
    form = AddressForm()
    for address in addresses:
        if name==None:
            exit
        if address.name==name:
            return render_template('specific_address.html', title=address.name, address=str(address))
    flash("No such address")
    return render_template('addresses.html', title="addresses",form=form,addresses=addresses)

@app.route('/addressbook/')
def list_addresses():
    form = AddressForm()
    return render_template('addresses.html', title="addresses",form=form,addresses=addresses)
@app.route('/addressbook/', methods=['GET','POST'])
def post_address():
    form = AddressForm()
    print(form.errors)
    if request.method == 'POST':
        if form.validate_on_submit():
            name=form.name.data
            street=form.street.data
            city=form.city.data
            province=form.province.data
            address = Address(name, street,city,province)
            if(no_duplicate(address)):
                addresses.append(address)
            else:
                flash('Address is already in list')
        else:
            flash('Invalid input')
    elif request.method == 'GET':
        name==request.form['name']
        return render_template(url_for('get_address'),name=name)
    return render_template('addresses.html', title="addresses",form=form,addresses=addresses)
def no_duplicate(input):
    for address in addresses:
        if(address.check_match(input)):
            return False
    return True
@app.errorhandler(404)
def page_not_found(error):
    return render_template('custom404.html'),404