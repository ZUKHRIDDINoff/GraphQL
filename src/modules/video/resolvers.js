import { UserInputError } from 'apollo-server-express'
import { VIDEO_CONFIG } from '#config/index'
import { finished } from 'stream/promises'
import model from './model.js'
import JWT from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

export default {
    Query: {
        videos: async(_, { search}) =>  {
            const result =  await model.getVideos({
                search: search || ''} )
            console.log(result);
            return result
        },
        userVideos: async(_, { token } ) => {
            let check = JWT.verify(token, process.env.JWT_SECRET)
            let { userId } = check
            if(!userId) throw new UserInputError('Invalid Token!')
            return await model.privateVideos({
                userId
            })
        },
    },

    Mutation: {
        updateVideo: async(_, { token, videoId, newTitle  } ) => {
            let check = JWT.verify(token, process.env.JWT_SECRET)
            let { userId } = check
            if(!userId) throw new UserInputError('Invalid Token!')
            const result = await model.updateVideo({
                videoId,
                newTitle
            })
            if (result) {
                return {
                    status: 200,
                    message: "The video successfully updated!",
                    data: result
            }
        }
        },
        deleteVideo: async(_, { token, videoId } ) => {
            let check = JWT.verify(token, process.env.JWT_SECRET)
            let { userId } = check
            if(!userId) throw new UserInputError('Invalid Token!')
            const result =  await model.deleteVideo({videoId})
            if (result) {
                return {
                    status: 200,
                    message: "The video successfully deleted!",
                    data: result
            }
        }}, 

        uploadVideo : async (_, { userId, video,  videoTitle }, { agent }) => {
            const { createReadStream, filename } = await video;
            const fileName = Date.now() + filename.replace(/\s/g, '');
            videoTitle = videoTitle.trim(); 

            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', 'videos', fileName));
            createReadStream().pipe(out)
            await finished(out)
            console.log(userId);
            console.log(video);
            console.log(videoTitle);

            const result = await model.uploadVideo({ userId,  videoTitle, fileName });
            console.log(result);
            return {
                status: 200,
                message: 'Video created successfully',
                data: result
                
            }
        }
    },

    Video: {
        userId: global => global.user_id,
        videoId: global => global.video_id,
        videoName: global => global.video_title,
        videoCreatedAt: global => global.video_created_at
    }
}

