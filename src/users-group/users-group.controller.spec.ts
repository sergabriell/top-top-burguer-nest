import { Test, TestingModule } from '@nestjs/testing';
import { UsersGroupController } from './users-group.controller';

describe('UsersGroupController', () => {
  let controller: UsersGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersGroupController],
    }).compile();

    controller = module.get<UsersGroupController>(UsersGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
