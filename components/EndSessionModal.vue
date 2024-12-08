<template>
    <div class="end-modal-container" v-on:click="close()">
        <div class="end-modal" @click.stop>
            <p class="end-account-header">Tem certeza que deseja encerar a sessão?</p>
            <button v-on:click="action()" class="end-account-button">Sim</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    close: {required: true, type: Function},
    action: {required: true, type: Function}
})
</script>

<style scoped>
.end-modal-container {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.end-modal {
    background-color: #24232C;
    width: 60vw;
    max-height: 80vh;
    padding: 5vh 6vw 0 6vw;
    border: 1px solid #A4FFAF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.end-account-header {
    font-weight: 700;
    text-align: center;
    font-size: 2em;
    margin-bottom: 4vh;
}
.end-account-button {
    background: #A4FFAF;
    border: 1px solid #A4FFAF;
    border-radius: 5px;
    padding: 1vh 0;
    width: 40%;
    text-align: center;
    color: #24232C;
    font-size: 1.5em;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    margin-bottom: 5vh;
}

.end-account-button:hover {
    background-color: transparent;
    color: #A4FFAF;
}
</style>