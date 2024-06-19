import paho.mqtt.client as mqtt
import time
import json

def on_connect(client, userdata, flags, return_code):
    if return_code == 0:
        print("connected")
        client.subscribe("Sensor")
    else:
        print("could not connect, return code:", return_code)


def on_message(client, userdata, message):
    received = message.payload.decode('utf-8')
    received = json.loads(received)
    print(f"Received message: Motion detected received['timestamp']", 
        "image =>", str(received["picture"]))
    with open("./report.txt","a") as clientFile:
        clientFile.write(f"{received['timestamp']} new event detected in ___topic___ : movement in room : {received['picture']}\n")
        

broker_hostname ="localhost"
port = 1883 

client = mqtt.Client("Client2")
# change with your user and password auth
client.username_pw_set(username="ana", password="bona")
client.on_connect=on_connect
client.on_message=on_message

client.connect(broker_hostname, port) 
client.loop_start()

try:
    time.sleep(100)
finally:
    client.loop_stop()