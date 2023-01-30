import { ICinema } from '../types';

export function formatCinemaInfo(cinema: ICinema): string {
	return `Кинотеатр: ${cinema.name}`;
}
