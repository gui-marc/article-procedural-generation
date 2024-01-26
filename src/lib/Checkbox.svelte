<script>
  export let label;
  export let onChange;
  export let value = false;
</script>

<label class="checkbox">
  <input type="checkbox" checked={value} on:change={onChange} />
  <span class="checkmark" />
  <span>{label}</span>
</label>

<style>
  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox input {
    display: none;
    appearance: none;
    -webkit-appearance: none;
    height: 0;
    width: 0;
  }

  .checkbox .checkmark {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: var(--radii);
    border: 1px solid var(--clr-border-ui);
    position: relative;
  }

  .checkbox input:checked ~ .checkmark::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--clr-primary);
    border-radius: calc(var(--radii) / 2);
  }
</style>
