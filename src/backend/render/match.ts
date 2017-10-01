import {match} from 'react-router';
import routes from '../../frontend/app'
import markup from './markup'

export default function(ctx: any) {
	let content;
	match({routes: routes(), location: ctx.url},
		(error: any, redirectLocation: any, renderProps: any) => {
			console.log(ctx.url);
			if (error) {
				ctx.throw(500);
			} else if (redirectLocation) {
				ctx.status = 302;
				ctx.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				try {
					content = markup(renderProps);
				} catch (e) {
					console.log(e);
				}
			} else {
				ctx.throw(404, 'Not found');
			}
		});
	return content;
}
