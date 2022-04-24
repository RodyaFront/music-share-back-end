import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from 'config'
import mainRouters from "./routes/main.routes.js"
import cors from 'cors'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors())

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(mainRouters)
app.get('/', (req, res) => {
    res.status(404).sendFile(__dirname + '/index.html')
})
app.get('*', (req,res) => {
    res.status(404).sendFile(__dirname + '/error404.html')
})

async function start() {
    try {
        await mongoose.connect(config.get('MONGO_URI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
       app.listen(process.env.PORT || 5000, () => {
            console.log(`
            Server has starter on   [ http://localhost:${config.get('port')} ]
                                    [ http://192.168.0.103:${config.get('port')} ]
            `)
        })
    }catch (e) {
        console.error('Server error:',e)
        process.exit(1)
    }
}

start()