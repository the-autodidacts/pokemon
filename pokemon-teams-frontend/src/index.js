const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainers => {
  console.log(trainers)
  addTrainers(trainers)
})

function addTrainers(trainers){
  let main = document.querySelector('main')
   trainers.forEach(trainer => {
     main.innerHTML+= `<div class="card" data-id="${trainer.id}">
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}" data-beef="mohammed">Add Pokemon</button>
        <ul>
          ${addPokemons(trainer.pokemons)}
        </ul>
      </div>`
  })
}

function addPokemons(pokemons){
  return pokemons.map(pokemon =>{
    return `<li>${pokemon.nickname} <button class="release" data-pokemon-id="${pokemon.id}">Release</button><li>`
  }).join("")
}

document.addEventListener("click", function(event){

  if(event.target.innerText === "Release"){
    console.log("Release me")
    fetch(`${POKEMONS_URL}/${event.target.dataset["pokemonId"]}`, {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    event.target.parentNode.remove()
  }

  if(event.target.innerText === "Add Pokemon"){
    console.log("HIT")
    console.log(event.target.dataset)
    const ul = event.target.nextElementSibling
    fetch(POKEMONS_URL,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({'trainer_id': event.target.dataset["trainerId"]})
    })
    .then(response => response.json())
    .then(pokemon => {
      console.log(pokemon)
      addPokemon(pokemon, ul)
    })
  }
})

function addPokemon(pokemon, ul){
  ul.innerHTML += `<li>${pokemon.nickname} <button class="release" data-pokemon-id="${pokemon.id}">Release</button><li>`
}
