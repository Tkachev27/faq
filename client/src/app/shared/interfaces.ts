export interface Message {
    message: string
}
export interface User {
    email: string
    password: string
    admin: Boolean
}
export interface SubsoilUser {
    _id?: string
    name?: string
    adress?: string
    // userId?: string
}
