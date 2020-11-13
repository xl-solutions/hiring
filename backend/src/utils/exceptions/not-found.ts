import { NotFoundException } from '@nestjs/common';

export default (message: string) => {
  throw new NotFoundException(message);
};
