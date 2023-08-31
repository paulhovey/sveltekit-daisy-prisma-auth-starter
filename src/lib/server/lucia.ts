import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
// import { github, google } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia/middleware';
import prismaInstance from '$lib/server/db';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),

	adapter: prisma(prismaInstance, {
		user: "user", // model User {}
		key: "key", // model Key {}
		session: "session" // model Session {}
	}),
	getUserAttributes: (userData) => {
		return {
			userId: userData.id,
			email: userData.email,
			// TODO: add more fields as needed to user database
			// firstName: userData.firstName,
			// lastName: userData.lastName,
			// role: userData.role,
			// verified: userData.verified,
			// receiveEmail: userData.receiveEmail,
			// token: userData.token
		};
	},
});

// export const githubAuth = github(auth, {
// 	clientId: env.GITHUB_OAUTH_CLIENT_ID!,
// 	clientSecret: env.GITHUB_OAUTH_CLIENT_SECRET!,
// 	scope: ['read:user', 'user:email'],
// });

// export const googleAuth = google(auth, {
// 	clientId: env.GOOGLE_OAUTH_CLIENT_ID!,
// 	clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET!,
// 	redirectUri: env.GOOGLE_OAUTH_REDIRECT_URI!,
// 	scope: [
// 		'https://www.googleapis.com/auth/userinfo.profile',
// 		'https://www.googleapis.com/auth/userinfo.email',
// 	],
// });

export type Auth = typeof auth;
