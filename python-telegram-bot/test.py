import json
from json.decoder import JSONDecodeError

dict = {

        "504168024": 
        {
            "name": "Sidddha", 
            "chat": 504168024, 
            "access": 0, 
            "request": 0
        },
        "222222":
        {
            "name": "Sa", 
            "chat": 33333, 
            "access": 0, 
            "request": 0
        }
    }





for item in dict.items():
    print(item)
    print(item[1]["chat"])
    # for item in item[1].items():
    #     print(item[1])
    # print(i[index])
    # print(i[index][index+1])    
    # list(i[index].items())
    # index += 1    
# Printing list
# print(listt)
# # Printing list of tuple
# print(listt[0])
# print(listt[0][1])

# def dict_to_list(d):
#     l = []
#     for i in d.items():
#         # print(i)
#         if isinstance(i[1], dict):
#             l.append(dict_to_list(i[1]))
#         else:
#             l.append(i[1])
#     return l
# print(dict_to_list(dict))