<template>
    <section>
        <img
            v-if="!showPokemon"
            :src="pokemonImage"
            alt="Pokémon"
            class="brightness-0 h-[200px]"
        />
        <img
            v-else
            :src="pokemonImage"
            :alt="pokemon.name"
            class="fade-in h-[200px]"
        />
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { Pokemon } from '../interfaces';

const props = defineProps<{
    showPokemon: boolean;
    pokemon: Pokemon;
}>();

const pokemonImage = computed(() =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemon.id}.png`,
);
</script>

<style scoped>
img {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>