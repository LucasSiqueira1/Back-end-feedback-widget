import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) { }


  async execute(request: SubmitFeedbackRequest) {
    if(!request.type){
      throw new Error('Type is required')
    }
    
    if(!request.comment){
      throw new Error('Comment is required')
    }

    if(request.screenshot && !request.screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Screenshot format invalid');
  }

    await this.feedbacksRepository.create({
      type: request.type,
      comment: request.comment,
      screenshot: request.screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: `Novo feedback`,
      body:  [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${request.type}</p>`,
        `<p>Comentário do feedback: ${request.comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}