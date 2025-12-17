import { Test, TestingModule } from '@nestjs/testing';
import { UsersGroupService } from './users-group.service';

describe('UsersGroupService', () => {
  let service: UsersGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersGroupService],
    }).compile();

    service = module.get<UsersGroupService>(UsersGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
