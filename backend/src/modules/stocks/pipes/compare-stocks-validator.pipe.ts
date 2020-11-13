import * as yup from 'yup';
import { PipeTransform } from '@nestjs/common';

import BadRequestException from 'src/utils/exceptions/bad-request';

export class CompareStocksValidatorPipe implements PipeTransform {
  async transform(values: any) {
    const schema = yup.object().shape({
      stocks: yup
        .array()
        .of(yup.string())
        .required(),
    });

    await schema.validate(values).catch(error => {
      BadRequestException(error?.message);
    });

    return values;
  }
}
