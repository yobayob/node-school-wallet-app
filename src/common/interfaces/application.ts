import * as App from 'koa';
import * as Router from 'koa-router';


export interface ApplicationSchema {
	router: Router;
	$setRoutes(): void;
}


