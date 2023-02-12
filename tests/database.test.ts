import { Container } from 'typedi';
import { Database } from '../src/pg-client.v2';

describe('Test database connection', () => {
    let container;

    beforeAll(() => {
        container = Container.of();
        container.set("databaseConfig", {
            host: "localhost",
            port: 5432,
            database: "iambov",
            user: "postgres",
            password: "postgres"
        })
        container.set("database", new Database(container.get("databaseConfig"))); 

    });  

    it("Should connect to the database successfully", async () => {
        const database = container.get("database");
        const result = await database.connect();
        expect(result).toBeTruthy();
    });  
   
    it('Should query to the database successfully', async () => {          
        const database = container.get("database");
        const result = await database.query('SELECT * FROM role WHERE id = $1', [1]);   
        expect(result).toBeDefined();
    });   

});