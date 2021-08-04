import { OPEN, CLOSE } from './actions'

export const reducer = (state = true, action) => {
    switch (action.type) {
        case OPEN:
            return true
        case CLOSE:
            return false
        default:
            return state
    }
}