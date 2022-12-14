import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
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
        this.saveUsers((res.data as any).data as User[]);
      });
  }

  @Get("user/:Id")
  async getUserById(@Param("Id") userId: string) {
    return await this._service.getUserById(userId);
  }

  @Get("user/:Id/avatar")
  async getUserAvatar(@Param() params) {
    const url = await this._service.getUserAvatarUrl(params.Id);
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
  @Delete("user/:Id/avatar")
  async deleteUser(@Param() params) {
    let deletedUser = await this._service.deleteUser(params.Id);
    return deletedUser;
  }

  private saveUsers(userInfo: User[]) {
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
