const initState = null;

export const UserReducer=(state=initState,action)=>{
    switch(action.type){
        case "USER":{
            return action.payload
        }
        case "ALL":{
            if(localStorage.getItem("jwt")){
                return JSON.parse(localStorage.getItem("user"))
            }
            else{
                return state;
            }
        }
        case "LOGOUT":{
            return null
        }
        default: return state;
    }
}