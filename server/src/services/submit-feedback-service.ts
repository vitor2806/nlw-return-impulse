import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

//First of all, this file assigns what SubmitFeedbackServiceRequest is expecting to run Execute function
interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  //constructor is a function that is responsible to initialize class variables values.
  //in this case, when SubmitFeedbackService is called at routes.ts, it expect as params the dependencies to run class functions
  //so, constructor gonna get FeedbacksRepository, that is function responsible to create a new feedback at database, then, get MailAdapter, which is responsible of send e-mail to page manager
  constructor(private feedbacksRepository: FeedbacksRepository, private mailAdapter: MailAdapter) {}
  //execute will expect, basically, req.body
  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required.');
    }

    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot?.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    //if everything is okay, then create a new feedback in database and send it through e-mail
    await this.feedbacksRepository.create({ type, comment, screenshot });
    await this.mailAdapter.sendMail({
      subject: 'New feedback',
      body: [`<div style="font-family: sans-serif; font-size: 16px; color: #111;">`, `<p>Feedback type: ${type}</p>`, `<p>Comment: ${comment}</p>`, screenshot && `<img src="${screenshot}" style="width: 70%;"/>`, `</div>`].join('\n'),
    });

    // If I wasn't using DEPENDENCY INVERSION PRINCIPLE, my code should be like this:
    /* 
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    await prismaFeedbacksRepository.create({type, comment, screenshot})
    This way it will be bounded to prisma, If I'd want to change it sometime, it would be more difficult.
    */
  }
}
