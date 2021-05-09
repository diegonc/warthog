import { TableInheritance } from 'typeorm';
import { BaseModel, Model, OneToMany, StringField } from '../../../src';
import { GroupParty } from './group-party.model';

export enum PartyType {
  PtyPerson = "Person",
  PtyOrganization = "Organization",
  PtyGroup = "Group"
}

@Model({db: {name: 'parties'}})
@TableInheritance({column: {type: 'varchar', name: 'party_type'}})
export class Party extends BaseModel {
  @StringField()
  commonName!: string

  @OneToMany(
    () => GroupParty,
    (groupParty: GroupParty) => groupParty.party
  )
  groups?: GroupParty[];
}
