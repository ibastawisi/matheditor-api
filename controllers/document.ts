import { Router } from "express";
import { User } from "@prisma/client";
import { validate } from "uuid";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";
import { createDocument, deleteDocument, findAllDocuments, findDocumentById, findDocumentUserId, updateDocument } from "../repositories/document";

const router = Router();

router.get('/', isAdmin, async (req, res) => {
  const documents = await findAllDocuments();
  return res.json(documents);
});

router.post('/', isAuthenticated, async (req, res, next) => {
  const user = req.user as User;
  if (user.disabled) {
    return res.status(403).json({ error: 'account disabled, please contact admin' })
  }
  await createDocument({ ...req.body, userId: user.id });
  return res.status(200).end();
});

router.get('/:id', async (req, res) => {
  if (!validate(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' })
  }
  const document = await findDocumentById(req.params.id);
  document ? res.json(document) : res.status(404).json({ error: 'document not found' }).end()
});

router.put('/:id', isAuthenticated, async (req, res) => {
  if (!validate(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' })
  }
  const user = req.user as User;
  if (user.disabled) {
    return res.status(403).json({ error: 'account disabled, please contact admin' })
  }
  const userId = await findDocumentUserId(req.params.id);
  if (user.id !== userId) {
    return res.status(403).json({ error: 'you are not allowed to edit this document' })
  }
  if (userId === user.id) {
    await updateDocument(req.params.id, req.body);
    return res.status(200).end();
  } else {
    res.status(404).json({ error: 'document not found' }).end()
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  if (!validate(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' })
  }
  const user = req.user as User;
  if (user.disabled) {
    return res.status(403).json({ error: 'account disabled, please contact admin' })
  }
  const userId = await findDocumentUserId(req.params.id);
  if (user.id !== userId) {
    return res.status(403).json({ error: 'you are not allowed to delete this document' })
  }
  if (user.id === userId) {
    await deleteDocument(req.params.id);
  }
  res.status(204).end()
});

export default router;