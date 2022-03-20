import { Request } from 'express';

import { isNotNilOrEmpty } from '../utils';
import { ACCESS_TOKEN } from './constants';

export default (req: Request) => {
  return isNotNilOrEmpty(req.cookies) ? req.cookies[ACCESS_TOKEN] : null;
};
