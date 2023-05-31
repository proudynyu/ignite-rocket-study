export class Database {
    private database: Record<string, unknown[]> = {}

    public select(table: string) {
        return this.database[table] ?? []
    }

    public insert(table: string, data: unknown) {
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }

        return data
    }
}
