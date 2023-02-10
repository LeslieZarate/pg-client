import { Inject, Service } from "typedi";
import { Pool, Client } from "pg";

type Config = {
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

    constructor(
        @Inject("databaseConfig") private databaseConfig: {
            host: string;
            port: number;
            database: string;
            user: string;
            password: string;
            
        }) {
        this.pool = new Pool({
            host: this.databaseConfig.host,
            port: this.databaseConfig.port,
            database: this.databaseConfig.database,
            user: this.databaseConfig.user,
            password: this.databaseConfig.password
        });
    }


    async connect() {
        this.pool.connect((err) => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        })
    }

    async query(query: string, params?: any[]) {

        try {
            const client = await this.pool.connect();            
            const result = await client.query(query, params ? params : []);
            console.log(result);
            client.release();
            return result;
        } catch (error) {

        }

    }


    query2(sql: string, params?: never | object[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params ? params : [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    end() {
        this.pool.end()
    }
}





