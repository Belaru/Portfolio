from flask import Flask, render_template
from AddressApp.home_view import bp as home_bp
from AddressApp.address_views import bp as address_bp
from AddressApp.dbmanager import init_db_command, close_db
import secrets
def create_app(test_config=None):
    app = Flask(__name__)
    
    init_app(app)
    app.config.from_mapping(
        SECRET_KEY=secrets.token_urlsafe(32),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)
        
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template('custom404.html',title="404"),404
    return app

def init_app(app):
    #for setting up the database and registering the blueprints.
    
    #click
    app.cli.add_command(init_db_command)
    
    #teardown
    app.teardown_appcontext(close_db)
    
    app.register_blueprint(home_bp)
    app.register_blueprint(address_bp)
    
    
    