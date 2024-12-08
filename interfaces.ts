export interface user {
    "user": {
        "id": number,
        "username": string,
        "email": string
    }
}

export interface token {
    accessToken: string,
    refreshToken: string
}

export interface loginUser {
    username: string,
    password: string,
    email?: string
} 

export interface loginResp {
    message: string,
    success: boolean
}
export interface site {
    site: string,
    password: string
}
