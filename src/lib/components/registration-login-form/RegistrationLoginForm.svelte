<script lang="ts">
	// Yea yea, I know it looks exactly like https://linear.app/signup.
	// It's because I took their styling...move along...
	import { enhance } from '$app/forms';
	import type { ActionData } from '.svelte-kit/types/src/routes/(public)/signup/$types';
	import GithubOAuthBtn from './GithubOAuthBtn.svelte';
	import GoogleOAuthBtn from './GoogleOAuthBtn.svelte';

	export let isRegistration = false;

	$: submitTitle = isRegistration ? 'Create account' : 'Login';
	export let form: ActionData;
</script>

<registration-login-form-holder>
	<h2>
		{#if isRegistration}
			Create your account
		{:else}
			Log into your account
		{/if}
	</h2>

	<!-- <oauth-btns>
		<GoogleOAuthBtn />
		<GithubOAuthBtn />
	</oauth-btns> -->

	<div-ider>
		<line-left />
		or
		<line-right />
	</div-ider>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<form method="post" use:enhance>
		<input type="email" name="email" id="email" placeholder="Email address" />
		<input type="password" name="password" id="password" placeholder="Password" />

		{#if isRegistration}
			<input
				type="password"
				name="password_repeat"
				id="password_repeat"
				placeholder="Repeat password"
			/>
		{/if}

		<input type="submit" value={submitTitle} />
	</form>

	{#if isRegistration}
		<terms-txt>
			By signing up, you agree to the <a href="/terms">Terms of Service</a>
			<br />
			and
			<a href="/dpa">Data Processing Agreement.</a>
		</terms-txt>
	{/if}
</registration-login-form-holder>
