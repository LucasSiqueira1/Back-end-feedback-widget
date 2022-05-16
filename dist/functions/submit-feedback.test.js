"use strict";
// test('sum 2 + 2', () => {
//   expect(2 + 2).toBe(4)
// })
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_1 = require("./submit-feedback");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
describe('Submit feedback', () => {
    //teste geral do feedback
    it('should be able to submit a feedback', async () => {
        const submitFeedback = new submit_feedback_1.SubmitFeedback({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'This is a bug',
            screenshot: 'data:image/png;base64,81293adjsahdjaisd'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //teste do tipo de feedback
    it('should not be able to submit feedback without type', async () => {
        const submitFeedback = new submit_feedback_1.SubmitFeedback({ create: async () => { } }, { sendMail: async () => { } });
        await expect(submitFeedback.execute({
            type: '',
            comment: 'This is a bug',
            screenshot: 'data:image/png;base64,81293adjsahdjaisd'
        })).rejects.toThrow();
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //teste do comentário do feedback
    it('should not be able to submit feedback without comment', async () => {
        const submitFeedback = new submit_feedback_1.SubmitFeedback({ create: async () => { } }, { sendMail: async () => { } });
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,81293adjsahdjaisd'
        })).rejects.toThrow();
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //teste da screenshot do feedback
    it('should not be able to submit feedback with an invalid screenshot', async () => {
        const submitFeedback = new submit_feedback_1.SubmitFeedback({ create: async () => { } }, { sendMail: async () => { } });
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'This is a bug',
            screenshot: 'teste.jpg'
        })).rejects.toThrow();
    });
});
