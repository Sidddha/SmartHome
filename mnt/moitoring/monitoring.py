import csv
from datetime import datetime

path_to_db = "/mnt/sdcard/monitoring_db/"


def formatTime(date):
    time = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    return time


def composeCSV(input_file, output_file):
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['time, average'])
        with open(input_file, newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter='\t')
            next(reader)
            for row in reader:
                time = formatTime(row[1])
                time = time.strftime("%H:%M")
                writer.writerow([time, row[2]])


def csvToList(input_file):
    
    with open(input_file, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dict = {}
        next(reader)
        for row in reader:
            dict.pop(row[0], row[1])
        return dict


composeCSV(path_to_db + "outdoorTemp", path_to_db + "outdoor_strp")
composeCSV(path_to_db + "MainRoomTemp", path_to_db + "main_room_strp")
composeCSV(path_to_db + "BaniaTemp", path_to_db + "banya_strp")
composeCSV(path_to_db + "gmHousTemp", path_to_db + "gm_hous_strp")

csv