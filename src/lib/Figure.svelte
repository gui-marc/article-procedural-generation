<script>
  export let src;
  export let alt;
  export let caption;
  export let fullWidth = false;
</script>

<figure class:fullWidth>
  <img {src} {alt} />
  {#if caption}
    <figcaption class="muted">
      <i>
        {caption}
      </i>
    </figcaption>
  {/if}
</figure>

<style>
  figure {
    width: 100%;
    margin-inline: auto;
    max-width: 740px;
  }

  figure.fullWidth {
    width: 100%;
    max-width: none;
  }

  figure img {
    border-radius: var(--radii);
    width: 100%;
    height: auto;
    border: 1px solid var(--clr-border-ui);
  }

  figure figcaption {
    max-width: 740px;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-inline: auto;
  }
</style>
