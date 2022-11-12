import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { User } from "src/model/user.model";

import { UserService } from "./user.service";

@Controller("api")
export class UserController {
  constructor(private _service: UserService) {}

  @Post("users")
  async createUser() {
    await this._service
      .findAllUsers()
      .toPromise()
      .then((res) => {
        console.log(`response`, res);
        this.saveUsers((res.data as any).data as User[]);
      });
  }

  @Get("user/:Id")
  async getUserById(@Param("Id") userId: string) {
    return await this._service.getUserById(userId);
  }

  @Get("user/:userId/avatar")
  async getUser(@Param("userId") userId: string) {
    const url = await this._service.getUserAvatarUrl(userId);
    const avatarToBase64 = await this._service.downloadAvatar(url).then(
      (response) => {
        return response;
      },
      (error) => {
        console.log(
          `error coocured while downloading avater by url -${url} => `,
          error
        );
      }
    );
    return avatarToBase64;
  }
  @Get("users")
  async getUsers() {
    return await this._service.getUsers();
  }
  @Delete("user/:Id/:avatar")
  deleteUser(@Param() params) {
    return this._service.deleteUser(params.Id);
  }


  private saveUsers(userInfo: User[]) {

    // const responseData = res.data as any;
    userInfo.forEach((user) => {
      const userInfo: User = {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      this._service
        .addUsers(user)
        .then(() => console.log("created user with details: ", userInfo));
    });
  }
}
