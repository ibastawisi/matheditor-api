import { Router } from "express";
import { findDocumentMetadata } from "../repositories/document";
import { FRONTEND_URL } from "../env";

interface DocumentMetadata {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: {
    name: string;
    picture: string;
    email: string;
  };
}

const router = Router();

router.get('/:id', async (req, res) => {
  const isUserRequest = req.headers['Sec-Fetch-User']
  if (isUserRequest) {
    return res.redirect(`${FRONTEND_URL}/view/${req.params.id}`);
  }
  let metadata: DocumentMetadata = {
    id: req.params.id,
    name: 'Error 404'
  };
  try {
    const documet = await findDocumentMetadata(req.params.id);
    if (documet) metadata = documet;
  } catch (error) {
    metadata = { id: req.params.id, name: 'Error 500' };
  }

  const { id, name } = metadata;
  const description = metadata.user ? `View ${name} on Math Editor` : metadata.name === 'Error 404'? 'Document Not Found.' : 'Invalid Document Identifier.';
  const url = `${FRONTEND_URL}/view/${id}`;
  const image = `${FRONTEND_URL}/api/og?metadata=${encodeURIComponent(JSON.stringify(metadata))}`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Primary Meta Tags -->
        <title>${name}</title>
        <meta name="title" content="${name}">
        <meta name="description" content="${description}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${name}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${url}">
        <meta property="twitter:title" content="${name}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${image}">
      </head>
    </html>
    `;
  return res.send(html);
});

export default router;