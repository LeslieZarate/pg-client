import 'reflect-metadata';
import { Container } from 'typedi';
// import { Database } from './pg-client';


// const container = Container.of();
// container.set("databaseConfig", {
//     host: "localhost",
//     port: 5432,
//     database: "iambov",
//     user: "postgres",
//     password: "postgres"
// });

// const database = container.get(Database);


// (async function () {
//     await database.query('select * from role')   
//     database.end();
//   })()

import { Database , Config } from './pg-client2';

const config: Config = {
  host: "localhost",
  port: 5432,
  database: "iambov",
  user: "postgres",
  password: "postgres"
}

const container = new Map();
container.set("config", config);

container.set("database", new Database(container.get("config")));
const database = container.get("database");


(async function () {
    await database.query('select * from role')   
    database.end();
  })()