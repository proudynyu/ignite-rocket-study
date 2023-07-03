import fs from "node:fs/promises";
import { resolve } from "node:path";

const databasePath = resolve("src", "database", "db.json");

export class Database {
    private database: Record<string, unknown[]> = {};

    constructor() {
        fs.readFile(databasePath, "utf-8")
            .then((data) => {
                this.database = JSON.parse(data);
            })
            .catch(() => {
                this.persist();
            });
    }

    private persist() {
        fs.writeFile(databasePath, JSON.stringify(this.database));
    }

    public select(table: string) {
        return this.database[table] ?? [];
    }

    public insert(table: string, data: unknown) {
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data);
        } else {
            this.database[table] = [data];
        }

        this.persist();

        return data;
    }

    public delete(table: string, id: string): void {
        // @ts-ignore: Unreachable code error
        const rowIndex = this.database[table].findIndex((row) => row.id === id);

        if (rowIndex > -1) {
            this.database[table].splice(rowIndex, 1);
            this.persist();
        }
    }

    public update(table: string, id: string, data: User): void {
        // @ts-ignore: Unreachable code error
        const rowIndex = this.database[table].findIndex((row) => row.id === id);

        if (rowIndex > -1) {
            this.database[table][rowIndex] = { id, ...data };
            this.persist();
        }
    }
}

export const database = new Database();
