import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DateFnsProvider } from './DateProvider/implementations/DateFnsProvider';

container.registerSingleton<IDateProvider>('DateFnsProvider', DateFnsProvider);
