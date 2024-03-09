import serial

ser = serial.Serial('/dev/ttyUSB0', 9600)  

try:
    while True:
        data = ser.readline().decode().strip()
        if data:
            print("Received:", data)
finally:
    ser.close()