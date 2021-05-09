import { StringField, OneToMany } from '../../../src';
import { GroupParty } from './group-party.model';
import { PartyType, Party } from './party.model';
import { ChildModel } from './child-model';

@ChildModel(PartyType.PtyGroup, {api: {implements: Party}})
export class Group extends Party {
  @StringField({unique: true})
  groupName!: string;

  @OneToMany(
    () => GroupParty,
    (groupParty: GroupParty) => groupParty.group
  )
  parties?: GroupParty[];
}
