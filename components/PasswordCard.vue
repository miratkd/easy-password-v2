<template>
    <div data-test="password-card-container" class="password-card-container">
        <span v-if="isLocal" data-test="local-alert" v-on:click="saveLocalPassword(password)"
            class="material-icons password-card-alert-icon" :title="localPasswordMessage">error_outline</span>
        <div style="display: flex; gap: 1vw; align-items: center;">
            <p class="password-card-input-label">Site:</p>
            <input data-test="password-card-input-name" class="password-card-input password-card-input-label"
                type="text" disabled :value="password.site">
        </div>
        <div style="display: flex; gap: 1vw; align-items: center;">
            <p class="password-card-input-label">Senha:</p>
            <input data-test="password-card-input-value"
                class="password-card-input password-card-input-label password-card-password-input" :type="getType()"
                readonly :value="password.password">
            <span data-test="hide-password" v-if="showPassword" class="material-icons password-card-show-icon"
                style="color: #A4FFAF" v-on:click="showPassword = !showPassword">visibility</span>
            <span data-test="show-password" v-else class="material-icons password-card-show-icon" style="color: gray"
                v-on:click="showPassword = !showPassword">visibility_off</span>
            <span class="material-icons password-card-copy-icon" v-on:click="copyToClipboard()">content_copy</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { site } from '~/interfaces';

const props = defineProps({
    password: {
        required: true,
        type: Object as () => site
    },
    callNotification: {
        required: true,
        type: Function
    },
    isLocal: Boolean,
    saveLocalPassword: Function
})

const showPassword = ref(false)
const localPasswordMessage = ref('Esta senha esta salva apenas nesse dispositivo (nootebook, tablet, celular...), clique aqui para salvar esta senha nas nuvens e ter acesso a ela em outros dispositivos.')

function getType() {
    if (showPassword.value) return 'text'
    return 'password'
}
function copyToClipboard() {
    navigator.clipboard.writeText(props.password.password)
    props.callNotification('Texto copiado.')
}
</script>

<style scoped>
.password-card-container {
    background-color: #24232C;
    padding: 1.5vh 2vw;
    margin: 3vh 0;
}

.password-card-alert-icon {
    font-size: 1.6em;
    color: #F8CD65;
    margin-left: 95%;
    cursor: pointer;
}

.password-card-input-label {
    color: #E6E5EA;
    font-weight: 700;
    font-size: 1.3em;
}

.password-card-input {
    border: 0;
    border-bottom: 1px solid #A4FFAF;
    background-color: transparent;
    margin: 2vh 0;
    width: 80%;
}

.password-card-input:focus {
    outline: 0;
}

.password-card-password-input {
    width: 70%;
}

.password-card-copy-icon {
    cursor: pointer;
    font-size: 1.6em;
    color: #A4FFAF;
}

.password-card-show-icon {
    cursor: pointer;
    font-size: 1.6em;
    margin-left: auto;
}

@media screen and (max-width: 800px) {
    .password-card-copy-icon {
        display: none;
    }
}
</style>