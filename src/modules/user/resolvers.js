import { finished } from 'stream/promises'
import model from './model.js'
import JWT from 'jsonwebtoken'
import sha256 from 'sha256'
import path from 'path'
import fs from 'fs'


export default {
    Query: {
        users: async() =>  {
            return await model.getUsers()
        },
        user: async(_, args) => {
            return await model.getUser(args)
        } 
    }, 

    Mutation: {
        login: async(_, { username, password }) => {
            username = username.trim()
            password = password.trim()
            password = sha256(password)

            const result = await model.login({ username, password })


            if (result) {
                return {
                    status: 200,
                    message: "The user successfully logged in!",
                    data: result,
                    token: JWT.sign(
                        { userId: result.user_id},
                        process.env.JWT_SECRET
                    )}

            }
            throw new Error("Invalid username or password!")
        },

        register: async (_, { username, password, profile }, { agent }) => {
            console.log(agent);
            const { createReadStream, filename } = await profile;
            const fileName = Date.now() + filename.replace(/\s/g, '');
            username = username.trim();
            password = password.trim(); 

            const user = await model.getUser({ username });
            if (user) {
                throw new Error('Username already exists');
            }

            password = sha256(password);
            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', 'images', fileName));
            createReadStream().pipe(out)
            await finished(out)

            const result = await model.register({ username, password, fileName });
            return {
                status: 201,
                message: 'User created successfully',
                data: result,
                token: JWT.sign({
                    userId: result.user_id
                },process.env.JWT_SECRET),
            }
        }
        },

    User: {
        userId: global => global.user_id,
        username: global => global.user_name,
        userPassword: global => global.user_password,
        userImage: global => global.user_image
        
    }
}
