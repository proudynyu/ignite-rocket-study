import { UseGuards } from "@nestjs/common";
import { Resolver, Query, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { ProductsService } from "src/services";
import { PurchaseService } from "../../../services/purchase.service";
import { Product } from "../models/product";
import { Purchase } from "../models/purchase";

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductsService
  ) { }

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchaseService.listAllPurchases()
  }

  @ResolveField(() => Product)
  product(
    @Parent() purchase: Purchase
  ) {
    return this.productService.getProductById(purchase.productId)
  }

  @Mutation(() => Purchase)
  createPurchase() {
    return this.purchaseService.createPurchase()
  }
}