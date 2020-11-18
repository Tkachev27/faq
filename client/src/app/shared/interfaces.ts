export interface Message {
    message: string
}
export interface User {
    email: string
    password: string
    admin: Boolean
}
export interface Question {
    _id?: string
    content?: string
    userid?: string
    categoryId?: string
    viewedNumber?: number
    date?: Date
}

export interface Answer {
    _id?: string
    content?: string
    userid?: string
    date?: Date
}

export interface Category {
    _id?: string
    name?: string
}

export interface Log {
    _id?: string
    date?: Date
    userId?: string
    action?: string
}
