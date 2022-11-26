import { ApiController } from '../../controllers/ApiController';
import { getMoockedAlphaService } from './mockAlphaService/mockAlphaService';
import { getMoockedYahooService } from './mockYahooService';

export function getMoockedApiController(): ApiController {
  return ApiController.getInstance(getMoockedYahooService(), getMoockedAlphaService());
}
