<script>
  export let label;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let value = 0;
  export let onChange;
</script>

<label>
  <span>{label}</span>
  <div class="range-input">
    <input type="range" {min} {max} {step} {value} on:change={(ev) => onChange(ev)} />
    <span>{value}</span>
  </div>
</label>

<style>
  .range-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: calc(100% - 3rem);
    height: 1rem;
    background-color: var(--clr-border-ui);
    border-radius: 999px;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  input[type='range']:hover {
    opacity: 1;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background-color: var(--clr-primary);
    border-radius: 999px;
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    width: 1rem; /* Set a specific slider handle width */
    height: 1rem; /* Slider handle height */
    background: var(--clr-primary); /* Green background */
    border: none;
    outline: none;
    cursor: pointer; /* Cursor on hover */
  }
</style>
