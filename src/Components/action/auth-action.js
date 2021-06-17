import AuthService from '../services/auth'
import authHeader from '../services/auth-header';
export const USER_LOGIN = "USER_LOGIN"

export const login = (status) => {
    console.log('In auth action: ', status)
    if(!status){
        console.log('Removing token ****************** ')
        var current_user = AuthService.finduserid();
        var current_user_id;
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/AllUsersLog/'+current_user,{
            headers: authHeader()
        })
        .then(data =>data.json())
        .then(res=>{
            console.log("response",res);
            current_user_id =  res[res.length - 1]._id
            console.log("userlog",current_user_id)
            fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/AllUsersLog/'+current_user_id, {
                method: 'PATCH',
                headers:authHeader(),
                body: JSON.stringify({loggedoutAt : new Date().toLocaleString(), status : "OUT"}),
            })
            .then(res=>{
                console.log(res.status);
                if(res.status === 200){
                    console.log("logout successful")
                    localStorage.removeItem('token');
                }
            })
        })
    }
    return {
        type: USER_LOGIN,
        payload: status
    }
}

export const userLogin = (user) => {
    console.log('____USER LOGIN ______ function')

    return dispatch => {
        return fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/signedupuserdetails/loginuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
            .then(data =>data.json())
            .then(res=>{
                console.log(res);
                if(res.success === true){ 
                    // if(!localStorage.getItem('token')){
                        localStorage.setItem('token', res.token);
                        alert("Successfully Logged in ✔")
                        var current_user = AuthService.finduserid()
                        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/AllUsersLog',{
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({user : current_user, loggedinAt : new Date().toLocaleString(), status : "IN"}),
                        })
                        .then(data =>data.json())
                        .then(response=>{
                            console.log(response);
                        })
                        dispatch(login(res.success));
                }else{
                    alert("Username/Password incorrect ❌\nor\nAfter Signup Please Login ☺")
                }
            })
    }
}
