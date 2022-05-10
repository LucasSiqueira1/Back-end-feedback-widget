import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json()); // para o express entender o JSON, antes da rota!

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7aa6ce92cb04ca",
        pass: "ee687bb42bb22d"
    }
});

app.post('/feedbacks', async (req, res) => {
    // console.log(req.body);
    const feedback = await prisma.feedback.create({
        data: {
            type: req.body.type,
            comment: req.body.comment,
            screenshot: req.body.screenshot,
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Lucas Eduardo <lucaraz133@gmail.com>',
        subject: 'Feedback do usuário',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback ${req.body.type}</p>`,
            `<p>Comentário do feedback ${req.body.comment}</p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
    console.log('Server started on port 3333');
});