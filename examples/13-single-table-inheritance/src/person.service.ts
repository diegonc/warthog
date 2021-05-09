import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '../../../src';

import { Person } from './person.model';

@Service('PersonService')
export class PersonService extends BaseService<Person> {
  constructor(@InjectRepository(Person) protected readonly repository: Repository<Person>) {
    super(Person, repository);
  }
}
