import serial
from flask import Flask
import ghhops_server as hs


# register hops app as middleware
app = Flask(__name__)
hops = hs.Hops(app)
ser = serial.Serial('COM3', 9600)
ser.close()

@hops.component(
    "/dream",
    name="dream",
    description="d r e a m",
    inputs=[
        #hs.HopsNumber("p", "coordinates", "3d coordinates of latent space", access=hs.HopsParamAccess.LIST),
    ],
    outputs=[
        hs.HopsNumber("meshes", "m", "mahhhhh", access=hs.HopsParamAccess.LIST)
    ]
)

def dream():
    ser.open()
    num = ser.readline()
    ser.close()
    num = int(num.decode("utf-8")[:len(num)-1])
    print(num)
    return num


if __name__ == "__main__":
    app.run(debug=True)
    