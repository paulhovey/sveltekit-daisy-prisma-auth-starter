<script lang="ts">
	import { page } from "$app/stores";

	export let logged_in = false;
</script>

{#if logged_in}
<!-- user is logged in, so show available menu options -->
<div class="navbar bg-base-300">
	<div class="flex-1">
	  <a href="/" class="btn btn-ghost normal-case text-xl">Demo App</a>
	</div>
	<div class="flex-none gap-2">
	  <div class="form-control">
		<input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
	  </div>
	  <div class="dropdown dropdown-end">
		<label tabindex="0" class="btn btn-ghost btn-circle avatar">
		  <div class="w-10 rounded-full">
			<img src="/defaultprofilepic.jpg" />
		  </div>
		</label>
		<ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
		  <li>
			<a class="justify-between">
			  Profile
			  <span class="badge">New</span>
			</a>
		  </li>
		  <li><a>Settings</a></li>
		  <!-- https://kit.svelte.dev/docs/link-options -->
		  <li><a data-sveltekit-preload-data="tap" href="/logout">Logout</a></li>
		</ul>
	  </div>
	</div>
  </div>
{:else}
<!-- user is not logged in, so show basic header -->
<div class="navbar bg-base-100">
	<div class="flex-1">
	  <a href="/" class="btn btn-ghost normal-case text-xl">Demo App</a>
	</div>
	<div class="flex-none">
	  <ul class="menu menu-horizontal px-1">
		<li><a href="/login">Login</a></li>
		<li><a href="/signup">Register</a></li>
	  </ul>
	</div>
  </div>
{/if}

