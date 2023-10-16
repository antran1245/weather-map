<script>
  import Address from './address.svelte';
import Map from './map.svelte'
  import Weather from './weather.svelte';
  
  let boundPos = { lng: -103, lat: 40 };
  let displayWeather = true
  let forcastData = {}
  let place = "Drag to a location"
</script>

<main class="relative w-screen h-screen">
  <Map bind:forcastData={forcastData} {boundPos} bind:displayWeather={displayWeather} {place}/>
  <Weather {forcastData} {displayWeather}/>
  <Address bind:forcastData={forcastData} bind:boundPos={boundPos} bind:displayWeather={displayWeather} bind:place={place}/>
</main>
