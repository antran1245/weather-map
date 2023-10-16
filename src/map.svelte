<script lang="ts">
  
    import { MapLibre , Marker} from 'svelte-maplibre';
    import rainIcon from './assets/rainy.svg'
    import geoPin from './assets/geoPin.svg'

    export let boundPos: {lng: number, lat: number};
    export let displayWeather: boolean;
    export let forcastData: {[key: string]: any};
    export let place : string;

    function handleMove() {
      displayWeather = true
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${boundPos.lat}&longitude=${boundPos.lng}&current=temperature_2m,windspeed_10m,precipitation_probability&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`)
      .then(resp => resp.json())
      .then(data => forcastData = data)
      
      fetch(`https://geocode.maps.co/reverse?lat=${boundPos.lat}&lon=${boundPos.lng}`)
      .then(resp => resp.json())
      .then(data => place = `${data.address.city || data.address.county}, ${data.address.state}`)
      // console.log(forcastData)
    }


</script>
  <MapLibre
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    class="map"
    standardControls
    zoom={4}
    center={[boundPos.lng, boundPos.lat]}
    >
    
    <Marker
      bind:lngLat={boundPos}
      on:dragend={handleMove}
      on:dragstart={() => displayWeather = false}
      draggable
      class="flex flex-col justify-center items-center"
    >
      <span class="border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-fit h-fit px-3 bg-red-300 text-black rounded-full grid place-items-center"> {place} </span>
      <img src={geoPin} alt="geo pin">
    </Marker>
  </MapLibre>
  
  <style>
    :global(.map) {
      height: 100vh;
      width: 100vw;
    }
  </style>