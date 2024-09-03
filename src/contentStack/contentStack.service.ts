import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ContentStackConfig } from 'src/app.config.global';
import contentstack from '@contentstack/delivery-sdk';
import { Stack } from '@contentstack/delivery-sdk/dist/types/src/lib/stack';

@Injectable()
export class ContentStackService {
  private readonly contentStackEnv: ContentStackConfig;
  private _contentStackClient: Stack;

  constructor(private readonly configService: ConfigService) {
    this.contentStackEnv =
      this.configService.get<ContentStackConfig>('contentStack');

    this.setupContentStackClient();
  }

  private setupContentStackClient() {
    const { apiKey, deliveryToken, environment } = this.contentStackEnv;

    this._contentStackClient = contentstack.stack({
      apiKey,
      deliveryToken,
      environment,
    });
  }

  get stack() {
    return this._contentStackClient;
  }
}
