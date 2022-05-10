import express from 'express';
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

import { SubmitFeedback } from './functions/submit-feedback';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const nodemailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedback = new SubmitFeedback(prismaFeedbacksRepository, nodemailerMailAdapter)

  await submitFeedback.execute({
    type: req.body.type,
    comment: req.body.comment,
    screenshot: req.body.screenshot,
  });

  return res.status(201).send();
})