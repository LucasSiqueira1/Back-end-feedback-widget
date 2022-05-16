"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFeedbacksRepository = void 0;
const prisma_1 = require("../../prisma");
class PrismaFeedbacksRepository {
    async create(data) {
        await prisma_1.prisma.feedback.create({
            data: {
                type: data.type,
                comment: data.comment,
                screenshot: data.screenshot,
            }
        });
    }
}
exports.PrismaFeedbacksRepository = PrismaFeedbacksRepository;
