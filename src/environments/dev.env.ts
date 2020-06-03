import {Environment} from './env';

export const DevEnvironment : Environment = {
    db_url: 'mongodb://tarun:tarungood@cluster0-shard-00-00-2vnpn.mongodb.net:27017,cluster0-shard-00-01-2vnpn.mongodb.net:27017,cluster0-shard-00-02-2vnpn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    jwt_secret: 'secret'
};
