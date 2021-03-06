import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService
  ) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createAt: 'desc'
      }
    })
  }
}