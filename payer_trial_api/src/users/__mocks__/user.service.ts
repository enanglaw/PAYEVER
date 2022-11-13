import { userStub } from "../test/stubs/user.stub";

export const UserService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(userStub()),
  getUserAvatar: jest.fn().mockResolvedValue(userStub()),
  createUser: jest.fn().mockResolvedValue(userStub()),
  deleteUser: jest.fn().mockResolvedValue(userStub()),
});
