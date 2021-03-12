import { ADD, REDUCE, REMOVE } from "./actionTypes";

export function add(key) {
    return { type: ADD, id: key }
}
export function reduce(key) {
    return { type: REDUCE, id: key }
}
export function remove(key) {
    return { type: REMOVE, id: key }
}