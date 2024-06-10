<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import { ref } from 'vue';

const emit = defineEmits(['add:ingrediente','remove:ingrediente'])
const props = defineProps({
    ingrediente: {
        type:String,
        required:true
    }
})
const selecionado = ref(false)

const onClick= () => {
    selecionado.value = !selecionado.value

    emit(selecionado.value? 'add:ingrediente' : 'remove:ingrediente', props.ingrediente)
}
</script>
<template>
    <button class="ingrediente" 
        @click="onClick" 
        :aria-pressed="selecionado"
    >
        <Tag :texto="ingrediente" :ativa="selecionado" />
    </button>
</template>

<style scoped>
    .ingrediente {
        cursor:pointer
    }
</style>