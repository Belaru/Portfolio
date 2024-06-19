#blueprints

from flask import( Blueprint, render_template, request,
                  flash, escape, redirect, url_for)
from AddressApp.address import Address,AddressForm
from AddressApp.dbmanager import get_db

bp=Blueprint('address',__name__,url_prefix='/addressbook/')

@bp.route("/", methods=['GET','POST'])
def address_list():
    db=get_db()
    addresses=db.get_addresses()
    form = AddressForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            name=form.name.data
            street=form.street.data
            city=form.city.data
            province=form.province.data
            address = Address(name, street,city,province)
            if(no_duplicate(address,addresses)):
                addresses.append(address)
                db.add_address(address)
            else:
                flash('Place is already in list')
        else:
            flash('Invalid input')
    return render_template('addresses.html', title="Addresses",form=form,addresses=addresses)
def no_duplicate(input,addresses):
    for address in addresses:
        if(address.__eq__(input)):
            return False
    return True 
@bp.route("/<name>")
def get_address(name):
    name = escape(name)
    db=get_db()
    address=db.get_address(name)
    if address is None:
        flash("No such address")
        return redirect(url_for('address.address_list'))
    else:
        return render_template('specific_address.html', title=address.name, address=str(address))