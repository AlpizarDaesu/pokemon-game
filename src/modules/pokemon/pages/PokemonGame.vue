<template>
    <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokémons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="mt-5 text-white">¿Quién es este Pokémon?</h1>
        <h3 class="capitalize">{{  gameStatus }}</h3>
        <!-- Pokémon Picture -->
        <PokemonPicture
            v-if="pokemonToGuess"
            :pokemon="pokemonToGuess"
            :show-pokemon="gameStatus === GameStatus.Won"
        />
        <!-- Pokémon Options-->
        <PokemonOptions
            :pokemons="pokemonOptions"
            @select-pokemon="checkAnswer"
        />
        <p v-if="gameStatus === GameStatus.Won" class="mt-3 text-white">
            ¡Correcto!
        </p>
        <p v-else-if="gameStatus === GameStatus.Lost" class="mt-3 text-white">
            Incorrecto, intenta de nuevo.
        </p>
        <p class="mt-3 text-white">
            Aciertos: {{ stats.won }} | Errores: {{ stats.lost }}
        </p>
        <button class="mt-5 bg-blue-500 text-white px-4 py-2 rounded" @click="restartGame">
            Reiniciar Juego
        </button>
    </section>

</template>

<script lang="ts" setup>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame.ts';
import { GameStatus } from '../interfaces';

const {
    gameStatus,
    isLoading,
    pokemonOptions,
    pokemonToGuess,
    stats,
    checkAnswer,
    restartGame,
} = usePokemonGame();
</script>

<style scope>
</style>