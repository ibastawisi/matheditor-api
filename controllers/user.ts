import { Router } from 'express';
import { deleteUser, findAllUsers, findUserById, updateUser } from '../repositories/user';
import { validate } from "uuid";
import isAdmin from '../middlewares/isAdmin';

const router = Router()

router.get('/me', async (req, res) => {
  return res.json(req.user ?? null);
})

router.get('/', isAdmin, async (req, res) => {
  const users = await findAllUsers();
  res.json(users)
})

router.get('/:id', isAdmin, async (req, res) => {
  if (!validate(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' })
  }
  const user = await findUserById(req.params.id);
  user ? res.json(user) : res.status(404).json({ error: 'user not found' }).end()
});

router.put('/:id', isAdmin, async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  return res.json(user)
});

router.delete('/:id', isAdmin, async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'user not found' }).end()
  }
  await deleteUser(req.params.id);
  return res.status(204).end();
});

export default router;