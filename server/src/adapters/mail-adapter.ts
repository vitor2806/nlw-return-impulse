//Those work like an assignment, it only say what is expected
export interface SendMailData {
  subject: string;
  body: string;
}
export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}
