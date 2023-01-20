'use strict'

const pokedex$$ = document.getElementById('pokedex');
let pokemonData = [];

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#e8bcf0',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const getPokemon = async () => {
    for (let i = 1; i <= 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        pokemonData.push(data);
    }
    return pokemonData;
}

const mapPokemons = (pokemonData) => {
    return pokemonData.map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.sprites.other.home.front_default,
        type: pokemon.types[0].type.name,
        id: pokemon.id
    }));
};

function drawPokemons (pokemonData) {
    for (const pokemon of pokemonData) {
        let pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'card';

        let pokemonName = document.createElement('h2');
        pokemonName.className = 'card-title';
        pokemonName.textContent = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.setAttribute("src", pokemon.image);
        pokemonImage.setAttribute("alt", pokemon.name);
        pokemonImage.className = 'card-image';

        let pokemonType = document.createElement('p');
        pokemonType.className = 'card-subtitle';
        pokemonType.textContent = pokemon.type;

        let pokemonId = document.createElement('span');
        pokemonId.className = 'card-number';
        pokemonId.textContent = '#' + pokemon.id;

        const color = colors[pokemon.type];

        pokemonDiv.style.backgroundColor = color;

        
        pokemonDiv.appendChild(pokemonName);
        pokemonDiv.appendChild(pokemonImage);
        pokemonDiv.appendChild(pokemonType);
        pokemonDiv.appendChild(pokemonId);

        pokedex$$.appendChild(pokemonDiv);

    }
};


const init = async () => {
    const pokemons = await getPokemon();
    const mappedPokemons = mapPokemons(pokemons);
    drawPokemons(mappedPokemons);
};

init();
