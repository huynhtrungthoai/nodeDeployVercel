import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Express on Vercel s');
});

app.listen(8080, () => console.log('Server ready on port 8080.'));

module.exports = app;
