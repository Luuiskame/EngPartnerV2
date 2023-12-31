const { db } = require('../firebase-confing');
const {API_URL}=require('../firebase-confing');
const postNewUser = async (req, res) => {
    
  try {
        
        const { uid,mail, name, lastname, age, isVip,sex,country, user, language, languageRead, rooms, visitingUsers } = req.body;
        const { data } = await axios(`${API_URL}/getcountries`);
        const cca2 = data.find((coun) => coun.country === country)?.cca2;
        
        const result = await createUser(uid,mail,name, lastname, age, isVip,sex,country, user, language, languageRead, rooms,cca2, visitingUsers);

        res.status(200).json(result)
    } catch (error) {
        res.status(404).send('faltan requisitos')
    }
}

const createUser= async (uid,mail, name,lastname, age, isVip,sex,country, user, language, languageRead, rooms,cca2, visitingUsers)=>{

    try {
        const newUser= await db.collection('users').add({
            uid,
            mail,
            name, 
            lastname, 
            age, 
            isVip,
            sex,
            country,
            user,
            language,
            languageRead,
            timestamp: new Date(),
            rooms,
            cca2,
            visitingUsers
        })
        return  newUser
        
    } catch (error) {
        console.error('Error sending user:', error);
        return { success: false, error: 'Error sending user' };
    }
}

module.exports=postNewUser;