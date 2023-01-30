import * as helper from '../../helpers/utils';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { getOneFilmAndSendMessage } from '../../helpers/film.helper';
import { getUserIdFromMessage } from '../../helpers/utils';

export async function sendFilm(bot: TelegramBot, msg: Message, match: RegExpExecArray | null): Promise<void> {
	if (!match) {
		return;
	}

	const [, uuid] = match;
	const chatId = helper.getChatId(msg);

	let userId: number;

	try {
		userId = getUserIdFromMessage(msg);
		await bot.deleteMessage(chatId, msg.message_id.toString());

		await getOneFilmAndSendMessage(bot, chatId, userId, { uuid });
	} catch (e) {
		console.log(e);
	}
}
