<script>
  export let term;
  export let fonems = [];
  export let type;
  export let definitions = [];
  export let fromText;
  export let fromLink;
</script>

<div class="dictionary">
  <h4><i>{term}</i></h4>

  <p class="dictionary__head muted">
    {#each fonems as fonem, index}
      <span>|{fonem}|</span>

      {#if index < fonems.length - 1}
        <span>ou</span>
      {/if}
    {/each}
  </p>

  <div class="dictionary__details muted">
    <p>{type}</p>
    <ul>
      {#each definitions as definition, index}
        <li>{index + 1}. {definition}</li>
      {/each}
    </ul>
  </div>

  {#if fromText}
    <div class="dictionary__footer muted">
      <a href={fromLink}>{fromText}</a>
    </div>
  {/if}
</div>

<style>
  .dictionary {
    max-width: calc(740px + 3rem);
    padding: 1.5rem;
    margin-inline: auto;
    margin-block: 1.5rem;
    background-color: var(--clr-background-ui);
    border: 1px solid var(--clr-border-ui);
    border-radius: 8px;
  }

  .dictionary .dictionary__head {
    margin-top: 0.25rem;
  }

  .dictionary .dictionary__head,
  .dictionary .dictionary__details,
  .dictionary .dictionary__footer {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  li {
    margin-top: 0.25rem;
  }

  a {
    color: var(--clr-text-secondary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
</style>
