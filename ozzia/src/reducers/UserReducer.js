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
        case 'UPDATEPIC':{
            return{
                ...state,
                photo: action.payload
            }
        }
        case 'UPDATE':{
            return{
                ...state,
                followers:action.payload.followers,
                following:action.payload.following
            }
        }
        case "LOGOUT":{
            return null
        }
        default: return state;
    }
}