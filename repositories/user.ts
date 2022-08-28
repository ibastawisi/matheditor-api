import { Prisma } from "@prisma/client";
import prisma from "../prisma";

const findAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      documents: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc'
        }
      },
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
}

const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      disabled: true,
      documents: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc'
        }
      }
    }
  });
}

const findUserByGoogleId = async (googleId: string) => {
  return prisma.user.findFirst({
    where: { googleId },
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      documents: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc'
        }
      }
    }
  });
}

const createUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
}

const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data
  });
}

export { findAllUsers, findUserById, findUserByGoogleId, createUser, updateUser };