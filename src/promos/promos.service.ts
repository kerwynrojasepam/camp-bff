import { Injectable } from '@nestjs/common';
import { PromoLayout } from './interfaces/promos.interface';
import { ProductSKU } from 'src/products/interfaces/product.interface';
import { ContentStackProductService } from 'src/contentStack/contentStask.products.service';
import { ProductEntry } from 'src/contentStack/interfaces/contentStack.products.interface';

@Injectable()
export class PromosService {
  constructor(
    private readonly contentStackProductService: ContentStackProductService,
  ) {}

  async getPromosBySKU(sku: ProductSKU): Promise<PromoLayout> {
    const contentStackProduct =
      await this.contentStackProductService.getProductBySKU(sku);

    return this.transformContentStackProductToPromoLayout(contentStackProduct);
  }

  private transformContentStackProductToPromoLayout(
    product: ProductEntry,
  ): PromoLayout {
    const promoLayout: PromoLayout = {
      sku: product.commercetools_id,
      promos: product.promo_section
        .map((promo) => {
          if (!promo.promo_text) {
            return null;
          }

          return {
            order: promo.promo_text.order,
            text: promo.promo_text.promo_description,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.order - b.order),
    };

    return promoLayout;
  }
}
