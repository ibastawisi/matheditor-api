import { Router } from "express";
import { FRONTEND_URL } from "../env";
import { findDocumentMetadata } from "../repositories/document";
import { findUserMetadata } from "../repositories/user";

interface Metadata {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  user?: {
    name: string;
    picture: string;
    email: string;
  };
}

const router = Router();

router.get('/document/:id', async (req, res) => {
  const isUserRequest = req.headers['sec-fetch-user']
  if (isUserRequest) {
    return res.redirect(`${FRONTEND_URL}/view/${req.params.id}`);
  }
  const metadata: Metadata = {
    id: req.params.id,
  };
  try {
    const document = await findDocumentMetadata(req.params.id);
    if (document) {
      metadata.title = document.name;
      metadata.subtitle = new Date(document.createdAt).toDateString()
      metadata.description = `View ${document.name} on Math Editor`;
      metadata.user = document.user;
    } else {
      metadata.title = 'Error 404';
      metadata.subtitle = 'Document Not Found';
    }
  } catch (error) {
    metadata.title = 'Error 500';
    metadata.subtitle = 'Internal Server Error';
  }

  const { id, title, subtitle, description } = metadata;
  const url = `${FRONTEND_URL}/view/${id}`;
  const image = `${FRONTEND_URL}/api/og?metadata=${encodeURIComponent(JSON.stringify(metadata))}`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Primary Meta Tags -->
        <title>${title}</title>
        <meta name="title" content="${title}">
        <meta name="description" content="${description ?? subtitle}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description ?? subtitle}">
        <meta property="og:image" content="${image}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${url}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description ?? subtitle}">
        <meta property="twitter:image" content="${image}">
      </head>
    </html>
    `;
  return res.send(html);
});

router.get('/user/:id', async (req, res) => {
  const isUserRequest = req.headers['sec-fetch-user']
  if (isUserRequest) {
    return res.redirect(`${FRONTEND_URL}/user/${req.params.id}`);
  }
  const metadata: Metadata = {
    id: req.params.id,
  };
  try {
    const user = await findUserMetadata(req.params.id);
    if (user) {
      metadata.title = user.name;
      metadata.subtitle = new Date(user.createdAt).toDateString()
      metadata.description = `View ${user.name}'s Profile on Math Editor`;
      metadata.user = { name: user.name, picture: user.picture, email: user.email };
    } else {
      metadata.title = 'Error 404';
      metadata.subtitle = 'User Not Found';
    }
  } catch (error) {
    metadata.title = 'Error 500';
    metadata.subtitle = 'Internal Server Error';
  }

  const { id, title, subtitle, description } = metadata;
  const url = `${FRONTEND_URL}/view/${id}`;
  const image = `${FRONTEND_URL}/api/og?metadata=${encodeURIComponent(JSON.stringify(metadata))}`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Primary Meta Tags -->
        <title>${title}</title>
        <meta name="title" content="${title}">
        <meta name="description" content="${description ?? subtitle}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description ?? subtitle}">
        <meta property="og:image" content="${image}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${url}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description ?? subtitle}">
        <meta property="twitter:image" content="${image}">
      </head>
    </html>
    `;
  return res.send(html);
});

export default router;