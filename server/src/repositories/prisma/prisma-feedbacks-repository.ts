import { prisma } from '../../prisma';
import { FeedbacksRepository, FeedbackCreateData } from '../feedbacks-repository'; //This will say what my application can do

// PrismaFeedbacksRepository implements FeedbacksRepository assignments, which says that I need a type, comment, and maybe a screenshot, to create a new feedback.
export class PrismaFeedbacksRepository implements FeedbacksRepository {
  //This will do what my application can do
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
