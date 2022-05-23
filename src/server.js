import {
    ApolloServer
} from 'apollo-server-express'
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import express from 'express'
import http from 'http'
import '#config/index'
import bodyParser from 'body-parser'
import schema from './modules/index.js'
import path from 'path'

import { graphqlUploadExpress } from 'graphql-upload';

!async function () {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const httpServer = http.createServer(app)
    app.use(graphqlUploadExpress({ maxFileSize: 50000000}));
    app.use(express.static(path.join(process.cwd(), 'uploads')));
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        introspection: true,

        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer})
        // ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    })
    await server.start()
    server.applyMiddleware({
        app
    })
    await new Promise(resolve => httpServer.listen({
        port: 4000
    }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}()

