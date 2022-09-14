import { Prisma } from "@prisma/client";
import prisma from "../prisma";

const findAllDocuments = async () => {
  return prisma.document.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
}

const findDocumentById = async (id: string) => {
  return prisma.document.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      data: true,
    }
  });
}

const findDocumentUserId = async (id: string) => {
  const document = await prisma.document.findUnique({
    where: { id },
    select: {
      userId: true,
    }
  });
  return document?.userId;
}
const createDocument = async (data: Prisma.DocumentCreateInput) => {
  return prisma.document.create({ data });
}

const updateDocument = async (id: string, data: Prisma.DocumentUpdateInput) => {
  return prisma.document.update({
    where: { id },
    data
  });
}

const deleteDocument = async (id: string) => {
  return prisma.document.delete({
    where: { id },
  });
}

const getDocumentsCount = async () => {
  return prisma.document.count();
}

const getLatestDocuments = async () => {
  return prisma.document.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
    orderBy: {
      updatedAt: 'desc'
    },
    take: 5
  });
}

export { findAllDocuments, findDocumentById, findDocumentUserId, createDocument, updateDocument, deleteDocument, getDocumentsCount, getLatestDocuments };