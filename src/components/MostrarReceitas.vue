<script setup lang="ts">
import type IReceita from '@/interfaces/IReceita';
import BotaoPrincipal from './BotaoPrincipal.vue';
import CardReceita from '@/components/CardReceita.vue'
import { ref, type PropType, type Ref } from 'vue';
import { obterReceitas } from '@/http';

const emit = defineEmits(['edit:list'])
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
    <section class="mostrar-receitas">
    <h1 class="cabecalho titulo-receitas">Ingredientes</h1>

    <p class="paragrafo-lg resultados-encontrados">
        Resultados encontrados: {{ receitas.length }}
    </p>

    <div v-if="receitas.length" class="receitas-wrapper">
        <p class="paragrafo-lg receitas-nao-encontradas__info " v-if="receitas.length>0">
            Veja as opções de receitas que encontramos com os ingredientes que você tem por aí!
        </p>

        <ul class="receitas">
            <li v-for="receita of receitas" :key="receita.nome" >
                <CardReceita :receita="receita" />
            </li>
        </ul>
    </div>

    
    <div v-else class="instrucoes">
        <p class="paragrafo-lg instrucoes" >
            Ops, não encontramos resultados para sua combinação. Vamos tentar de novo?
        </p>
        <img src="/src/assets/images/sem-receitas.png" 
            alt="Desenho de um ovo quebrado. Gema tem um rosto com expressão triste">
    </div>
    
    <BotaoPrincipal texto="Editar Lista" @click="emit('edit:list')" />
</section>
</template>

<style scoped>
.mostrar-receitas {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.titulo-receitas {
  color: var(--verde-medio, #3D6D4A);
  display: block;
  margin-bottom: 1.5rem;
}

.resultados-encontrados {
  color: var(--verde-medio, #3D6D4A);
  margin-bottom: 0.5rem;
}
.receitas-wrapper {
  margin-bottom: 3.5rem;
}
.receitas-nao-encontradas__info {
  margin-bottom: 0.5rem;
}
.instrucoes {
  margin-bottom: 2rem;
}
.receitas {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
</style>