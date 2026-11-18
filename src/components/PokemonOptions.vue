<template>
    <section class="mt-5 text-black">
        <ul>
            <li v-for="pokemon in pokemons" :key="pokemon.id">
                <button type="button" @click="emit('selectPokemon', pokemon)">
                    {{ pokemon.name }}
                </button>
            </li>
        </ul>
    </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/modules/pokemon/interfaces';

defineProps<{
    pokemons: Pokemon[];
}>();

const emit = defineEmits<{
    selectPokemon: [pokemon: Pokemon];
}>();
</script>

<style scoped>
@reference "tailwindcss";

li {
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

button {
    @apply w-full;
}

</style>