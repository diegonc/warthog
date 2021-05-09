import * as Faker from 'faker';

import { getBindingError, logger } from '../../../src';

import { getServer } from '../src/server';

const NUM_USERS = 10;

async function seedDatabase() {
  const server = getServer({ introspection: true, openPlayground: false });

  // NOTE: this has to be after we instantiate the server, because the server will actually load the environment variables from .env and set process.env.NODE_ENV
  if (process.env.NODE_ENV !== 'development') {
    throw 'Seeding only available in development environment';
  }

  await server.start();

  let binding;
  try {
    binding = await server.getBinding();
  } catch (error) {
    logger.error(error);
    return process.exit(1);
  }

  const A = await binding.mutation.createGroup({data: {commonName: "A", groupName: "A"}});
  const B = await binding.mutation.createGroup({data: {commonName: "B", groupName: "B"}});

  const groups = [A, B];

  for (let index = 0; index < NUM_USERS; index++) {
    const random = new Date()
      .getTime()
      .toString()
      .substring(8, 13);
    const firstName = `Faker.name.firstName() ${random}`;
    const lastName = Faker.name.lastName();
    const commonName = firstName + ' ' + lastName;

    try {
      const user = await binding.mutation.createPerson({
          data: {
            commonName,
            firstName,
            lastName,
          }
        },
        `{ id firstName lastName createdAt createdById }`
      );
      logger.info(user.firstName);
    } catch (err) {
      const error = getBindingError(err);
      logger.error(error);
      logger.error(firstName);
    }
  }

  return server.stop();
}

seedDatabase()
  .then(result => {
    logger.info(result);
    return process.exit(0);
  })
  .catch(err => {
    logger.error(err);
    return process.exit(1);
  });
