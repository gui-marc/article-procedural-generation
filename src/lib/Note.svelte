<div class="note">
  <p>
    <slot />
  </p>
</div>

<style>
  .note {
    display: block;
    padding: 1rem;
    width: 100%;
    margin-block: 2rem;
    margin-inline: auto;
    max-width: var(--text-container-width);
    border-left: 3px solid var(--clr-border-ui);
    box-sizing: border-box;
    background: var(--clr-background-ui);
    border-radius: var(--radii);
  }
</style>
