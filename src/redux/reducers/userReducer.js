import { GOOGLE_LOGIN_FAILED, GOOGLE_LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT_START, LOGOUT_SUCCESS, REGISTER_FAILED, REGISTER_START, REGISTER_SUCCESS, SET_USER, SET_USER_DATA,SET_GRAPH_DATA} from "../actions/actionTypes";

const intialState={
    loading:false,
    user:null,
    leetcode:null,
    error:null,
    leetcode:"",
    gfg:"",
    codeforces:"",
    codechef:"",
    collegeName:"",
    selectedDate:{day:1,month:1,year:2021}
}

export const userReducer=(state=intialState,action)=>{
    switch(action.type)
    {
        case REGISTER_START:
        case LOGIN_START:
            return {...state,loading:true}
        case GOOGLE_LOGIN_SUCCESS:
        case REGISTER_SUCCESS:        
        case LOGIN_SUCCESS:
            return {...state,loading:false,user:action.payload} 
        case LOGIN_FAILED:
            return {...state,loading:false}
        case GOOGLE_LOGIN_FAILED:
        case REGISTER_FAILED:  
            return {...state,loading:false,error:action.payload} 
        case LOGOUT_START:
            return {...state,loading:true}
        case LOGOUT_SUCCESS:
            return {loading:false,user:null,leetcode:null,error:null,graphData:[]}  
        case LOGIN_FAILED:
            return {...state,error:action.payload}  
        case SET_USER:
            return {...state,user:action.payload,loading:false} 
        case SET_USER_DATA:
            return {...state,codechef:action.payload.codechef,codeforces:action.payload.codeforces,leetcode:action.payload.leetcode,collegeName:action.payload.collegeName,gfg:action.payload.gfg,total:0}
        case SET_GRAPH_DATA:
            return {...state,graphData:action.payload} 
        case "changeDate":
            // console.log("in reducer",action.payload);
            return {...state,selectedDate:action.payload}                       
        default:
            return state;
    }
}
