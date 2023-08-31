<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h3>
				{#if data.session}
					You are logged in!
				{:else}
					You are not logged in
				{/if}
			</h3>

			<br/>

			<div class="mockup-code text-left">
				<pre data-prefix="$"><code>pnpm install</code></pre> 
				<pre data-prefix="$"><code>pnpm run dev</code></pre>
				<pre data-prefix=">" class="text-success"><code>Debug in VSCode too!</code></pre>
			</div>
		</div>
	</div>
</div>

