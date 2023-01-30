import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';
import { ACTIONS, queryHandlersMap } from './bot.constants';

export async function queries(bot: TelegramBot, chatId: number | undefined, query: CallbackQuery) {
	if (!query.data || !chatId) {
		return;
	}
	let type: ACTIONS;

	try {
		type = JSON.parse(query.data).type;
	} catch (err) {
		throw new Error(`Data is not an object. 
		${err}`);
	}

	const queryHandler = queryHandlersMap[type];

	if (!queryHandler) {
		return;
	}

	queryHandler(bot, chatId, query);
}
