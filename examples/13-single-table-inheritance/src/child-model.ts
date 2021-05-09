const caller = require('caller'); // eslint-disable-line @typescript-eslint/no-var-requires
import * as path from 'path';
import { ObjectType } from 'type-graphql';
import { ObjectOptions } from 'type-graphql/dist/decorators/ObjectType.d';
import { Container } from 'typedi';
import { ChildEntity } from 'typeorm';
import {
  ClassDecoratorFactory,
  ClassType,
  composeClassDecorators,
  generatedFolderPath,
} from '../../../src';

function getMetadataStorage(): any {
  if (!(global as any).WarthogMetadataStorage) {
    // Since we can't use DI to inject this, just call into the container directly
    (global as any).WarthogMetadataStorage = Container.get('MetadataStorage');
  }
  return (global as any).WarthogMetadataStorage;
}

interface ChildModelOptions {
  api?: ObjectOptions;
}

// Allow default TypeORM and TypeGraphQL options to be used
export function ChildModel(discriminatorValue?: any, { api = {} }: ChildModelOptions = {}) {
  // In order to use the enums in the generated classes file, we need to
  // save their locations and import them in the generated file
  const modelFileName = caller();

  // Use relative paths when linking source files so that we can check the generated code in
  // and it will work in any directory structure
  const relativeFilePath = path.relative(generatedFolderPath(), modelFileName);

  const registerModelWithWarthog = (target: ClassType): void => {
    // Save off where the model is located so that we can import it in the generated classes
    getMetadataStorage().addModel(target.name, target, relativeFilePath);
  };

  const factories = [
    ChildEntity(discriminatorValue) as ClassDecoratorFactory,
    ObjectType(api) as ClassDecoratorFactory,
    registerModelWithWarthog as ClassDecoratorFactory
  ];

  return composeClassDecorators(...factories);
}
