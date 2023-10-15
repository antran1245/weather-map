<script lang="ts">
  export let forcastData: {[key: string]: any}
  export let displayWeather : boolean;
</script>
{#if displayWeather && Object.keys(forcastData).length > 0}
<div class={`absolute top-10 left-10 w-[350px] h-[300px] bg-white flex items-center justify-center rounded-xl`}>
  <div class="flex flex-1-auto flex-col">
    <h3 class="font-bold text-3xl">Coordinate</h3>
    <ul>
      <li>Longitude: {forcastData.longitude}</li>
      <li>Latitude: {forcastData.latitude}</li>
    </ul>
    <h3 class="font-bold text-3xl">Current</h3>
    <ul>
      <li>Temperature: {forcastData.current.temperature_2m} &#8451 / {((forcastData.current.temperature_2m * (9/5)) + 32).toFixed(1)} &#8457</li>
    </ul>
    <p>Windspeed: {(forcastData.current.windspeed_10m * 0.62).toFixed(1)} mph</p>
    <p>Precipitation Probability: {forcastData.current.precipitation_probability} %</p>
  </div>
</div>
{/if}