import csv


def openCSV(file):
    with open(file, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in reader:
            print(row)


def writeCSV(file, values):
    with open(file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['uotdoop_temp, indoor_temp, delta'])
        writer.writerow(['Spam', 'Lovely Spam', 'Wonderful Spam'])

openCSV("/mnt/sdcard/monitoring_db/outdoor")