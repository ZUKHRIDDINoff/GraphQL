import db from '#pg'
import query from './sql.js'


async function getUsers() {
    return await db(
        query.GET_USERS
    )
}

async function getUser ({ userId }) {
    const [user] = await db(query.GET_USER, userId)
    return user
}

async function login ({ username, password }) {
    const [ user ] = await db(query.LOGIN, username, password)
    return user
}

async function register ( {username, password, fileName} ) {
    let user_name = username
    let user_image = fileName
    const [ user ] = await db(query.REGISTER, user_name, password, user_image)
    return user
}



export default {
    getUsers, 
    getUser,
    login,
    register
}