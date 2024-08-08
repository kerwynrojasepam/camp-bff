import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class UtilsService {
  constructor() {}

  async getPromisifiedResponse<TData>(
    observableResponse: Observable<AxiosResponse<TData>>,
  ): Promise<TData> {
    const { data } = await firstValueFrom(
      observableResponse.pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catchError((error: AxiosError) => {
          console.log('getPromisifiedResponse', error);
          // this.logger.error(error.response.data);
          throw error;
        }),
      ),
    );

    return data;
  }
}
