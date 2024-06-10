<script setup lang="ts">
import { ref, type Ref } from 'vue';
import SelecionarIngredientes from './SelecionarIngredientes.vue'
import SuaLista from '@/components/SuaLista.vue'
import MostrarReceitas from '@/components/MostrarReceitas.vue'

type Pagina = 'SelecionarIngredientes' | 'MostrarReceitas'

const ingredientes = ref([]) as Ref<string[]>

const conteudo = ref<Pagina>('SelecionarIngredientes')

const addIngrediente = (ingrediente:string) =>{
  ingredientes.value.push(ingrediente)
}

const removeIngrediente = (ingrediente:string) =>{
  ingredientes.value = ingredientes.value.filter( ingr => ingr != ingrediente)
}

const navegar = (page:Pagina) =>{
  conteudo.value = page
}


</script>

<template>
    <main class="conteudo-principal">
      <SuaLista :ingredientes="ingredientes"/>
      <KeepAlive exclude="MostrarReceitas">
        <SelecionarIngredientes v-if="conteudo === 'SelecionarIngredientes'" @add:ingrediente="addIngrediente" @remove:ingrediente="removeIngrediente" @search:receipts="navegar('MostrarReceitas')" />
        <MostrarReceitas v-else-if="conteudo=== 'MostrarReceitas' " :ingredientes="ingredientes" @edit:list="navegar('SelecionarIngredientes')"  />
      </KeepAlive>
    </main>

    
</template>

<style scoped>



.conteudo-principal {
  padding: 6.5rem 7.5rem;
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  background: var(--creme, #FFFAF3);
  color: var(--cinza, #444);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}

@media only screen and (max-width: 1300px) {
  .conteudo-principal {
    padding: 5rem 3.75rem;
    gap: 3.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .conteudo-principal {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
}


</style>