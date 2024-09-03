import { Injectable } from '@nestjs/common';
import { ContentStackService } from './contentStack.service';
import { ProductEntry } from './interfaces/contentStack.products.interface';

@Injectable()
export class ContentStackProductService {
  private readonly _contentType = 'product';
  constructor(private readonly contentStackService: ContentStackService) {}

  private get content() {
    return this.contentStackService.stack.contentType(this._contentType);
  }

  async getProductBySKU(productSKU: string): Promise<ProductEntry> {
    const query = await this.content.entry().query();
    query.equalTo('commercetools_id', productSKU);

    const result = await query.find<ProductEntry>();
    const product = result.entries?.[0] || ({} as ProductEntry);

    return product;
  }
}
