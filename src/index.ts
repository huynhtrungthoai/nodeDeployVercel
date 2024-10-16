import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 8080;

function getHome(req: Request, res: Response) {
    res.send('Express on Vercel');
}

app.get('/', getHome);

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
