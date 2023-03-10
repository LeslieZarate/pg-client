import { Service } from "typedi";
import { Pool } from "pg";

export type Config = {
    user: string
    host: string,
    database: string,
    password: string,
    port: number,
    connectionTimeoutMillis?: number
    idleTimeoutMillis?: number
    max?: number
    allowExitOnIdle?: boolean
}


@Service()
export class Database {
    private pool: Pool;

    constructor(config: Config) {
        this.pool = new Pool(config);
    }

    public async connect() {
        try {
            await this.pool.connect();
            console.log('Successfully connected to the database.');
            return true
        } catch (error) {
            console.error(`Error connecting to the database: ${error}`);
            return false
        }
    }

    public async disconnect() {
        try {
            await this.pool.end();
            console.log('Successfully disconnected from the database.');
        } catch (error) {
            console.error(`Error disconnecting from the database: ${error}`);
        }
    }


    async query(query: string, params?: any[]) {
        try {
            const client = await this.pool.connect();
            const result = await client.query(query, params ? params : []);           
            client.release();
            return result;
        } catch (error) {
            throw error
        }

    }    
}





