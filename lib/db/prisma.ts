import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  // Necessary for dev work.
  var _prismaCachedClient: PrismaClient
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global._prismaCachedClient) {
    global._prismaCachedClient = new PrismaClient()
  }
  prisma = global._prismaCachedClient
}

export default prisma
