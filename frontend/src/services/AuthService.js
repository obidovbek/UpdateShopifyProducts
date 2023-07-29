import axios from 'axios';
// import { useContext } from 'react';
// import { AuthContext } from 'src/context';
function authService() {

    // const {setIsAuth} = useContext(AuthContext);
    return {
        login : async (cridentials) => {
            try{
                const response = (await axios.post(process.env.REACT_APP_API_URL+'/auth/login', cridentials));
                localStorage.setItem('authToken', response.data.token);
                // setIsAuth(true);
                return response.data;
            }
            catch(e){console.log(e.message)}
        },
        autologin : async () => {
            try{
                const response = (await axios.get(process.env.REACT_APP_API_URL+'/auth/autologin', {headers: {Authorization: `Bearer ${localStorage.getItem('authToken')}`}}));
                return response.data;
            }
            catch(e){
                alert(console.log(e.message))
            }
        }
    }
    
    // logout(){
    //     localStorage.removeItem('authToken');
    // }

    // isAuthenticated(){
    //     return localStorage.getItem('authToken') !== null;
    // }
}

export default authService();