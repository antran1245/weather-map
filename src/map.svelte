<script lang="ts">
  
    import { MapLibre , Marker} from 'svelte-maplibre';
    import rainIcon from './assets/rainy.svg'
    
    export let boundPos: {lng: number, lat: number};
    export let displayWeather: boolean;
    export let forcastData: {[key: string]: any}

    async function handleMove() {
      displayWeather = true
      let data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${boundPos.lat}&longitude=${boundPos.lng}&current=temperature_2m,windspeed_10m,precipitation_probability&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`)
      forcastData = await data.json()
      console.log(forcastData)
    }


</script>
  <MapLibre
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    class="map"
    standardControls
    zoom={4}
    center={[-103, 40]}
    >
    
    <Marker
    bind:lngLat={boundPos}
    on:dragend={handleMove}
    on:dragstart={() => displayWeather = false}
      draggable
      class="border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-32 h-12 bg-red-300 text-black rounded-full grid place-items-center"
    >
      <span> Drag to a location </span>
    </Marker>
  </MapLibre>
  
  <style>
    :global(.map) {
      height: 100vh;
      width: 100vw;
    }
  </style>