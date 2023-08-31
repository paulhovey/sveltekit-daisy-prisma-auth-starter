/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="lucia" />

import type { AuthRequest } from 'lucia';

declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
	}

	namespace App {
		interface Locals {
			auth: AuthRequest;
			startTimer: number;
		}

		interface PageData {}

		interface Platform {}
	}

	interface Window {}
}

// THIS IS IMPORTANT!!!
export {};
