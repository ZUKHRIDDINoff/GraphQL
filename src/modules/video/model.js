import db from '#pg'
import query from './sql.js'


async function getVideos ({ search }) {
    return await db(
        query.GET_VIDEOS, 
        search

    )
}
async function privateVideos ({userId}) {
    return await db(
        query.PRIVATE_VIDEOS,
        userId
        )
    }
    
async function updateVideo ({ videoId, newTitle }) {
    const [ video ] =  await db(
        query.UPDATE_VIDEO, 
        +videoId, 
        newTitle
    )
    return video
}
async function deleteVideo ({ videoId }) {
    const [ video ] = await db(
        query.DELETE_VIDEO, 
        +videoId
    )
    console.log(video);
    return video
}

async function uploadVideo ({ userId, videoTitle, fileName }) {
    const [ newVideo ] = await db(
        query.UPLOAD_VIDEO, 
        userId, videoTitle, fileName
    )
    return newVideo
}


export default {
    getVideos,
    privateVideos,
    updateVideo,
    deleteVideo,
    uploadVideo
}