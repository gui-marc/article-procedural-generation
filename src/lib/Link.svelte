<script>
  import { ExternalLink } from 'lucide-svelte';

  export let href = '';
  export let external = false;
</script>

<a class="link" {href} target={external ? '_blank' : '_self'}>
  <slot />
  {#if external}
    <ExternalLink size={18} />
  {/if}
</a>

<style>
  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    width: fit-content;
    color: var(--clr-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
    font-size: inherit;
  }

  .link:hover {
    color: var(--clr-primary-hover);
  }
</style>
