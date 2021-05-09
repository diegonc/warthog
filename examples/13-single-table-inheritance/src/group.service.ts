import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '../../../src';

import { Group } from './group.model';

@Service('GroupService')
export class GroupService extends BaseService<Group> {
  constructor(@InjectRepository(Group) protected readonly repository: Repository<Group>) {
    super(Group, repository);
  }
}
