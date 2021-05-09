import {
  StringField,
} from '../../../src';

import { ChildModel } from './child-model';

import { Party, PartyType } from './party.model';

@ChildModel(PartyType.PtyPerson)
export class Person extends Party {
  @StringField()
  firstName!: string;

  @StringField()
  lastName!: string;

  @StringField({apiOnly: true, nullable: true})
  email?: string

  @StringField({apiOnly: true, nullable: true})
  password?: string

}
