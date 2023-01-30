# Telegram bot - Видео Каталог

Сделан по видеоинструкции [Создание Telegram бота на Node.js на канале Geek Code](https://www.youtube.com/playlist?list=PLhgRAQ8BwWFaxlkNNtO0NDPmaVO9txRg8), но с использованием typescript

Автор: [Владлен Минин](https://www.youtube.com/@VladilenMinin)

## Инструкция

- выполнить `npm install` в папке проекта
- зарегистрировать телеграм бот используя [BotFather](https://t.me/BotFather) в телеграме
- зарегистрировать базу данных [MongoDB](https://www.mongodb.com/). 
- Токены бота и базы поместить в файл `.env`. Пример файла в `.env-example`
- запустить бота командой `npm run dev`

### Добавление данных в базу
- раскомментировать строки 20-22 в файле `index.ts`.

```
	// for adding mock-data to DB
        // .then(() => {
        // 	insertDataToDB();
        // })
```
а также строку импорта на 7 строке
```
// import { insertDataToDB } from './database/insertDataToDB';
```
- перезапустить бота - данные запишутся в базу данных. Если нет, то проверьте строку подключения, возможно не был указан пароль... например
- **закоментировать или удалить указанные строки**, что бы не добавлять информацию в базу при каждом запуске. 

## Стек
- typescript
- mongoose
- node-telegram-bot-api
- prettier
