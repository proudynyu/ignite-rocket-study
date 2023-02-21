import { DataSource } from 'typeorm'

export const connection = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/cars/model/*.ts"],
})

connection.initialize()