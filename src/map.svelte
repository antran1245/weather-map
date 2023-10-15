<script lang="ts">
  
    import { MapLibre , Marker} from 'svelte-maplibre';

    export let boundPos: {lng: number, lat: number};
    async function handleMove() {
      let data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${boundPos.lat}&longitude=${boundPos.lng}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
      const resp = await data.json()
      console.log(resp)
    }

</script>
  <ul>
    <li>Position from <code>bind:latLng</code>: {JSON.stringify(boundPos)}</li>
  </ul>
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
      draggable
      class="border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-32 h-12 bg-red-300 text-black rounded-full grid place-items-center"
    >
      <span> Drag to a location </span>
    </Marker>
  </MapLibre>
  
  <p>
    Bound props can use either <code>&#123; lng, lat &#125;</code> objects or GeoJSON Location
    <code>[lng, lat]</code> arrays.
  </p>
  
  <style>
    :global(.map) {
      height: 100vh;
      width: 100vw;
    }
  </style>