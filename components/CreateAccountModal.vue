<template>
    <div class="create-modal-container" v-on:click="closeModal()">
        <div data-test="create-account-modal" class="create-modal" @click.stop>
            <h1 class="create-account-header">Para poder salvar suas senhas, por favor crie uma conta.</h1>
            <div class="create-account-form-row">
                <p class="create-account-input-label">Usuário :</p>
                <div class="create-account-input-container">
                    <input type="text" data-test="user-name-input" class="create-account-input"
                        :class="checkMessage(userMessage)" v-model="newUser">
                    <p data-test="user-message">{{ userMessage }}</p>
                </div>
            </div>
            <div class="create-account-form-row">
                <p class="create-account-input-label">Email :</p>
                <div class="create-account-input-container">
                    <input type="email" data-test="user-email-input" class="create-account-input" v-model="email"
                        :class="checkMessage(emailMessage)">
                    <p data-test="email-message">{{ emailMessage }}</p>
                </div>
            </div>
            <div class="create-account-form-row">
                <p class="create-account-input-label">Senha :</p>
                <div class="create-account-input-container">
                    <input type="password" data-test="user-password1-input" class="create-account-input"
                        v-model="password" :class="checkMessage(passwordMessage)">
                    <p data-test="password-message">{{ passwordMessage }}</p>
                </div>
            </div>
            <div class="create-account-form-row">
                <p class="create-account-input-label">Confirmar senha :</p>
                <div class="create-account-input-container">
                    <input type="password" @keyup.enter="createAccount()" data-test="user-password2-input" class="create-account-input"
                        v-model="checkPassword" :class="checkMessage(checkPasswordMessage)">
                    <p data-test="check-password-message">{{ checkPasswordMessage }}</p>
                </div>
            </div>
            <div class="create-account-button-container">
                <button data-test="modal-create-account-button" class="create-account-button"
                    v-on:click="createAccount()">Criar conta</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { loginUser } from '~/interfaces';
import { useMainStore } from '~/stores/main'

const props = defineProps({
    closeModal: { required: true, type: Function },
    saveFirstPassword: { required: true, type: Function },
    callNotification: { required: true, type: Function }
})
const store = useMainStore()
const email = ref('')
const emailMessage = ref('')
const password = ref('')
const passwordMessage = ref('')
const checkPassword = ref('')
const checkPasswordMessage = ref('')
const newUser = ref('')
const userMessage = ref('')

function createAccount() {
    emailMessage.value = ''
    userMessage.value = ""
    passwordMessage.value = ""
    checkPasswordMessage.value = ''
    if (!newUser.value) userMessage.value = 'Campo obrigatório.'
    if (!email.value) emailMessage.value = 'Campo obrigatório.'
    if (!password.value) passwordMessage.value = 'Campo obrigatório.'
    if (!checkPassword.value) checkPasswordMessage.value = 'Campo obrigatório.'
    if (!newUser.value || !email.value || !password.value || !checkPassword.value) return
    if (password.value != checkPassword.value) {
        checkPasswordMessage.value = 'As senhas não estão iguais.'
        return
    }
    const credentials = {
        username: newUser.value,
        email: email.value,
        password: password.value
    }
    store.setIsLoading(true)
    store.createAccount(credentials).then(() => {
        store.login(credentials).then(resp => {
            if (resp.success) {
                props.callNotification('Conta criada com sucesso')
                props.saveFirstPassword()
            } else {
                props.callNotification(resp.message)
                store.setIsLoading(false)
            }
        })
    }).catch(error => {
        if (error.response.status == 400) {
            if (error.response.data.user.username) userMessage.value = error.response.data.user.username[0]
            if (error.response.data.user.password) passwordMessage.value = error.response.data.user.password[0]
            if (error.response.data.user.email) emailMessage.value = error.response.data.user.email[0]
        }
        store.setIsLoading(false)
    })
}
function checkMessage(message: string) {
    if (message) return 'create-account-input-error'
}
</script>

<style scoped>
.create-modal-container {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.create-modal {
    background-color: #24232C;
    width: 50vw;
    max-height: 80vh;
    padding: 5vh 6vw 0 6vw;
    border: 1px solid #A4FFAF;
    border-radius: 10px;
}

.create-account-header {
    font-weight: 700;
    text-align: center;
    font-size: 2em;
    margin-bottom: 4vh;
}

.create-account-form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4vh;
}

.create-account-input-label {
    color: #E6E5EA;
    font-weight: 700;
    font-size: 1.3em;
    padding-right: 2vw;
}

.create-account-input-container {
    max-width: 70%;
    flex: 1;
}

.create-account-input {
    border: 0;
    background-color: transparent;
    border-bottom: 1px solid #A4FFAF;
    width: 100%;
    color: #E6E5EA;
    font-weight: 700;
    font-size: 1.2em;
}

.create-account-input-error {
    border-bottom: 1px solid #FB7C58;
}

.create-account-input:focus {
    outline: 0;
}

.create-account-button-container {
    display: flex;
    justify-content: center;
    margin: 5vh 0;
}

.create-account-button {
    background: #A4FFAF;
    border: 1px solid #A4FFAF;
    border-radius: 5px;
    padding: 1vh 0;
    width: 50%;
    text-align: center;
    color: #24232C;
    font-size: 1.2em;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
}

.create-account-button:hover {
    background-color: transparent;
    color: #A4FFAF;
}

@media screen and (max-width: 450px) {
    .create-modal {
        width: 80vw;
    }
}
</style>