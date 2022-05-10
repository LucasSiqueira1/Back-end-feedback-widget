import { prisma } from "../../prisma";
import { FeedbacksRepository, FeedbbackCreateData } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbbackCreateData) {
    await prisma.feedback.create({
      data: {
        type: data.type,
        comment: data.comment,
        screenshot: data.screenshot,
      }
    })
  }
}