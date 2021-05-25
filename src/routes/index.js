import cors from 'cors';
import postRouter from './post';
import userRouter from './user';
import imageRouter from './image';

export default (app) => {
    app.use(cors());
    app.use('/api/v1', postRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1', imageRouter);
    app.get('/', (req, res) => {
        res.json({ mesage: 'Welcome to Faceposts' })
    })

    app.use((err, req, res, next) => {
        console.error('what is the error', err);
        res.status(500).json({error: 'an error occurred'});
    });
}
