'''
Anastasia Bondarenko
2135698
09/23
Purpose of the file: 
This program generates a socket connection for the client to the running server
The server program should be ran in the background

Example from https://www.digitalocean.com/community/tutorials/python-socket-programming-server-client 
'''
import socket
from authentication import SignIn

class Client:

    # Initializes a client connection to the port with the server
    def __init__(self, host = socket.gethostname(), port = 15789):
        self.host = host
        self.port = port
        self.client_socket = socket.socket()  # instantiate
        self.client_socket.connect((self.host, self.port))  # connect to the server
        print('Connected to host '+str(self.host)+' in port: '+str(self.port)+'\n')

    # Creates interaction between client and server
    # Prompts user to send authentication credentials to the server 
    def client_program(self):
        server_msg = self.client_socket.recv(1024).decode("utf-8")
        print(server_msg) #asks user a username
        user_input = input()
        while user_input is None:
            print("Username is required")
            user_input = input()
        self.client_socket.send(user_input.encode("utf-8"))
        server_msg = self.client_socket.recv(1024).decode("utf-8")
        print(server_msg) #asks user a password
        user_input = input()
        while user_input is None:
            print("Password is required")
            user_input = input()
        self.client_socket.send(user_input.encode("utf-8"))
        token = self.client_socket.recv(1024).decode("utf-8")
        print("Your token: ", str(token))

        decoded = SignIn.decodeToken(token)
        user_name = decoded["sub"]
        print("Welcome ", user_name)
        
        print("Share your first message!")
        user_input = input(" -> ")  # take input
        message = f"{str(token)}:{user_name}=> {user_input}"
        self.client_socket.send(message.encode("utf-8"))

        while message.lower().strip() != 'quit':
            self.client_socket.send(message.encode("utf-8"))  # send message
            data = self.client_socket.recv(1024).decode("utf-8")  # receive response
            print(data)  # show in terminal
            print("Write")
            user_input = input(" -> ")  # again take input
            message = f"{token}:{user_name}=> {user_input}"

        self.client_socket.close()  # close the connection

# Runs program to connect client with the server
if __name__ == '__main__':
    client = Client()
    client.client_program()
