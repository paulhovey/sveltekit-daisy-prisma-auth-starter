import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import * as EmailValidator from 'email-validator';
import type { PageServerLoad, Actions } from './$types';
import { generateUserId } from '$lib/utils/id';
import prismaInstance from '$lib/server/db';
import log from '$lib/server/log';

export const load: PageServerLoad = async ({ locals }) => {
	/**
	 * If user is already logged in, redirect to home page.
	 */
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');

	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		// possible improvement: superforms?
		const emailRaw = formData.get('email') as string;
		const pw = formData.get('password') as string;
		const pwRepeat = formData.get('password_repeat') as string;

		if (!EmailValidator.validate(emailRaw)) {
			return fail(400, {
				message: 'Invalid email',
			});
		}

		const pwCheck = checkPassword(pw, pwRepeat);

		if (!pwCheck.res) {
			return fail(400, {
				message: pwCheck.errorMsg,
			});
		}

		try {
			// Sanitize.
			const email = emailRaw.toLowerCase();

			const existingUser = await prismaInstance.user.findUnique({
				where: {
					email: email
				}
			});

			// User with the same email found.
			if (existingUser) {
				return fail(400, {
					message: 'E-mail taken.',
				});
			}

			// well crap:  https://github.com/pilcrowOnPaper/lucia/issues/1029
			const user = await auth.createUser({
				// userId: generateUserId().toString(),
				key: {
					// Auth method.
					providerId: 'email',

					// Unique id when using "email" auth method.
					providerUserId: email,

					// Hashed by Lucia.
					password: pw,
				},
				attributes: {
					email: email,
					// TODO: add more data fields
					// firstName: form.data.firstName,
					// lastName: form.data.lastName,
					// role: 'USER',
					// verified: false,
					// receiveEmail: true,
				},
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			// set session cookie
			locals.auth.setSession(session);

			/**
			 * This is the part where you send a verification email.
			 * This can be done immediately or in a scheduler depending
			 * on your needs.
			 */
		} catch (e) {
			// If you are using sqlite this could be handy.
			// check for unique constraint error in user table
			// if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
			// 	return fail(400, {
			// 		message: 'Username already taken',
			// 	});
			// }

			log(500, e);

			return fail(500, {
				message: 'An unknown error occurred',
			});
		}

		// Redirect to page of choice.
		// Do not this throw inside a try/catch block!
		throw redirect(302, '/');
	},
};

// Probably best to use Zod or something similar.
// But this will do for a start.
function checkPassword(pw: string, pwRepeat: string): PwCheckResult {
	if (typeof pw !== 'string') {
		return {
			res: false,
			errorMsg: 'Password is not a string.',
		};
	}

	// If pw contains spaces, it's probably a mistake.
	if (pw.includes(' ')) {
		return {
			res: false,
			errorMsg: 'Password contains spaces.',
		};
	}

	if (pw.length < 6) {
		return {
			res: false,
			errorMsg: 'Password is too short.',
		};
	}

	if (pw.length > 255) {
		return {
			res: false,
			errorMsg: 'Password is too long.',
		};
	}

	if (pw !== pwRepeat) {
		return {
			res: false,
			errorMsg: 'Passwords do not match.',
		};
	}

	return {
		res: true,
		errorMsg: '',
	};
}

type PwCheckResult = {
	// True = success.
	// False = fail.
	res: boolean;
	errorMsg: string;
};
