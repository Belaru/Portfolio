import click
from flask import g, current_app
from AddressApp.db import Database
import os

def get_db():
    if 'db' not in g:
        g.db=Database()
    return g.db
def close_db(val):
    db=g.pop('db',None)
    if db is not None:
        db.close()
def init_db():
    db=get_db()
    db.run_file(os.path.join(current_app.root_path,"schema.sql"))
@click.command('init-db')
def init_db_command():
    click.echo("DB initialized")
    init_db()
    
    