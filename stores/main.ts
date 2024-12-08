import { defineStore } from "pinia";
import { type user, type token, type loginUser, type loginResp, type site } from "~/interfaces";
import axios from 'axios';

export const useMainStore = defineStore('main', ()=>{
    const backEndUrl = ref('https://easy-password.up.railway.app/')
    const clientId = ref('YDuYI25DN7YpLwbdYhBKAnvh4koc6TsUbSPd29hU')
    const clientSecret = ref('nvHlefnciLQ285ejgt1FrJy4NXtXBeIK9lvugjH71mnAqDGs8m0ZmuRBJz2TSBaze85pd8WQwnThxCIJoTvJQM15M7S8vf6nRl2UNrIGTzmCwozUsFBepuCyLcAIvcyo')
    const accessToken = ref('')
    const refreshToken = ref('')
    const account = ref<user | undefined>(undefined)
    const isLoading = ref(false)

    function setTokens(tokens:token) {
        accessToken.value = tokens.accessToken
        localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken))
        refreshToken.value = tokens.refreshToken
        localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken))
    }

    function saveAccount(newAccount:user) { account.value = newAccount }

    function cleanAccount() {
        account.value = undefined
        accessToken.value = ''
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
    
    function setIsLoading(value:boolean) { isLoading.value = value }

    function createAccount(payload:any) {
        return axios.post(backEndUrl.value + 'account/', {payload}, {})
    }

    function login(payload:loginUser): Promise<loginResp> {
        let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: '' } }
        const params = new URLSearchParams()
        params.append('grant_type', 'password')
        params.append('username', payload.username)
        params.append('client_id', clientId.value)
        params.append('password', payload.password)
        params.append('client_secret', clientSecret.value)
        return axios.post(backEndUrl.value + 'o/token/', params, config).then(response => {
            setTokens({
                accessToken: response.data.token_type + ' ' + response.data.access_token,
                refreshToken: response.data.refresh_token
            })
            config = { headers: { 'Content-Type': '', Authorization: accessToken.value } }
            return axios.get(backEndUrl.value + 'account/me/', config).then(response => {
                saveAccount(response.data)
                return { success: true, message: '' }
            })
        }).catch(error => {
            if (error.response && error.response.data.error_description === 'Invalid credentials given.') {
                return { success: false, message: 'Senha ou usuário incorretos.' }
            } else {
                return { success: false, message: 'Desculpe, não foi possível fazer o login.' }
            }
        })
    } 

    function getMe() {
        let config = { headers: { Authorization: accessToken.value } }
        return axios.get(backEndUrl.value + 'account/me/', config)
    }

    function getRefreshToken() {
        return new Promise<void>(function (resolve, reject) {
            const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            const params = new URLSearchParams()
            params.append('grant_type', 'refresh_token')
            params.append('client_id', clientId.value)
            params.append('client_secret', clientSecret.value)
            params.append('refresh_token', refreshToken.value)
            axios.post(backEndUrl + 'o/token/', params, config).then(response => {
                setTokens( {
                    accessToken: response.data.token_type + ' ' + response.data.access_token,
                    refreshToken: response.data.refresh_token
                })
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }

    function savePassword(payload:site) {
        let config = { headers: { Authorization: accessToken.value } }
        return axios.post(backEndUrl.value + 'account/save_password/', payload, config)
    }

    function getPasswords() {
        let config = { headers: { Authorization: accessToken.value } }
        return axios.get(backEndUrl.value + 'account/passwords/', config)
    }

    return {backEndUrl, clientId, clientSecret, accessToken, refreshToken, account, isLoading, setTokens,
        saveAccount, cleanAccount, setIsLoading, createAccount, login, getMe, getRefreshToken, savePassword, getPasswords
    }
})