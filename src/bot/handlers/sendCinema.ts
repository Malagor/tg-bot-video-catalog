import TelegramBot, { Message } from 'node-telegram-bot-api';
import * as helper from '../../helpers/utils';
import { getOneCinemaAndSendMessage } from '../../helpers/cinema.helper';

export async function sendCinema(bot: TelegramBot, msg: Message, match: RegExpExecArray | null): Promise<void> {
	if (!match) {
		return;
	}
	const [, uuid] = match;
	const chatId = helper.getChatId(msg);

	await bot.deleteMessage(chatId, msg.message_id.toString());

	await getOneCinemaAndSendMessage(bot, chatId, { uuid });
}
