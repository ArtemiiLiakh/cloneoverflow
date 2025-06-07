import { ExecutorPayload } from '@application/auth/data';
import { Validator } from '@common/services/Validator';
import { JwtPayload } from './dto';

export interface JwtValidator extends Validator<JwtPayload, ExecutorPayload> {}