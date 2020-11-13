import { BadRequestException } from '@nestjs/common';

export default (message: string) => {
  throw new BadRequestException(message);
};
