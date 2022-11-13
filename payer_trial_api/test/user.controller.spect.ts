import { Test } from "@nestjs/testing";
import { User } from "src/model/user.model";
import { UserController } from "src/users/user.controller";
import { userStub } from "./stubs/user.stub";
jest.mock("../../user.service");
describe("UserController", () => {
  let userController: UserController;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    jest.clearAllMocks();
  });
  describe("getUser", () => {
    describe("when getUser is called", () => {
      let user: User;
      beforeEach(async () => {
        user = await userController.getUserById(userStub().id);
      });
      test("then it should call userService ", () => {
        expect(userController.getUserById).toBeCalledWith(userStub().id);
      });
      test("then it should return a user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe("getUserAvatar", () => {
    describe("when getUserAvatar is called", () => {
      let user: User;
      beforeEach(async () => {
        user = await userController.getUserById(userStub().id);
      });
      test("then it should call userService ", () => {
        expect(userController.getUserAvatar).toBeCalledWith(userStub().id));
    });
    test("then it should return a user with avatar", () => {
      expect(user).toEqual(userStub().avatar);
    });
  });
  describe("deleteUser", () => {
    describe("when deleteUser is called", () => {
      let user: User;
      beforeEach(async () => {
        user = await userController.deleteUser(userStub().id);
      });
      test("then it should call userService ", () => {
        expect(userController.deleteUser).toBeCalledWith(userStub().id);
      });
      test("then it should return am empty", () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe("createUser", () => {
    describe("when createUser is called", () => {
      let user: User;
      beforeEach(async () => {
        await userController.createUser();
      });
      test("then it should call userService ", () => {
        expect(userController.createUser).toBeCalledWith(userStub());
      });
      test("then it should return am empty", () => {
        expect(user).toEqual(userStub());
      });
    });
  })
})
