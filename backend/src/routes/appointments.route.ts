import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/create-appointment.service';
import AppointmentsRepository from '../repositories/appointments.repository';
import jwtAuth from '../middlewares/jwt-auth.middleware';

const router = Router();

// placing this line on top adds this middleware for all routes in this file
router.use(jwtAuth);

router.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();
  return res.json(appointments);
});

router.post('/', async (req, res) => {
  const { barberId, date } = req.body;
  const parsedDate = parseISO(date);
  const service = new CreateAppointmentService();
  const appointment = await service.execute({ barberId, date: parsedDate });
  return res.json(appointment);
});

export default router;