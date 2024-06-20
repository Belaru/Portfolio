'''
Example from https://github.com/grpc/grpc/tree/master/examples/python
'''

from __future__ import print_function

import logging

import grpc
import helloworld_pb2
import helloworld_pb2_grpc


def run():
    # NOTE(gRPC Python Team): .close() is possible on a channel and should be
    # used in circumstances in which the with statement does not fit the needs
    # of the code.
    print("Will try to greet world ...")
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = helloworld_pb2_grpc.GreeterStub(channel)
        response = stub.SayHello(helloworld_pb2.HelloRequest(name="Anastasiaaaa",week=7,day="Tuesday"))
    print("Greeter client received: " + response.message)
    print(f"\n\n Now its time to leave ...")
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = helloworld_pb2_grpc.FarewellerStub(channel)
        response = stub.SayBye(helloworld_pb2.SayGoodBye(first_name="Anastasia",last_name="Bondarenko"))
    print("Greeter client received: " + response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()