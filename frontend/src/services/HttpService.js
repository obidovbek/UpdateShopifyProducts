import axios from 'axios';

function httpService(){
    return {
        getStudent: async (passport_cridentials) => {
            try{
                console.log('passport_cridentials', passport_cridentials);
                const student = await axios.get(process.env.REACT_APP_API_URL+'/main/student', {params:passport_cridentials});
                return student.data.data.items[0] ? student.data.data.items[0] : new Error('Student topilmadi');
            }
            catch(err){
                alert(err.message)
            }    

        }
    }
}

export default httpService();