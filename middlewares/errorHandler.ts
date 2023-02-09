import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return response.status(400).json({ error: "A document with this id already exists" })
      default:
        return response.status(400).json({ error: error.message });
    }
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

export default errorHandler