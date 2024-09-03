import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Commercetools } from 'src/app.config.global';
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

@Injectable()
export class CommerceToolsService {
  private readonly commerceToolsEnv: Commercetools;
  private projectKey: string;
  private commerceToolsApi: ApiRoot;
  private _langCode: string;

  constructor(private readonly configService: ConfigService) {
    this.commerceToolsEnv =
      this.configService.get<Commercetools>('commerceTools');
    this.projectKey = this.commerceToolsEnv.projectKey;
    this.langCode = this.commerceToolsEnv.langCode;

    this.setupCommerceToolsClient();
  }

  get langCode(): string {
    return this._langCode;
  }

  private set langCode(langCode: string) {
    this._langCode = langCode;
  }

  private setupCommerceToolsClient() {
    const { clientId, clientSecret, authUrl, apiUrl, scopes } =
      this.commerceToolsEnv;

    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow({
        host: authUrl,
        projectKey: this.projectKey,
        credentials: {
          clientId,
          clientSecret,
        },
        scopes,
        fetch,
      })
      .withHttpMiddleware({
        host: apiUrl,
        fetch,
      })
      .build();

    this.commerceToolsApi = createApiBuilderFromCtpClient(client);
  }

  getCommerceToolsRequestBuilder() {
    return this.commerceToolsApi.withProjectKey({
      projectKey: this.commerceToolsEnv.projectKey,
    });
  }
}
