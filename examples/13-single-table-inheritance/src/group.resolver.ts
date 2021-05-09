import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql';
import { Inject } from 'typedi';
import { Fields, StandardDeleteResponse, UserId, BaseContext } from '../../../src';

import {
  GroupCreateInput,
  GroupCreateManyArgs,
  GroupUpdateArgs,
  GroupWhereArgs,
  GroupWhereInput,
  GroupWhereUniqueInput
} from '../generated';

import { Group } from './group.model';
import { GroupService } from './group.service';
import { GroupParty } from './group-party.model';

@Resolver(Group)
export class GroupResolver {
  constructor(@Inject('GroupService') public readonly service: GroupService) {}

  @FieldResolver(() => [GroupParty])
  parties(@Root() group: Group, @Ctx() ctx: BaseContext) {
    return ctx.dataLoader.loaders.Group.parties.load(group);
  }

  @Query(() => [Group])
  async groups(
    @Args() { where, orderBy, limit, offset }: GroupWhereArgs,
    @Fields() fields: string[]
  ): Promise<Group[]> {
    return this.service.find<GroupWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => Group)
  async group(@Arg('where') where: GroupWhereUniqueInput): Promise<Group> {
    return this.service.findOne<GroupWhereUniqueInput>(where);
  }

  @Mutation(() => Group)
  async createGroup(@Arg('data') data: GroupCreateInput, @UserId() userId: string): Promise<Group> {
    return this.service.create(data, userId);
  }

  @Mutation(() => [Group])
  async createManyGroups(
    @Args() { data }: GroupCreateManyArgs,
    @UserId() userId: string
  ): Promise<Group[]> {
    return this.service.createMany(data, userId);
  }

  @Mutation(() => Group)
  async updateGroup(
    @Args() { data, where }: GroupUpdateArgs,
    @UserId() userId: string
  ): Promise<Group> {
    return this.service.update(data, where, userId);
  }

  @Mutation(() => StandardDeleteResponse)
  async deleteGroup(
    @Arg('where') where: GroupWhereUniqueInput,
    @UserId() userId: string
  ): Promise<StandardDeleteResponse> {
    return this.service.delete(where, userId);
  }
}
