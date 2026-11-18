<template>
    <section>
        <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
            alt="Pokémon"
            class="brightness-0 h-[200px]"
        />
    </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '../interfaces';

defineProps<{
    pokemon: Pokemon;
}>();
</script>

<style scope>
img{
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>