import {Application} from '../common/application/application'
import { Inject, Singleton } from 'typescript-ioc';
import {CardsController, TransactionController} from './controllers';

@Singleton
export class Wallet extends Application{

	constructor(
		@Inject private cardsController: CardsController,
		@Inject private transactionController: TransactionController
	){
		super()
	}

	$onInit(){
		this.router.get('/cards',
			async (ctx)=> this.cardsController.getAllCards(ctx));

		this.router.post('/cards',
			async (ctx)=> this.cardsController.createCard(ctx));

		this.router.delete('/cards/:cardId',
			async (ctx)=> this.cardsController.deleteCard(ctx));

		this.router.get('/cards/:cardId/:id',
			async (ctx) => this.transactionController.getAllCardTransaction(ctx));

		this.router.post('/cards/:cardId/:id',
			async (ctx) => this.transactionController.createCardTransaction(ctx));
	}
}
