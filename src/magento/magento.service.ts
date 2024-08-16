import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class MagentoService {
  private readonly magentoAPI: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly utilsService: UtilsService,
  ) {
    this.magentoAPI = this.configService.get<string>('magentoAPI');
  }

  private getUrl(path: string) {
    return `${this.magentoAPI}/${path}`;
  }

  async get<MagentoResponseData>(path: string) {
    return this.utilsService.getPromisifiedResponse(
      this.httpService.get<MagentoResponseData>(this.getUrl(path)),
    );
  }

  async post<MagentoResponseData, MagentoBody = null>(
    path: string,
    data?: MagentoBody,
  ) {
    return this.utilsService.getPromisifiedResponse(
      this.httpService.post<MagentoResponseData>(this.getUrl(path), data),
    );
  }

  async put<MagentoResponseData, MagentoBody = null>(
    path: string,
    data?: MagentoBody,
  ) {
    return this.utilsService.getPromisifiedResponse(
      this.httpService.put<MagentoResponseData>(this.getUrl(path), data),
    );
  }

  async patch<MagentoResponseData, MagentoBody = null>(
    path: string,
    data?: MagentoBody,
  ) {
    return this.utilsService.getPromisifiedResponse(
      this.httpService.patch<MagentoResponseData>(this.getUrl(path), data),
    );
  }

  async delete<MagentoResponseData>(path: string) {
    return this.utilsService.getPromisifiedResponse(
      this.httpService.delete<MagentoResponseData>(this.getUrl(path)),
    );
  }
}
