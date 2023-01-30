import * as helper from '../helpers/utils';
import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import { sendFilm } from './handlers/sendFilm';
import { start } from './handlers/start';
import { onMessage } from './handlers/onMessage';
import { sendCinema } from './handlers/sendCinema';
import { queries } from './handlers/queries';
import { inlineQuery } from './handlers/inlineQuery';

export function runBot(token: string) {
	helper.logStart();

	const bot = new TelegramBot(token, {
		polling: true,
	});

	bot.on('message', async (msg: Message) => {
		await onMessage(bot, msg);
	});

	bot.onText(/\/start/, async (msg: Message) => {
		await start(bot, msg);
	});

	bot.onText(/\/f(.+)/, async (msg, match) => {
		await sendFilm(bot, msg, match);
	});

	bot.onText(/\/c(.+)/, async (msg, match) => {
		await sendCinema(bot, msg, match);
	});

	bot.on('callback_query', async (query: CallbackQuery) => {
		await queries(bot, query.message?.chat.id, query);
	});

	bot.on('inline_query', async query => {
		await inlineQuery(bot, query);
	});
}
