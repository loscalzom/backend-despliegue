import pool from "../config/mysql.config.js";

class UserRepository{
   
    async createUser({ username, email, password, verificationToken }) {
        
        if (username === undefined || email === undefined || password === undefined || verificationToken === undefined) {
            throw new Error("Uno de los parámetros es undefined")
        }
    
           
        const queryStr = `
            INSERT INTO USERS (username, email, password, verificationToken)
            VALUES (?, ?, ?, ?)
        `
    
        const [result, fields] = await pool.execute(
            queryStr,
            [username, email, password, verificationToken]
        )
        console.log("Resultado de la inserción en la base de datos:", result)
        console.log("ID insertado:", result.insertId)
    
        return {
            _id: result.insertId,
            username, 
            email
        }
    }

    async findUserByEmail (email){
        const queryStr = `SELECT * FROM USERS WHERE email = ?`
        const [result] = await pool.execute(queryStr, [email])
        return result[0] || null
    }
    async findById(id){
        const queryStr = `SELECT * FROM USERS WHERE _id = ?`
        const [result] = await pool.execute(queryStr, [id])
        return result[0] || null
    }

    async verifyUser( user_id ){
        const queryStr = `
        UPDATE USERS
        SET verified = 1
        WHERE _id = ?
        `
        await pool.execute(queryStr, [user_id])
    }

    async updateUserPassword(email, newPassword) {
        const queryStr = `
            UPDATE USERS
            SET password = ?
            WHERE email = ?
        `;
        const [result] = await pool.execute(queryStr, [newPassword, email]);
        console.log('Update result:', result);
        return result;
    }

    async updateUserVerificationToken(userId, verificationToken) {
        const queryStr = `
            UPDATE USERS
            SET verificationToken = ?
            WHERE _id = ?
        `;
        const [result] = await pool.execute(queryStr, [verificationToken, userId]);
        console.log('Update result:', result);
        return result;
    }



}




export default new UserRepository()