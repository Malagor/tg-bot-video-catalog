import { BUTTONS as kb } from './keyboard-buttons';
import { KeyboardButton } from 'node-telegram-bot-api';

export type IKeyboard = {
	[scene: string]: KeyboardButton[][];
};

export const KEYBOARDS: IKeyboard = {
	home: [[{ text: kb.home.films }, { text: kb.home.cinemas }], [{ text: kb.home.favourite }]],
	films: [[{ text: kb.films.random }], [{ text: kb.films.action }, { text: kb.films.comedy }], [{ text: kb.back }]],
	cinemas: [[{ text: kb.location, request_location: true }], [{ text: kb.back }]],
};
