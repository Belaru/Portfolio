from flask import Flask, request, flash, render_template, abort, url_for, escape, redirect
from address import Address, AddressForm
from db import Database
import secrets
app = Flask(__name__)
app.secret_key=secrets.token_urlsafe(32)
database= Database()
database.run_file()
addresses=database.get_addresses()

@app.route('/')
def homepage():
    title="Home Page"
    return render_template('index.html', title=title)
@app.route('/addressbook/<name>')
def get_address(name):
    name = escape(name)
    address=database.get_address(name)
    if address is None:
        flash("No such address")
        return redirect(url_for("post_address"))
    else:
        return render_template('specific_address.html', title=address.name, address=str(address))

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
                database.add_address(address)
            else:
                flash('Place is already in list')#works?
        else:
            flash('Invalid input') #what does it do?
    return render_template('addresses.html', title="addresses",form=form,addresses=addresses)
def no_duplicate(input):
    for address in addresses:
        if(address.check_match(input)):
            return False
    return True
@app.errorhandler(404)
def page_not_found(error):
    return render_template('custom404.html'),404