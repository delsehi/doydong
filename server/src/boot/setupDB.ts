import { createConnection } from 'typeorm'
import "reflect-metadata"

const createConnectionToDB = async () => {
    await createConnection({
        type: "postgres",
        database: process.env.TYPEORM_DATABASE,
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT || '5432'),
        synchronize: true,
        entities: ["src/entity/**/*.{js,ts}", "./build/src/entity/**/*.js"]
    })
}

export { createConnectionToDB }