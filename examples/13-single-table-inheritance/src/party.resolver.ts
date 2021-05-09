import { Args, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Inject } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseContext, Fields } from "../../../src";
import { GroupParty } from "./group-party.model";
import { Party } from "./party.model";
import { PartyService } from "./party.service";

import {
  PartyWhereArgs,
  PartyWhereInput
} from '../generated';

@Resolver(Party)
export class PartyResolver {

  constructor(@Inject('PartyService') public readonly service: PartyService) {}

  @FieldResolver(() => [GroupParty])
  groups(@Root() party: Party, @Ctx() ctx: BaseContext) {
    return ctx.dataLoader.loaders.Party.groups.load(party);
  }

  @Query(() => [Party])
  async parties(
    @Args() { where, orderBy, limit, offset }: PartyWhereArgs,
    @Fields() fields: string[]
  ): Promise<Party[]> {
    return this.service.find<PartyWhereInput>(where, orderBy, limit, offset, fields);
  }
}
