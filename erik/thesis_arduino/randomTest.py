import serial
import time


ser = serial.Serial('COM3', 9600)

while True:
    print(ser.readline().decode("utf-8"))
