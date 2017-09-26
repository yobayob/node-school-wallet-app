import {IRouterContext} from 'koa-router';
import {Inject} from 'typescript-ioc';
import {CardsController} from '../controllers';
import {Route, IRoutes} from './irouter';
import {validator} from '../middlewares/validator'

export default class CardRoutes extends IRoutes {

	constructor(@Inject private cardsController: CardsController) {
		super();
	}

	protected getRoutes(): Route[] {
		return [
			Route.newRoute('/cards', 'get', validator, (ctx: IRouterContext) => this.cardsController.getAllCards(ctx)),
		];
	}
}
