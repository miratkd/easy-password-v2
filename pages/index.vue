<template>
    <div class="page-container">
        <div class="page-card">
            <h1 class="page-title">Easy Passsword</h1>
            <div v-if="store.account" class="page-welcome-container">
                <h3 data-test="page-title" class="page-title">Bem vindo {{ store.account.user.username }}</h3>
                <span class="material-icons page-welcome-cancel" v-on:click="showEndSession = true">cancel</span>
            </div>
            <h1 v-else class="page-login-message">
                Faça <b class="page-login-message-buttons" v-on:click="showLoginModal = true">Login</b> ou <b
                    class="page-login-message-buttons" data-test="create-account-button"
                    v-on:click="showCreateAccount = true">Crie uma conta</b>
            </h1>
            <PasswordInput :callNotification="callNotification" :setPassword="getPasswordCreated"
                :password="password" />

            <PasswordConfig :savePassword="showPasswordModal" :getPasswordCreated="getPasswordCreated" />
            <PasswordCard v-for="(savedPassword, idx) in localPasswordList" :key="idx" :isLocal="true"
                :saveLocalPassword="saveLocalPassword" :password="savedPassword" :callNotification="callNotification" />
            <PasswordCard v-for="(savedPassword, idx) in cloundPasswordList" :key="idx" :password="savedPassword"
                :callNotification="callNotification" />
        </div>

        <NotificationContainer v-if="notificationText" :clearNotification="clearNotification"
            :text="notificationText" />
        <SavePasswordModal v-if="showSaveModal" :savePassword="savePassword" :closeModal="closeSaveModal"
            :callNotification="callNotification" />
        <CreateAccountModal v-if="showCreateAccount" :closeModal="closeCreateModal"
            :saveFirstPassword="saveFirstPassword" :callNotification="callNotification" />
        <EndSessionModal v-if="showEndSession" :close="closeEndSession" :action="endSession" />
        <Loader v-if="store.isLoading" />
        <LoginModal v-if="showLoginModal" :getPasswords="getPasswords" :close="() => showLoginModal = false"
            :callNotification="callNotification" />
    </div>
</template>


<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import { type site } from '~/interfaces';

const store = useMainStore()
const notificationText = ref('')
const password = ref('')
const showSaveModal = ref(false)
const localPasswordList = ref<site[]>([])
const cloundPasswordList = ref<site[]>([])
const showCreateAccount = ref(false)
const showEndSession = ref(false)
const siteName = ref<string>('')
const showLoginModal = ref(false)



onMounted(() => {
    if (localStorage.getItem('localPasswordList')) localPasswordList.value = JSON.parse(localStorage.getItem('localPasswordList')!)
    store.accessToken = JSON.parse(localStorage.getItem('accessToken')!)
    store.refreshToken = JSON.parse(localStorage.getItem('refreshToken')!)
    if (store.accessToken) {
        getMe()
    } else store.setIsLoading(false)
})

function saveLocalPassword(newPassword: site): void {
    if (store.account) {
        store.setIsLoading(true)
        store.savePassword({
            site: newPassword.site,
            password: newPassword.password
        }).then(() => {
            removePasswordFromLocal(newPassword)
            getPasswords()
        })
    } else {
        siteName.value = newPassword.site
        password.value = newPassword.password
        showCreateAccount.value = true
    }
}

function removePasswordFromLocal(newPassword: site): void {
    let newLocalList: site[] = []
    localPasswordList.value.forEach((element: site) => {
        if (element.site != newPassword.site || element.password != newPassword.password) {
            newLocalList.push(element)
        }
    })
    localPasswordList.value = newLocalList
    localStorage.setItem('localPasswordList', JSON.stringify(localPasswordList));
}

function getPasswords(): void {
    store.getPasswords().then((resp: any) => {
        cloundPasswordList.value = resp.data
    }).catch((error: any) => {
        console.log(error);
    })
    store.setIsLoading(false)
}

function endSession(): void {
    store.cleanAccount()
    cloundPasswordList.value = []
    localPasswordList.value = []
    closeEndSession()
}

function closeEndSession(): void { showEndSession.value = false }

function getMe(): void {
    store.getMe().then((resp: any) => {
        store.saveAccount(resp.data)
        getPasswords()
    }).catch(() => {
        store.getRefreshToken().then(() => {
            store.getMe().then((resp: any) => {
                store.saveAccount(resp.data)
                getPasswords()
            })
        })
    })
}
function callNotification(text: string): void { notificationText.value = text }
function clearNotification(): void { notificationText.value = '' }
function getPasswordCreated(value: string): void { password.value = value }


function showPasswordModal(): void {
    if (password.value) showSaveModal.value = true
    else callNotification('Por favor insira uma senha.')
}
function closeSaveModal(): void { showSaveModal.value = false }
function closeCreateModal(): void { showCreateAccount.value = false }

function saveFirstPassword(): void {
    if (!siteName.value) {
        store.setIsLoading(false)
        showCreateAccount.value = false
        return
    }
    store.savePassword({
        site: siteName.value,
        password: password.value
    }).then(() => {
        getPasswords()
        removePasswordFromLocal({ site: siteName.value, password: password.value })
        showCreateAccount.value = false
        siteName.value = ''
    })
}
function savePassword(newSiteName: string, saveOnClound: boolean): void {
    if (saveOnClound && !store.account) {
        siteName.value = newSiteName
        showCreateAccount.value = true
    } else if (saveOnClound) {
        store.setIsLoading(true)
        store.savePassword({
            site: newSiteName,
            password: password.value
        }).then(() => {
            getPasswords()
        })
    } else {
        localPasswordList.value.push({ site: newSiteName, password: password.value })
        localStorage.setItem('localPasswordList', JSON.stringify(localPasswordList.value));
    }
    closeSaveModal()
}

</script>


<style>
body {
    background-color: #18171F;
    color: #E6E5EA;
    margin: 0;
}

div {
    font-family: 'JetBrains Mono';
    font-style: normal;
}

p {
    margin: 0;
}

span {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-size: 1vw;
}

.page-card {
    width: 50vw;
    margin-top: 6vh;
}

.page-title {
    font-weight: 700;
    text-align: center;
    color: #817D92;
    font-size: 2.2em;
    margin: 0;
}

.page-login-message {
    font-weight: 500;
    text-align: center;
    color: #817D92;
    font-size: 2.2em;
}

.page-welcome-cancel {
    font-size: 2.5em;
    color: #817D92;
    cursor: pointer;
}

.page-welcome-cancel:hover {
    color: #FB7C58;
}

.page-welcome-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
    margin-top: 1vh;
}

.page-login-message-buttons {
    font-weight: 900;
    cursor: pointer;
}

.page-login-message-buttons:hover {
    color: lightgray;
    text-decoration: underline;
}

@media screen and (max-width: 850px) {
    .page-card {
        width: 75vw;
        margin-top: 5vw;

    }

    .page-container {
        font-size: 2vw;
    }
}

@media screen and (max-width: 450px) {
    .page-card {
        width: 80vw;
        margin-top: 5vw;
    }

    .page-container {
        font-size: 3vw;
    }
}
</style>