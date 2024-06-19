'''
Example from https://github.com/grpc/grpc/tree/master/examples/python
'''

from concurrent import futures
import logging
import time

import grpc
import helloworld_pb2
import helloworld_pb2_grpc


class Greeter(helloworld_pb2_grpc.GreeterServicer):
    def SayHello(self, request, context):
        print(f'Received from client: {request.name} and {request.week}. Now... Processing your message...')
        time.sleep(5)
        print('Processing finished, now will return to client')
        return helloworld_pb2.HelloReply(message=f"Hello, {request.name}! RPC example - week {request.week}.")

class Fareweller(helloworld_pb2_grpc.FarewellerServicer):
    def SayBye(self, request, context):
        print(f'Received from client: {request.first_name} and {request.last_name}.')
        time.sleep(5)
        print('Processing finished SayBye, now will return to client')
        return helloworld_pb2.GoodByeReply(message=f"Bye {request.first_name} {request.last_name}! I'll miss i </3.")


def serve():
    port = "50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    helloworld_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    helloworld_pb2_grpc.add_FarewellerServicer_to_server(Fareweller(), server)
    server.add_insecure_port("[::]:" + port)
    server.start()
    print("Server started, listening on " + port)
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()