import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';
import { IKeyboard } from '../keyboard/keyboard';
import { ACTIONS } from '../bot/handlers/bot.constants';

export interface IFilm {
	_id: object;
	uuid: string;
	name: string;
	type: string;
	year?: number;
	rate?: number;
	length?: string;
	country?: string;
	link?: string;
	picture?: string;
	cinemas?: Array<string>;
}

export interface ICinema {
	_id: object;
	uuid: string;
	name: string;
	url: string;
	films: Array<string>;
	location: ILocation;
}

export interface IUser {
	_id: object;
	telegramId: number;
	films: Array<string>;
}

export interface ISendOptions {
	bot: TelegramBot;
	chatId: number;
	content: string;
	keyboardName?: keyof IKeyboard;
}

export interface ISendPictureOptions extends ISendOptions {
	picture?: string;
}

export type ILocation = {
	latitude: number;
	longitude: number;
};

export interface ICinemaWithDistance extends ICinema {
	distance: number;
}

interface IQueryData {
	type: ACTIONS;
}

export interface IQueryShowFilms extends IQueryData {
	filmUuids: Array<string>;
}

export interface IQueryShowOneFilm extends IQueryData {
	filmUuid: string;
	isFav: boolean;
}

export interface IQueryShowCinemas extends IQueryData {
	cinemaUuids: Array<string>;
}

export interface IQueryLocateCinema extends IQueryData {
	lat: number;
	lon: number;
}

export type IQueryHandler = (bot: TelegramBot, chatId: number, query: CallbackQuery) => void;
