import sql, { ConnectionPool } from 'mssql';
import { sqlConfig } from './config';

export default async function GetConnection(): Promise<ConnectionPool> {
    try {
        const connection = await sql.connect(sqlConfig);
        return connection;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
