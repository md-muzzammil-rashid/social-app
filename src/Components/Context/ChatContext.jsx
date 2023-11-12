import { createContext, useContext, useReducer } from "react";
import { UserContext } from "./UserContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) =>{
    const INITIAL_STATE = {
        chatID : null,
        user:{}
    }
    const {currentUser}=useContext(UserContext)
    const chatReducer = (state, action)=>{
        switch(action.type){
            case "CHANGE_USER" : return({
                user:action.payload,
                userID : currentUser.uid>action.payload.uid ? currentUser.uid+"COM"+action.payload.uid : action.payload.uid+"COM"+currentUser.uid
            })
        }

    }
    const [state, dispatch]=useReducer(chatReducer, INITIAL_STATE)


    return(
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}