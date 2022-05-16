"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const submit_feedback_1 = require("./functions/submit-feedback");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (req, res) => {
    const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodeMailerMailAdapter();
    const submitFeedback = new submit_feedback_1.SubmitFeedback(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedback.execute({
        type: req.body.type,
        comment: req.body.comment,
        screenshot: req.body.screenshot,
    });
    return res.status(201).send();
});
