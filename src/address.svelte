<script lang="ts">
  import type { EventHandler } from "svelte/elements";

  export let boundPos : {lng: number, lat: number}
  export let displayWeather : boolean
  export let forcastData: {[key: string]: any}
  export let place : string;

  let city = ""
  let state = ""
  function handleSubmit() {
    let query = ""
    if(city.length > 0 && state.length > 0) {
      query = ("city=" + city + "&state=" + state)
      place = city + ", " + state
    } else if(city.length > 0) {
      query = "city=" + city
      place = city
    } else if(state.length) {
      query = "&state=" + state
      query = city
    }
    query.replaceAll(" ", "+")
    fetch(`https://geocode.maps.co/search?${query}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data[0])
      boundPos = {lng: data[0].lon, lat: data[0].lat}
    })
    .catch(() => {
      alert(`Place does not exist`)
      city = ""
      state = ""
    })

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${boundPos.lat}&longitude=${boundPos.lng}&current=temperature_2m,windspeed_10m,precipitation_probability&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`)
    .then(resp => resp.json())
    .then(data => {
      forcastData = {...data}
      displayWeather = true
    })
    .catch(err => console.log(err))
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="absolute top-10 left-1/2 -translate-x-1/2 w-fit h-fit bg-slate-300 px-10 py-5 rounded-xl">
  <div class="flex">
    <div class="mr-3 flex items-center">
      <label for="city" class="font-bold text-xl mr-2">City</label>
      <input bind:value={city} placeholder="Enter a city name" type="text" id="city" name="city" class="bg-transparent p-2 border-b-2 border-black-400 outline-none">
    </div>
    <div class="mr-3 flex items-center">
      <label for="state" class="font-bold text-xl mr-2">State</label>
      <input bind:value={state} placeholder="Enter a state" type="text" id="state" name="state" class="bg-transparent p-2 border-b-2 border-black-400 outline-none">
    </div>
    <div class=" flex items-center">
      <button type="submit" class="bg-white px-5 py-1 rounded-lg font-bold hover:bg-black hover:text-white">Search</button>
    </div>
  </div>
</form>