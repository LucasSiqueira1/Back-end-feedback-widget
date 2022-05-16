"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedback = void 0;
class SubmitFeedback {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        if (!request.type) {
            throw new Error('Type is required');
        }
        if (!request.comment) {
            throw new Error('Comment is required');
        }
        if (request.screenshot && !request.screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Screenshot format invalid');
        }
        await this.feedbacksRepository.create({
            type: request.type,
            comment: request.comment,
            screenshot: request.screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: `Novo feedback`,
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${request.type}</p>`,
                `<p>Comentário do feedback: ${request.comment}</p>`,
                request.screenshot ? `<img src="${request.screenshot}"/>` : ``,
                `</div>`
            ].join('\n')
        });
    }
}
exports.SubmitFeedback = SubmitFeedback;
