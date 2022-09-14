import { Router } from 'express';
import isAdmin from '../middlewares/isAdmin';
import { getLatestUsers, getUsersCount } from '../repositories/user';
import { getDocumentsCount, getLatestDocuments } from '../repositories/document';

const router = Router()

router.get('/', isAdmin, async (req, res) => {
  const numberOfUsers = await getUsersCount();
  const numberOfDocuments = await getDocumentsCount();
  const latestUsers = await getLatestUsers();
  const latestDocuments = await getLatestDocuments();
  res.json({
    numberOfUsers,
    numberOfDocuments,
    latestUsers,
    latestDocuments
  })
})

export default router;