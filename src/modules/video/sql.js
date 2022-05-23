const GET_VIDEOS = `
    select
        user_id,
        video_id,
        video_title,
        video_created_at
    from videos
    where 
        video_title ilike concat('%',$1::varchar,'%')
        `

const PRIVATE_VIDEOS = `
    select
        user_id,
        video_id,
        video_title,
        video_created_at
    from videos
    where user_id = $1
`
const UPDATE_VIDEO = `
    UPDATE videos 
    SET video_title = $2
    WHERE video_id = $1
    returning *
`
const DELETE_VIDEO = `
    DELETE FROM videos
    WHERE video_id = $1
    RETURNING *
`
const UPLOAD_VIDEO = `
    insert into videos
    (user_id, video_title, video_link) values
    ($1, $2, $3)
    returning *
`



export default {
    GET_VIDEOS,
    PRIVATE_VIDEOS,
    UPDATE_VIDEO,
    DELETE_VIDEO,
    UPLOAD_VIDEO
}