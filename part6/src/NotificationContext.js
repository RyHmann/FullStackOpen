import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch(action.type) {
      case 'VOTE':
        return `Voted for anecdote: '${action.payload.content}'`
      case 'ERROR':
        return `Error: ${action.payload}`
      case 'CLEAR':
        return ''
      default:
        return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext