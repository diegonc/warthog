import {Index} from 'typeorm';
import { BaseModel, Model, StringField, ManyToOne } from '../../../src';
import { Group } from './group.model';
import { Party } from './party.model';

@Model({db: {name: 'group_parties'}})
@Index(["group", "party"], {unique: true})
export class GroupParty extends BaseModel {

  @ManyToOne(
    () => Group,
    (group: Group) => group.parties
  )
  group!: Group;

  @ManyToOne(
    () => Party,
    (party: Party) => party.groups
  )
  party!: Party;

  @StringField({ nullable: true })
  dummyField?: string;
}
