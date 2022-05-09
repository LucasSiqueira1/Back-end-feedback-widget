import express from 'express';
import { prisma } from './prisma';

const app = express();

app.use(express.json()); // para o express entender o JSON, antes da rota!

app.post('/feedbacks', async (req, res) => {
    // console.log(req.body);
    const feedback = await prisma.feedback.create({
        data: {
            type: req.body.type,
            comment: req.body.comment,
            screenshot: req.body.screenshot,
        }
    })

    return res.status(201).json({data: feedback});
})

app.listen(3333, () => {
    console.log('Server started on port 3333');
});