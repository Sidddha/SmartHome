import os
import json
from json.decoder import JSONDecodeError

token = os.environ['BOT_TOKEN']
PASSWORD = 1234
#!/usr/bin/env python
# pylint: disable=unused-argument, wrong-import-position
# This program is dedicated to the public domain under the CC0 license.

"""
First, a few callback functions are defined. Then, those functions are passed to
the Application and registered at their respective places.
Then, the bot is started and runs until we press Ctrl-C on the command line.

Usage:
Example of a bot-user conversation using ConversationHandler.
Send /start to initiate the conversation.
Press Ctrl-C on the command line or send a signal to the process to stop the
bot.
"""

import logging

from telegram import __version__ as TG_VER

try:
    from telegram import __version_info__
except ImportError:
    __version_info__ = (0, 0, 0, 0, 0)  # type: ignore[assignment]

if __version_info__ < (20, 0, 0, "alpha", 5):
    raise RuntimeError(
        f"This example is not compatible with your current PTB version {TG_VER}. To view the "
        f"{TG_VER} version of this example, "
        f"visit https://docs.python-telegram-bot.org/en/v{TG_VER}/examples.html"
    )
from telegram import (
    ReplyKeyboardMarkup, 
    ReplyKeyboardRemove, 
    Update, 
    User, 
    Chat, 
    InlineKeyboardButton, 
    InlineKeyboardMarkup
)
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
    CallbackQueryHandler
)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Conversatin states
(
    START,
    REGISTER_USER, 
    REGISTRATION_REPLY,
    GREETINGS, 
    MAIN_MENU,
    BACK
) = map(chr, range(6))

# Callback constants
(
    ENTER_PASSWORD, 
    CHECK_PASSWORD,
    SEND_REQUEST,
    SUBMIT_REQUEST,
    DECLINE_REQUEST,
    WAITING_FOR_APPROVE
) = map(chr, range(6, 12))

class UserData:

    def __init__(self, id, name, chat, access_level, request_status):
        self.id = id
        self.name = name
        self.chat = chat
        self.access = access_level
        self.request = request_status   

    def isExist(self):
        with open("./user-data.json", 'r') as infile:
            try:
                users = json.loads(infile.read())
                logger.info(f"Searching id {self.id}")
                for id in users.items():
                    logger.info(f"Check id {id[0]}")
                    if id[0] == str(self.id):
                        logger.info(f"User {self.name} exists")
                        infile.close()
                        return True
                else: 
                    logger.info(f"id {self.id} not exist")
                    return False
            except JSONDecodeError:
                logger.error("function: isExist(). JSON decode error")
                return False    

    def accessLevel(self):
        logger.info(f"User {self.name} has access level {self.access}")
        return self.access
    
    def requestStatus(self):
        return self.request
    
    def changeAccessLevel(self, level):
        logger.info(f"Users {self.name} access level changed to {self.access}")
        self.access = level

    def changeRequestStatus(self, status):
        self.request = status

    def update(self):
        with open("./user-data.json", "r") as infile:
            try:
                users = json.loads(infile.read())
                id = str(self.id)
                self.changeAccessLevel(users[id]["access"])
                self.changeRequestStatus(users[id]["request"])    
                infile.close()            
            except JSONDecodeError:
                logger.error("function: update(). JSON decode error")
                pass                

      
    def dump(self):
        with open("./user-data.json", 'r') as infile, open("./user-data.json", 'w') as writefile:
            try:
                users = json.loads(infile.read())
                if self.isExist():    
                    id = str(self.id)
                    logger.info(f"users list1: {users}")
                    users[id] = {
                        "name": self.name,
                        "chat": self.chat,
                        "access": self.access,
                        "request": self.request
                    }
                    logger.info(f"users list2: {users}")
                    writefile.write(json.dumps(users))
                    writefile.close()
            except JSONDecodeError:
                logger.exception("function: dump(). JSON decode error. Creating a new file")
                with open("./user-data.json", 'w') as writefile:
                    
                    users = {
                        str(self.id): {
                            "name": self.name,
                            "chat": self.chat,
                            "access": self.access,
                            "request": self.request                       
                        }
                    }
                    writefile.write(json.dumps(users))
                    writefile.close()
                pass

def getAdmins(self):
    with open("./user-data.json", 'r') as infile:
        try:
            users = json.loads(infile.read())
            admins = []
            for user in users.items():
                if user[1]["access"] == 2:
                    admins.append(user[1]["chat"])
            infile.close()
            return admins
        except JSONDecodeError:
            pass


async def startCommand(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    keyboard = InlineKeyboardMarkup([[InlineKeyboardButton(text="Начать", callback_data=str(START))]])
    await update.message.reply_text(text="Нажмите чтоб начать", reply_markup=keyboard)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Starts the conversation and check access."""
    user = UserData(update.callback_query.from_user.id, update.callback_query.from_user.username, update.callback_query.chat_instance, None, None)
    user.update()
    if user.isExist() and (user.accessLevel() > 0):
        keyboard = InlineKeyboardMarkup([InlineKeyboardButton(text="Начать", callback_data=str(MAIN_MENU))])
        await update.callback_query.edit_message_text("Добро пожаловать. Снова", reply_markup=keyboard)
        return MAIN_MENU
    else:    
        user.access = 0
        user.request = 0
        user.dump()
        buttons = [
            [InlineKeyboardButton(text="Ввести пароль", callback_data=str(ENTER_PASSWORD))],
            [InlineKeyboardButton(text="Отправить запрос", callback_data=str(SEND_REQUEST))]
        ]
        keyboard = InlineKeyboardMarkup(buttons)
        await update.callback_query.edit_message_text(
            "У вас нет доступа. Введите пароль или отправьте запрос администратору",
            reply_markup=keyboard
        )
        return REGISTRATION_REPLY       
      
    
    
    
    # query = update.callback_query
    # await query.answer()
    # match query.data:
    #     case str(ENTER_PASSWORD):
    #         await query.edit_callback_query_text("Введите пароль администратора")
    #         return CHECK_PASSWORD
    #     case str(REQUEST):
    #         await query.edit_callback_query_text("Запрос отправлен.")
    #         return SEND_REQUEST
    #     case str(CANCEL):
    #         await query.edit_callback_query_text("Прощайте!")
    #         return ConversationHandler.END


async def passCheck(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Check the password."""
    user = UserData(update.callback_query.from_user.id, update.callback_query.from_user.username, update.callback_query.chat_instance, None, None)

    query = update.callback_query
    await query.edit_message_text("Введите пароль администратора")
    await query.answer()
    password = query.data
    print(f"query data = {password}")
    buttons = [
        [InlineKeyboardButton(text="Попробовать снова", callback_data=str(ENTER_PASSWORD))],
        [InlineKeyboardButton(text="Отправить запрос", callback_data=str(SEND_REQUEST))],
        [InlineKeyboardButton(text="Уходим отсюда", callback_data=str(BACK))]
    ]
    keyboard1 = InlineKeyboardMarkup([[InlineKeyboardButton(text="Начать", callback_data=str(MAIN_MENU))]])   
    keyboard2 = InlineKeyboardMarkup(buttons) 

    if int(password) == PASSWORD:
        user.changeAccessLevel(2)
        user.dump()
        await query.edit_message_text(f"Пароль принят, уровень доступа {user.access}, администратор.", reply_markup=keyboard1)
        return MAIN_MENU
    else:
        await query.edit_message_text("Пароль не верный", reply_markup=keyboard2)
        return REGISTRATION_REPLY

async def sendRequest(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Stores the location and asks for some info about the user."""
    user = UserData(update.callback_query.from_user.id, update.callback_query.from_user.username, update.callback_query.chat_instance, None, None)
    admins = getAdmins()
    buttons = [
        [InlineKeyboardButton(text="Принять", callback_data=str(SUBMIT_REQUEST))],
        [InlineKeyboardButton(text="Отклонить", callback_data=str(DECLINE_REQUEST))],
    ]    
    keyboard = InlineKeyboardMarkup(buttons) 

    for admin in admins:
        Application.bot.sendMessage(text=f"Пользователь {user.name} хочет получить доступ к боту", chat_id=admin, reply_markup=keyboard)
    await update.callback_query.reply_text(
        "Запрос отправлен, ожидайте."
    )
    user.changeRequestStatus(1)
    return WAITING_FOR_APPROVE


async def requestAlreadySent(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = UserData(update.message.from_user.id, update.message.from_user.username, update.message.chat.id, None, None)
    user.update()
    if user.requestStatus() == 1:
        update.message.reply_text("Вы уже отправили запрос, имейте терпение")
    return WAITING_FOR_APPROVE


async def submitRequest(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = UserData(update.message.from_user.id, update.message.from_user.username, update.message.chat.id, None, None)
    user.changeAccessLevel(1)
    user.changeRequestStatus(0)
    update.message.reply_text("Доступ разрешен")


async def declineRequest(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = UserData(update.message.from_user.id, update.message.from_user.username, update.message.chat.id, None, None)
    user.changeAccessLevel(0)
    user.changeRequestStatus(0)
    update.message.reply_text("Доступ запрещен")


async def mainMenu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = UserData(update.message.from_user.id, update.message.from_user.username, update.message.chat.id, None, None)
    user.update()
    if user.accessLevel() == 1:
        update.message.reply_text("уровень доступа: пользователь")
    elif user.accessLevel() == 2:
        update.message.reply_text("уровень доступа: администратор")        
    
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Cancels and ends the conversation."""
    user = update.message.from_user
    logger.info("User %s canceled the conversation.", user.first_name)
    await update.message.reply_text(
        "Bye! I hope we can talk again some day.", reply_markup=ReplyKeyboardRemove()
    )

    return ConversationHandler.END


def main() -> None:
    # isFileExist("./user-data.json", "{"user":}")
    # open("./user-data.json", "w")

    """Run the bot."""
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(token).build()
    # Add conversation handler with the states GENDER, PHOTO, LOCATION and BIO
    start_handler = CommandHandler("start", startCommand)

    conv_handler = ConversationHandler(
        per_message=True,
        # allow_reentry=True,
        entry_points=[CallbackQueryHandler(start, pattern=str(START))],
        states={
            REGISTRATION_REPLY: [
                [CallbackQueryHandler(passCheck, pattern=str(ENTER_PASSWORD))],
                [CallbackQueryHandler(sendRequest, pattern=str(SEND_REQUEST))],
            ],    
            WAITING_FOR_APPROVE: [
                [CallbackQueryHandler(submitRequest, pattern=str(SUBMIT_REQUEST))],
                [CallbackQueryHandler(declineRequest, pattern=str(DECLINE_REQUEST))]
            ],
            MAIN_MENU: [CallbackQueryHandler(mainMenu, pattern=str(MAIN_MENU))]
            # LOCATION: [
            #     MessageHandler(filters.LOCATION, location),
            #     CommandHandler("skip", skip_location),
            # ],
            # BIO: [MessageHandler(filters.TEXT & ~filters.COMMAND, bio)],
        },
        fallbacks=[
            [CallbackQueryHandler(cancel, pattern=None)],
            # [MessageHandler(filters.TEXT, requestAlreadySent)]
        ]
    )

    application.add_handler(conv_handler)
    application.add_handler(start_handler)
    # Run the bot until the user presses Ctrl-C
    application.run_polling()


if __name__ == "__main__":
    main()