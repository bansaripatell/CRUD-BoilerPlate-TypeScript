import config from 'config';
import { DbConfig } from '../interface/db.interface';
import mysql from 'mysql';


const { connectionLimit, host, user, password, database }: DbConfig = config.get('dbConfig');
export default () => {
    return mysql.createPool({
        connectionLimit: connectionLimit,
        host: host,
        user: user,
        password: password,
        database: database}

    );
};
