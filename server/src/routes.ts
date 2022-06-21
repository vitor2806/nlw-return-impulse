import express from 'express';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

// HTTP METHODS: GET, POST, PUT, PATCH, DELETE

/*
 * GET => Get info
 * POST => Register info
 * PUT => Update info of an entity (EX: update e-mail, password, name of an entity)
 * PATCH => Update an unique info of an entity (EX: update e-mail of an entity)
 * DELETE => Delete info
 */

routes.post('/feedbacks', async (req, res) => {
  // When a new feedback is submitted, get all info
  const { type, comment, screenshot } = req.body;

  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  //sending those params same order as they are in SubmitFeedbackService
  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);
  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  //if everything did good, then return status 201, which means 'Created'
  return res.status(201).send();
});
