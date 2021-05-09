import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '../../../src';

import { Party } from './party.model';

@Service('PartyService')
export class PartyService extends BaseService<Party> {
  constructor(@InjectRepository(Party) protected readonly repository: Repository<Party>) {
    super(Party, repository);
  }
}
