import serial
import time

# 設定序列埠與波特率 (根據你的設備調整)
ser = serial.Serial('COM15', 9600)  # Windows用 COM埠，Linux/Mac 用 '/dev/ttyUSB0'

time.sleep(2)  # 等待設備穩定

# 傳送一個字元 'A'
ser.write(b'0\n'.encode())  # 注意：b代表 bytes

print("已傳送字元 '0'")

ser.close()  # 關閉序列埠
