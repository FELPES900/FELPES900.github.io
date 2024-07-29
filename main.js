const selectGen      = document.getElementById('selectGen');
const selectTipo     = document.getElementById('selectTipo');
const selectGenMob   = document.getElementById('selectGenMob');
const selectTipoMob  = document.getElementById('selectTipoMob');
const loadMoreButton = document.getElementById('loadMoreButton');
const inputSearch    = document.getElementById('inputSearch');
let = offset = 0

main()

selectGen.addEventListener('change', function() {
    let gen = this.value;
    offset = 0
    document.getElementById('pokemons').innerHTML = '';
    main(gen);
})

selectTipo.addEventListener('change', function(event) {
    document.getElementById('pokemons').innerHTML = '';
    offset = 0
    main(selectGen.value,event.target.value);
})

loadMoreButton.addEventListener('click', function() {
    if (selectGen.value) {
        main(selectGen.value, selectTipo.value, offset += 10);
    } else {
        main(selectGenMob.value, selectTipoMob.value, offset += 10);
    }
})

selectTipoMob.addEventListener('change', function(eventMob) {
    offset = 0
    document.getElementById('pokemons').innerHTML = '';
    main(selectGenMob.value,eventMob.target.value);
})

selectGenMob.addEventListener('change', function() {
    offset = 0
    document.getElementById('pokemons').innerHTML = '';
    main(selectGenMob.value);
})


function fazGet(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}


function main(generation = "generation-i",tipoParam,offset = 0) {
    let data = fazGet('https://pokeapi.co/api/v2/pokemon?offset='+offset+'&limit=10');
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
    
function getPokemonNames() {
    return new Promise((resolve, reject) => {
        fetch('pokemons.json')
        .then(response => response.json())
        .then(data => {
            const names = data.results.map(pokemon => pokemon.name);
            resolve(names);
        })
        .catch(error => {
            reject(error);
        });
    });
}
    
getPokemonNames().then(pokemonNames => {
        dados = pokemonNames
});


function buscarNomes() {
    const input = document.getElementById('input-nome');
    const termo = input.value.trim();
    const nomes = dados;
    const nomesEncontrados = nomes.filter(nome => nome.toLowerCase().includes(termo.toLowerCase()));
    const resultado = document.getElementById('resultado');
    let listapokemons = document.getElementById('pokemons');
    let request = null
    
    resultado.innerHTML = '';
    
    if (nomesEncontrados.length === 1302) {
        listapokemons.innerHTML = '';
        main();
    } else {
        listapokemons.innerHTML = '';
        nomesEncontrados.forEach(nome => {
        request = new XMLHttpRequest();
        request.open('GET', "https://pokeapi.co/api/v2/pokemon/" + nome, false);
        request.send();
        pokemonData = JSON.parse(request.responseText);
        rota = pokemonData.sprites.versions[selectGen.value]
        corpo(rota, pokemonData, selectTipo.value);
      });
    }
  }