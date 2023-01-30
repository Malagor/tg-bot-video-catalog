import * as helper from '../../helpers/utils';
import { sendHTML } from '../../helpers/utils';
import TelegramBot, { Message } from 'node-telegram-bot-api';

export async function start(bot: TelegramBot, msg: Message) {
	const content = `Привет, ${msg.from?.first_name}\nВыберите команду для начала работы:`;

	await sendHTML({
		bot,
		chatId: helper.getChatId(msg),
		content,
		keyboardName: 'home',
	});
}
