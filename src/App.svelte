<script>
  import Map from './map.svelte'
  import Weather from './weather.svelte';
  let boundPos = { lng: -103, lat: 40 };
</script>

<Map bind:boundPos={boundPos}/>
<!-- <Weather -->