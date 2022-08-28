import { ErrorRequestHandler } from "express";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error)
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return response.status(400).json({ error: "A document with this id already exists" })
      default:
        return response.status(400).json({ error: error.message });
    }
  }
  if (error instanceof PrismaClientValidationError) {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

export default errorHandler