<script setup lang="ts">
import { obterReceitas } from '@/http';
import type IReceita from '@/interfaces/IReceita';
import { ref, type PropType, type Ref } from 'vue';

const props = defineProps({
    ingredientes: {
        type: Array as PropType<string[]>,
        required:true
    }
})
const receitas: Ref<IReceita[]> = ref([])
const getReceitas = async() =>{
    receitas.value = await obterReceitas(props.ingredientes)
}
getReceitas()
</script>

<template>
    <section class="receitas">
        <h1 class="cabecalho titulo-receitas">Receitas</h1>
        <p class="paragrafo-lg">
            Resultados encontrados: {{receitas.length}}
        </p>
        <p class="paragrafo-lg instrucoes">
            Veja as opções de receitas que encontramos com os ingredientes que você tem por aí!
        </p>
    </section>
</template>

<style scoped>
.receitas {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titulo-receitas {
  color: var(--verde-medio, #3D6D4A);
  display: block;
  margin-bottom: 1.5rem;
}
.instrucoes {
  margin-bottom: 2rem;
}
</style>