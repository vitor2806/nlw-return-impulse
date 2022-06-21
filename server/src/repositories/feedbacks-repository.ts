export interface FeedbackCreateData {
  // I need these to create a new feedback
  type: string;
  comment: string;
  screenshot?: string;
}
export interface FeedbacksRepository {
  // create function will need FeedbackCreateData props to create a new feedback
  // create: (data: FeedbackCreateData) => void; Since i'm using an async function in prisma-feedbacks-repository, now it will return a promise.
  create: (data: FeedbackCreateData) => Promise<void>;
}
