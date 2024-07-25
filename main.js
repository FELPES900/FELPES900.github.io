function fazGet(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}

function main() {
    let data = fazGet('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
    let pokemons = JSON.parse(data);
    let lista = document.getElementById('pokemons');

    for (let i = 0; i < pokemons.results.length; i++) {
        let pokemon = pokemons.results[i];

        let url = pokemon.url

        let request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send();
        let pokemonData = JSON.parse(request.responseText);
        lista.innerHTML += `<li class="pokemon ${pokemonData.types[0].type.name}" id="pokemon">
            <div class="pokeinfo">              
                <span class="name" style="font-weight: bold;">${pokemonData.name}</span>
                <span class="number">#${pokemonData.id}</span>
                <ol class="types">
                    ${pokemonData.types.map(type => `<li class="type">${type.type.name}</li>`).join('')}
                </ol>
            </div> 
            <div class="pokeimg">
                <img src="${pokemonData.sprites.front_default}" alt="">
                <img class="imgbackground" src="https://pokemoncalc.web.app/en/assets/pokeball.svg" alt="">
            </div>
        </li>`
        console.log(pokemonData)
    }
}


main()