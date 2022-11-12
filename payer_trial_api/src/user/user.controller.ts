import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { User } from "src/model/user.model";

import { UserService } from "./user.service";

@Controller("api")
export class UserController {
  constructor(private _service: UserService) {}

  @Post("users")
  async createUser(@Body() _userDto: User) {
    await this._service
      .findAllUsers()
      .toPromise()
      .then((res) => {
        if (res.status === 200 && res.data?.length > 0) {
          res.data.forEach(
            (user) => {
              (_userDto.avatar = user.avatar),
                (_userDto.email = user.email),
                (_userDto.first_name = user.first_name),
                (_userDto.last_name = user.last_name);
            },

            this._service
              .addUsers(_userDto)
              .then(() => console.log("created user with details: ", _userDto))
          );
        }
      });
  }

  @Get("user/:Id")
  async getUserById(@Param("Id") userId: string) {
    return await this._service.getUserById(userId);
  }

  @Get("user/:userId/avatar")
  async getUser(@Param("userId") userId: string) {
    const url = await this._service.getUserAvatarUrl(userId);
    this._service.downloadAvatar(url).then(
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
  }

  @Get("test/:Id/:avatar")
  getTestUser(@Param() params): string {
    return `Id: ${params.Id}, avatar: ${params.avatar}`;
  }
  @Get("users")
  async getUsers() {
    return await this._service.getUsers();
  }
  @Delete("user/:Id/:avatar")
  deleteUser(@Param() params) {
    console.log(`${params.Id} ${params.avatar}`);
    return this._service.deleteUser(params.Id, params.avatar);
  }
}
