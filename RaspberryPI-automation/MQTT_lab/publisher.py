import datetime
import json
import paho.mqtt.client as mqtt 
import time

broker_hostname = "localhost"
port = 1883 

def on_connect(client, userdata, flags, return_code):
    print("CONNACK received with code %s." % return_code)
    if return_code == 0:
        print("connected")
    else:
        print("could not connect, return code:", return_code)

client = mqtt.Client(client_id="Client1", userdata=None)
client.on_connect = on_connect

# change with your user and password auth
client.username_pw_set(username="ana", password="bona")


client.connect(broker_hostname, port, 60)
client.loop_start()

topic = "Sensor"
msg_count = 0

try:
    motionDetected = True
    while True:
        time.sleep(5)
        if(motionDetected):
            motionDetected = False
            current_time = f"{datetime.date.today()}-{datetime.datetime.now().strftime('%H-%M-%S')}"
            message = {"motion_door": True, "timestamp": current_time, "picture": "url_new_picture"}
            info = json.dumps(message) 
            print("Motion detected")
            client.publish(topic=topic, payload=info)
        else:
            motionDetected = True
        
finally:
    client.loop_stop()