
'''
Anastasia Bondarenko
2135698
09/23
Purpose of the file: 
This program runs a server in a socket accepts multiple clients
and interacts with the clients to authenticate them 
'''
import datetime
import socket
from threading import Thread

from authentication import SignIn


class Server:

    # Initializes a server running in a socket with a defined port and hostname
    def __init__(self, host = socket.gethostname(), port = 15789):
        self.host = host
        self.port = port
        self.server_socket = socket.socket()
        self.server_socket.bind((self.host, self.port))  # bind host address and port together
        # configure how many client the server can listen simultaneously
        self.server_socket.listen(2)

    # Sends data to client to request authentication credentials
    # Sends token to client when it receives data from client
    def clientAuthentication(client, address, port):
        client.send(f"I am the server accepting connections on port {port}...".encode())
        print("Connection from: " + str(address))
        data = "Enter your username"
        client.send(data.encode("utf-8"))
        userName = client.recv(1024).decode("utf-8")
        data = "Enter your password"
        client.send(data.encode("utf-8"))
        password = client.recv(1024).decode("utf-8")
        token = SignIn.authenticate(userName, password)
        client.send(token)

    # Asks client to login again 3 times before valid input when their session expires
    ## NOT USED
    def reauthentication(data):
        decoded = SignIn.decodeToken(data)
        if(datetime.datetime.utcnow().timestamp() > decoded["exp"]):
            print("Your session has expired, please enter your password to extend connection")
            password = input()
            for i in range(3):
                if(password == decoded["pwd"]):
                    print("Logged successfully!")
                    return SignIn.authenticate(decoded["sub"],decoded["pwd"])
                else:
                    print("Wrong typed password; type again")

    # Accepts client connection to the server
    def run(self):
        while(True):
            client, address = self.server_socket.accept()
            print("Connection from: " + str(address))
            thread = Thread(target=self.userLogin, args=[client])
            thread.start()

    # Asks user authentication information to send them a token
    def userLogin(self, client):
        data = "Enter your username"
        client.send(data.encode("utf-8"))
        userName = client.recv(1024).decode("utf-8")
        data = "Enter your password"
        client.send(data.encode("utf-8"))
        password = client.recv(1024).decode("utf-8")
        token = SignIn.authenticate(userName, password)
        client.send(token)


# Runs the server in a socket
if __name__ == '__main__':
    server = Server()
    server.run()

    #https://stackoverflow.com/questions/10810249/python-socket-multiple-clients
    #https://realpython.com/python-sockets/
    #https://github.com/MattCrook/python_sockets_multi_threading
    #https://www.dunebook.com/creating-a-python-socket-server-with-multiple-clients/

    # https://www.youtube.com/watch?v=1_DmPRyvJUQ

