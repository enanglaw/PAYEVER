import { Test } from "@nestjs/testing";
import { User } from "src/model/user.model";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { userStub } from "./stubs/user.stub";
jest.mock("../user.service");
describe("User Controller", () => {
  let userController: UserController;
  let userService: UserService;
  let user: User[] = [];
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });
  describe("getUser", () => {
    describe("when getUser is called", () => {
      beforeEach(async () => {
        user = await userController.getUserById(userStub().id);
      });
      test("then it should call userService ", () => {
        expect(userService.getUserById).toBeCalledWith(userStub().id);
      });
      test("then it should return a user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe("create user", () => {
    test("then it should return a user", () => {
      expect(user).toEqual(userStub());
    });
  });

  describe("delete User", () => {
    test("should call deleteNote method with expected param", async () => {
      const deleteUserSpy = jest.spyOn(userService, "deleteUser");
      const noteId = "noteId";
      userService.deleteUser(noteId);
      expect(deleteUserSpy).toHaveBeenCalledWith(noteId);
    });
  });
});
