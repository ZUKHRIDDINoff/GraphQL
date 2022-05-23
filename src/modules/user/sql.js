const GET_USERS = `
    select
        user_id,
        user_name,
        user_password,
        user_image
    from users
`

const GET_USER = `
    select
        user_id,
        user_name,
        user_password,
        user_image
    from users
    where user_id = $1;
`

const LOGIN = `
    select 
    user_id,
    user_name, 
    user_password,
    user_image
    from users 
    where user_name = $1 and user_password = $2;
`

const REGISTER = `
    insert into users 
    (user_name, user_password, user_image) values 
    ($1,$2,$3)
    returning *
`

export default {
    GET_USERS, 
    GET_USER,
    LOGIN,
    REGISTER
}