import { SubmitFeedbackService } from './submit-feedback-service';

// This is how a spy function is created
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  //Parse create, sendMail with empty return because I'm doing unit test, not testing dependencies
  // Instead of that I can use jest spy functions, to know when a function has been called
  // { create: async () => {} }, { sendMail: async () => {} }
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

//describe what i'm expecting to do
describe('Submit feedback', () => {
  //since every field is filled correctly, It should be able to submit a feedback, create it on database and send e-mail to manager without throwing any error
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64;1290921323',
      })
    ).resolves.not.toThrow();

    //spies if functions have been called correctly
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  //if type is missing it should not be able to submit a feedback, in this case, it must throw a missing type error.
  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64;1290921323',
      })
    ).rejects.toThrow();
  });

  //if type is missing it should not be able to submit a feedback, in this case, it must throw a missing comment error.
  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64;1290921323',
      })
    ).rejects.toThrow();
  });

  //if there is a screenshot but it has a wrong format (doesn't start with data:image/png;base64), then it should not be able to submit a feedback, it must throw a invalid screenshot format
  it('should not be able to submit feedback with an invalid screenshot format', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow();
  });
});
