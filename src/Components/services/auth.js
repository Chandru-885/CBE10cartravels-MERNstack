import jwt from 'jwt-decode'

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if(token){
        return true;
    }
    return false;

}

const findrole = () => {
    const token = localStorage.getItem('token');
    if(token){
        let decodedToken =  jwt(token);
        return decodedToken.role;
    }else{
        return false;
    }
}

const finduserid = () => {
    const token = localStorage.getItem('token');
    if(token){
        let decodedToken =  jwt(token);
        return decodedToken.id;
    }else{
        return false;
    }
}

const findusername = () => {
    const token = localStorage.getItem('token');
    if(token){
        let decodedToken =  jwt(token);
        return decodedToken.username;
    }else{
        return false;
    }
}

export default {isAuthenticated,findrole,finduserid,findusername};

 // console.log("decodedTokenmailid",decodedToken)