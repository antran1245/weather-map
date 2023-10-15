<script>
  import Map from './map.svelte'
  import Weather from './weather.svelte';
  
  let boundPos = { lng: -103, lat: 40 };
  let displayWeather = true
  let forcastData = {}
</script>

<main class="relative w-screen h-screen">
  <Map bind:forcastData={forcastData} boundPos={boundPos} bind:displayWeather={displayWeather}/>
  <Weather forcastData={forcastData} displayWeather={displayWeather}/>
</main>
