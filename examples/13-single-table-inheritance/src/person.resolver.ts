import { Arg, Mutation, Resolver } from "type-graphql";
import { PersonCreateInput } from "../generated";

import { Person } from "./person.model";
import { PersonService } from './person.service';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private service: PersonService) {}

  @Mutation(() => Person)
  async createPerson(
    @Arg('data') _data: PersonCreateInput
  ): Promise<Person> {
    try {
      const person = await this.service.create(_data, 'server');
      return person;
    } catch(err) {
      console.log("err", err);
      throw err;
    }
  }
}
