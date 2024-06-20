FROM python

RUN mkdir /service
COPY protos/ /service/protobufs/
COPY rpc_server.py /service/
COPY helloworld_pb2.py /service/
COPY helloworld_pb2_grpc.py /service/
COPY requirements.txt /service/
WORKDIR /service
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt
RUN python -m grpc_tools.protoc -I protobufs --python_out=. \
           --grpc_python_out=. protobufs/helloworld.proto

EXPOSE 50051
ENTRYPOINT [ "python", "rpc_server.py" ]