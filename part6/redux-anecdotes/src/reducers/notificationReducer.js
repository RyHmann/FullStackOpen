import { createSlice } from "@reduxjs/toolkit"

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {

        addNotification(state, action) {
            return `You voted for '${action.payload}'`
        },

        clearNotifications(state, action) {
            console.log('clearing')
            return ''
        }
    }
})

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(addNotification(message))
        setTimeout(() => dispatch(clearNotifications()), time * 1000)
    }
}

export const { addNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer