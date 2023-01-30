import { CallbackQuery, Message, SendMessageOptions, SendPhotoOptions } from 'node-telegram-bot-api';
import { ISendOptions } from '../types';
import { IKeyboard, KEYBOARDS } from '../keyboard/keyboard';

export function logStart(): void {
	console.log('Bot has been started ...');
}

export function getChatId(msg: Message): number {
	return msg.chat.id;
}

export function getUserIdFromMessage(msg: Message): number {
	if (msg?.from) {
		return msg.from.id;
	} else {
		throw new Error('Id user is not found');
	}
}

export function getUserIdFromQuery(query: CallbackQuery): number {
	if (query?.from) {
		return query.from.id;
	} else {
		throw new Error('Id user is not found');
	}
}

export async function sendHTML(options: ISendOptions): Promise<void> {
	const { bot, chatId, content, keyboardName } = options;

	const option: SendMessageOptions = {
		parse_mode: 'HTML',
	};

	addKeyboard(option, keyboardName);

	await bot.sendMessage(chatId, content, option);
}

function addKeyboard(option: SendPhotoOptions | SendMessageOptions, keyboardName?: keyof IKeyboard): void {
	if (keyboardName) {
		option.reply_markup = {
			keyboard: KEYBOARDS[keyboardName],
			resize_keyboard: true,
		};
	}
}
