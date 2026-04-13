import { Injectable } from '@nestjs/common';
import type { APIResponse, Sido } from '@animal-project/shared-types';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getSidoStub(): APIResponse<Sido> | null {
    return null;
  }
}
