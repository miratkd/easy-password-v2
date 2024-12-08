<template>
    <div class="save-modal-container" v-on:click="closeModal()">
        <div data-test="save-modal" class="save-modal" @click.stop>
            <p class="save-modal-text">Nome do Site:</p>
            <input data-test="site-name-input" type="text" v-model="siteName" class="save-modal-input save-modal-text">
            <div data-test="save-cloud-check" class="save-modal-check-container" v-on:click="cloundSave = !cloundSave">
                <span v-if="cloundSave" class="material-icons save-modal-check-true">check_box</span>
                <span v-else class="material-icons save-modal-check-false">check_box_outline_blank</span>
                <p>Salvar nas nuvens.</p>
            </div>
            <div class="save-modal-button-container">
                <button data-test="save-password-button" class="save-modal-button"
                    v-on:click="saveClick()">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    closeModal: { required: true, type: Function },
    savePassword: { required: true, type: Function },
    callNotification: { required: true, type: Function }
})

const cloundSave = ref(true)
const siteName = ref('')

function saveClick() {
    if (siteName.value) props.savePassword(siteName.value, cloundSave.value)
    else { props.callNotification('Insira o nome do site'); }
}
</script>

<style scoped>
.save-modal-container {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.save-modal {
    background-color: #24232C;
    width: 60vw;
    max-height: 80vh;
    padding: 5vh 0 0 6vw;
    border: 1px solid #A4FFAF;
    border-radius: 10px;
}

.save-modal-text {
    color: #E6E5EA;
    font-weight: 700;
    font-size: 1.6em;
}

.save-modal-input {
    border: 0;
    border-bottom: 1px solid #A4FFAF;
    background-color: transparent;
    margin: 2vh 0;
    width: 80%;
}

.save-modal-input:focus {
    outline: 0;
}

.save-modal-check-container {
    display: flex;
    align-items: center;
    gap: 2vw;
    margin: 2vh 0;
    cursor: pointer;
    font-size: 1.2em;
    width: fit-content;
}

.save-modal-check-true {
    font-size: 1.5em;
    color: #A4FFAF;
}

.save-modal-check-false {
    font-size: 1.5em;
}

.save-modal-button-container {
    display: flex;
    justify-content: center;
    margin: 5vh 0;
    width: 80%;
}

.save-modal-button {
    background: #A4FFAF;
    border: 1px solid #A4FFAF;
    padding: 1vh 0;
    display: flex;
    justify-content: center;
    color: #24232C;
    font-size: 1.3em;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    width: 45%;
    border-radius: 5px;
}

.save-modal-button:hover {
    background-color: transparent;
    color: #A4FFAF;
}

@media (max-width: 550px) {
    .save-modal {
        width: 75vw;
        padding-left: 3vw;
    }

    .save-modal-input {
        width: 95%;
    }

    .save-modal-check-container {
        justify-content: center;
        width: unset;
    }

    .save-modal-button-container {
        width: 100%;
    }

    .save-modal-text {
        text-align: center;
    }
}
</style>