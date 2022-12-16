import { Router} from 'express';
import PersonaService from '../services/persona-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router = Router();
const personaService = new PersonaService();

router.get('', async (req, res) => {
  console.log('Estoy en: personaController get /');
  
  const personas = await personaService.getAll();

  return res.status(StatusCodes.OK).json(personas);
});

router.get('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log('Estoy en: personaController get /:id');

  const persona = await personaService.getById(req.params.id);

  return res.status(StatusCodes.OK).json(persona);
});

router.post('', async (req, res) => {
  console.log('Estoy en: personaController post');

  const persona = await personaService.insert(req.body);

  return res.status(201).json(persona);
});

router.put('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log('Estoy en: personaController put /:id');

  const persona = await personaService.update(req.body);

  return res.status(200).json(persona);
});

router.delete('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log('Estoy en: personaController delete /:id');

  const persona = await personaService.deleteById(req.params.id);

  return res.status(200).json(persona);
});

export default router;
