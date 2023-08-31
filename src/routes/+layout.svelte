<script lang="ts">
	import "../app.postcss";
	
	import Navbar from "$lib/components/Navbar.svelte";

	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let ready: boolean = false;
	onMount(() => (ready = true));

	let data: PageData;
</script>

<Navbar logged_in={data && data.session && data.session?.user.email && data.session?.user.role} />

{#if ready}
	<slot />
{/if}
