import Cat from "./cat"

export default interface Entry {
    cat: string
    brief: string
    image?: Object
    mime?: string
    created: Date
    modified: Date
}