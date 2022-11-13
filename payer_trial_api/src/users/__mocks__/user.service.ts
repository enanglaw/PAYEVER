import { userStub } from "test/stubs/user.stub";

export const UserService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockReturnValue(userStub()),
  getUserAvatar: jest.fn().mockReturnValue(userStub()),
  createUser: jest.fn().mockReturnValue(userStub()),
  deleteUser: jest.fn().mockReturnValue(userStub()),
});
