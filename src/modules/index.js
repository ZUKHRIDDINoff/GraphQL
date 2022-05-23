import { makeExecutableSchema } from "@graphql-tools/schema"

import UserModule from './user/index.js'
import VideoModule from './video/index.js'
import TypesModule from './types/index.js'


export default  makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
        VideoModule.typeDefs,
        TypesModule.typeDefs,
    ],
    resolvers: [
        UserModule.resolvers,
        VideoModule.resolvers,
        TypesModule.resolvers,
    ]
})
