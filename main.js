const selectGen     = document.getElementById('selectGen');
const selectTipo    = document.getElementById('selectTipo');
const selectGenMob  = document.getElementById('selectGenMob');
const selectTipoMob = document.getElementById('selectTipoMob');

selectGen.addEventListener('change', function() {
    let gen = this.value;
    document.getElementById('pokemons').innerHTML = '';
    main(gen);
})

selectTipo.addEventListener('change', function(event) {
    document.getElementById('pokemons').innerHTML = '';
    main(selectGen.value,event.target.value);
})

selectTipoMob.addEventListener('change', function(eventMob) {
    document.getElementById('pokemons').innerHTML = '';
    main(selectGenMob.value,eventMob.target.value);
})

selectGenMob.addEventListener('change', function() {
    let gen = this.value;
    document.getElementById('pokemons').innerHTML = '';
    main(selectGenMob.value);
})


function fazGet(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}


function main(generation = "generation-i",tipoParam) {
    let data = fazGet('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
    let pokemons = JSON.parse(data);
    let selectTipo = document.getElementById('selectTipo');
    let pokemon = null
    let url = null
    let request = null
    let pokemonData = null
    let rota = null
    let tipo

    for (let i = 0; i < pokemons.results.length; i++) {
        pokemon = pokemons.results[i];

        url = pokemon.name

        request = new XMLHttpRequest();
        request.open('GET', "https://pokeapi.co/api/v2/pokemon/" + url, false);
        request.send();
        
        pokemonData = JSON.parse(request.responseText);
        rota = pokemonData.sprites.versions[generation]
        
        tipo = Object.keys(rota)
    
        if (tipoParam) {
            corpo(rota, pokemonData, tipoParam)
        }else {
            selectTipo.innerHTML = ''
            selectTipoMob.innerHTML = ''
            for (let i = 0; i < tipo.length; i++) {
                selectTipo.innerHTML += `<option value="${tipo[i]}">${tipo[i]}</option>`
                selectTipoMob.innerHTML += `<option value="${tipo[i]}">${tipo[i]}</option>`
            }
            corpo(rota, pokemonData, tipo[0])    
        }
    }
}

function corpo(rota, pokemonData, tipo) {
    let listapokemons = document.getElementById('pokemons');
    listapokemons.innerHTML += `<li class="pokemon ${pokemonData.types[0].type.name}" id="pokemon">
            <div class="pokeinfo">              
                <span class="name" style="font-weight: bold;">${pokemonData.forms[0].name}</span>
                <span class="number">#${pokemonData.id}</span>
                <ol class="types">
                    ${pokemonData.types.map(type => `<li class="type">${type.type.name}</li>`).join('')}
                </ol>
            </div> 
            <div class="pokeimg">
                <img src="${rota[tipo]["front_default"]}" alt="">
                <img class="imgbackground" src="https://pokemoncalc.web.app/en/assets/pokeball.svg" alt="">
            </div>
        </li>`
}

main()