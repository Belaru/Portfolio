'''
Anastasia Bondarenko
2135698
09/23
Purpose of the file: 
This program uses JWT to generate a token 
which will be used for the client to stay connected to the server and communicate with it

Example from: https://vegibit.com/json-web-tokens-in-python/
'''

import jwt
import datetime
import time

SECRET = "my-secret"

class SignIn:

    # Returns a token with user credentials and expiration timestamp
    def authenticate(username, password):
        if username is not None and password is not None:
            expire_on = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            payload = {"sub": username, "pwd": password, "exp": expire_on.timestamp()}
            token = jwt.encode(payload, SECRET, algorithm="HS256")
            return token
        else:
            return None
    
    # Returns a decoded data of a token
    def decodeToken(data):
        decoded = jwt.decode(data, SECRET, verify=True, algorithms=["HS256"])
        return decoded
    