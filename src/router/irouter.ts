import * as Router from 'koa-router';

export class Route {

	private path: string;
	private method: string;
	private action: Array<Router.IMiddleware>;

	public static newRoute(path: string, method: string, ... action: Array<Router.IMiddleware>) {
		const route = new Route();
		route.path = path;
		route.method = method;
		route.action = action;
		return route;
	}

	public get $path(): string {
		return this.path;
	}

	public get $method(): string {
		return this.method;
	}

	public get $action(): Array<Router.IMiddleware> {
		return this.action;
	}
}


export abstract class IRoutes {

	protected abstract getRoutes(): Route[];

	public register(router: Router) {
		this.getRoutes().forEach((route) => {
			this.registerRoute(route, router);
		});
	}

	private registerRoute = (route: Route, router: Router) => {
		switch (route.$method) {
			case ('get'):
				router.get(route.$path,  ... route.$action);
				break;
			case ('post'):
				router.post(route.$path, ... route.$action);
				break;
			case ('put'):
				router.put(route.$path,  ... route.$action);
				break;
			case ('delete'):
				router.delete(route.$path, ... route.$action);
				break;
		}
	}

}

export default IRoutes;
