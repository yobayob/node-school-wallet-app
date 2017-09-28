import {Inject, Singleton} from 'typescript-ioc';
import {ICard} from '../models/card.model'
import {checkLuhn} from '../../common/utils';
import {Card as CardModel} from '../models/card.model'


@Singleton
class CardService {

	constructor(@Inject private card: CardModel) {
	}

	async all() {
		return new Promise((resolve, reject) => {
		})
	}

	async get() {
		return new Promise((resolve, reject) => {
		})
	}

	async create(o: ICard) {
		return new Promise((resolve, reject) => {
		})
	}

	async remove(id: number) {
		return new Promise((resolve, reject) => {
		})
	}
}
