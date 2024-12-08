<template>
    <div v-on:click="action()" data-test="save-button" class="generate-button-container">
        <p>Salvar senha</p>
        <span class="material-icons">save</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    action:{
        required: true,
        type: Function
    }
})
</script>

<style scoped>
.generate-button-container{
    background: #A4FFAF;
    border: 1px solid #A4FFAF;
    margin-top: 4vh;
    padding: 1vh 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1vw;
    color: #24232C;
    font-size: 1.5em;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
}
.generate-button-container:hover{
    background-color: transparent;
    color: #A4FFAF;
}
</style>