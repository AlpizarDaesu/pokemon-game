import { computed, onMounted, ref } from 'vue'
import confetti from 'canvas-confetti';
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
    
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([]);
    const pokemonToGuess = ref<Pokemon | null>(null);
    const stats = ref({ won: 0, lost: 0 });
    const isLoading = computed(() => pokemons.value.length === 0);
    let nextRoundTimeout: ReturnType<typeof setTimeout> | undefined;

    const getPokemons = async () => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
        const pokemonsArray = response.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id,
            }
        });
        return pokemonsArray.sort(() => Math.random() - 0.5);
    };

    const getNextOptions = (howMany: number = 4) => {
        gameStatus.value = GameStatus.Playing;
        pokemonOptions.value = pokemons.value.slice(0, howMany);
        pokemons.value = pokemons.value.slice(howMany);
        pokemonToGuess.value = pokemonOptions.value[
            Math.floor(Math.random() * pokemonOptions.value.length)
        ] ?? null;
    }

    const checkAnswer = (pokemon: Pokemon) => {
        if (gameStatus.value !== GameStatus.Playing) return;

        gameStatus.value = pokemon.id === pokemonToGuess.value?.id
            ? GameStatus.Won
            : GameStatus.Lost;

        if (gameStatus.value === GameStatus.Won) {
            stats.value.won++;
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
            });
        } else {
            stats.value.lost++;
        }

        const optionsCount = pokemonOptions.value.length;
        nextRoundTimeout = setTimeout(() => {
            nextRoundTimeout = undefined;
            getNextOptions(optionsCount);
        }, 2000);
    };

    const restartGame = () => {
        if (nextRoundTimeout) {
            clearTimeout(nextRoundTimeout);
            nextRoundTimeout = undefined;
        }

        stats.value = { won: 0, lost: 0 };
        getNextOptions(pokemonOptions.value.length || 5);
    };

    // Lo montamos directamente para ver el resultado al momento en que cargue la aplicación
    onMounted(async ()=>{
        await new Promise((r) => setTimeout(r, 1000));
        pokemons.value=await getPokemons();
        getNextOptions(5);
        console.log({ pokemons });
        console.log(pokemonOptions.value);
    });
    
    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        pokemonToGuess,
        stats,
        // Methods
        getNextOptions,
        checkAnswer,
        restartGame,
    };
}