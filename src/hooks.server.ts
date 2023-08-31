import { doesRouteRequireAuthorization } from '$lib/helpers';
import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import log from '$lib/server/log';

export const handle = async ({ event, resolve }) => {
	event.locals.startTimer = Date.now(); // log time page loads take in debug mode
	
	event.locals.auth = auth.handleRequest(event);

	/**
	 * This a simple system, that works quite well for small
	 * scale projects. For larger projects, you may want to
	 * consider using a more robust system.
	 */
	if (doesRouteRequireAuthorization(event.route.id ?? '')) {
		const session = await event.locals.auth.validate();

		if (!session) {
			throw redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	log(response.status, event);
	return response;
};
