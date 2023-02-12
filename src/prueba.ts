// import 'reflect-metadata';
// import { Container } from 'typedi';
// // import { Database } from './pg-client';


// // const container = Container.of();
// // container.set("databaseConfig", {
// //     host: "localhost",
// //     port: 5432,
// //     database: "iambov",
// //     user: "postgres",
// //     password: "postgres"
// // });

// // const database = container.get(Database);


// // (async function () {
// //     await database.query('select * from role')   
// //     database.end();
// //   })()

// import { Database , Config } from './pg-client2';

// const config: Config = {
//   host: "localhost",
//   port: 5432,
//   database: "iambov",
//   user: "postgres",
//   password: "postgres"
// }

// const container = new Map();
// container.set("config", config);

// container.set("database", new Database(container.get("config")));
// const database = container.get("database");


// (async function () {
//     await database.query('select * from role')   
//     database.end();
//   })()



// import { Client } from "pg";

// export interface DatabaseHealthCheck {
//   check(): Promise<void>;
// }

// export class Database implements DatabaseHealthCheck {
//   private client: Client;

//   constructor(config: any) {
//     this.client = new Client(config);
//   }

//   async check(): Promise<void> {
//     await this.client.connect();
//     const result = await this.client.query("SELECT 1");
//     this.client.end();
//     if (result.rowCount !== 1) {
//       throw new Error("Health check failed");
//     }
//   }
// }