import { BUTTONS as kb } from '../../keyboard/keyboard-buttons';
import { showFilms } from './showFilms';
import { IQueryHandler } from '../../types';
import { toggleFavorite } from './toggle-favorite';
import { showCinemas } from './showCinemas';
import { showCinemasMap } from './showCinemasMap';

export const messageMap = {
	[kb.home.films]: {
		content: 'Выберите жанр:',
		keyboardName: 'films',
	},
	[kb.home.cinemas]: {
		content: 'Отправить местоположение',
		keyboardName: 'cinemas',
	},
	[kb.back]: {
		content: 'Выберите команду для начала работы:',
		keyboardName: 'home',
	},
};

export const messageWithQuery = {
	[kb.films.comedy]: { type: 'comedy' },
	[kb.films.action]: { type: 'action' },
	[kb.films.random]: {},
};

export enum ACTIONS {
	ToggleFavorite = 'tff',
	ShowCinemas = 'sc',
	ShowCinemasMap = 'scm',
	ShowFilms = 'sf',
}

export const queryHandlersMap: { [key in ACTIONS]?: IQueryHandler } = {
	[ACTIONS.ShowFilms]: showFilms,
	[ACTIONS.ToggleFavorite]: toggleFavorite,
	[ACTIONS.ShowCinemas]: showCinemas,
	[ACTIONS.ShowCinemasMap]: showCinemasMap,
};
