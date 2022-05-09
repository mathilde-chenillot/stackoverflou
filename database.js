import mongoose from 'mongoose';

const database = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connection to mongoDB successful !');
    } catch (error) {
        console.log('Connection to mongoDB failed !', err);
    };
};

export default database;