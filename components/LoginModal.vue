<template>
    <div class="login-modal-container" v-on:click="close()">
        <div class="login-modal" @click.stop>
            <h1 class="login-modal-title">Faça o login para ter acesso a todas as suas senhas.</h1>
            <div class="login-row">
                <p class="login-row-label">Usuario :</p>
                <input type="text" v-model="user" class="login-row-input">
            </div>
            <div class="login-row">
                <p class="login-row-label">Senha :</p>
                <input @keyup.enter="login()" type="password" v-model="password" class="login-row-input">
            </div>
            <div class="login-button-container">
                <button v-on:click="login()" class="login-button">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const props = defineProps({
    close: { required: true, type: Function },
    callNotification: { required: true, type: Function },
    getPasswords: { required: true, type: Function }
})

const store = useMainStore()
const user = ref('')
const password = ref('')

function login() {
    store.setIsLoading(true)
    const credentials = { username: user.value, password: password.value }
    store.login(credentials).then(resp => {
        if (resp.success) {
            props.getPasswords()
            props.close()
        } else {
            props.callNotification(resp.message)
            store.setIsLoading(false)
        }
    })
}
</script>

<style scoped>
.login-modal-container {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-modal {
    background-color: #24232C;
    width: 40vw;
    max-height: 80vh;
    padding: 5vh 6vw 0 6vw;
    border: 1px solid #A4FFAF;
    border-radius: 10px;
}

.login-account-header {
    font-weight: 700;
    text-align: center;
    font-size: 2em;
    margin-bottom: 4vh;
}

.login-row {
    display: flex;
    align-items: center;
    margin-bottom: 5vh;
}

.login-row-label {
    color: #E6E5EA;
    font-weight: 700;
    font-size: 1.3em;
    width: 30%;
}

.login-row-input {
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid #A4FFAF;
    flex: 1;
    color: #E6E5EA;
    font-weight: 700;
    font-size: 1.3em;
}

.login-row-input:focus {
    outline: none;
}

.login-button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;
}

.login-button {
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
}

.login-button:hover {
    background-color: transparent;
    color: #A4FFAF;
}

.login-modal-title {
    font-weight: 700;
    text-align: center;
    font-size: 1.8em;
    margin-bottom: 4vh;
}

@media screen and (max-width: 450px) {
    .login-modal {
        width: 80vw;
    }
}
</style>