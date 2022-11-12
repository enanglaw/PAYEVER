/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  Paramtype,
  Post,
} from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { ParamsSerializerOptions } from "axios";

import { map } from "rxjs";
import { User } from "src/model/user.model";

import { UserService } from "./user.service";

@Controller("api")
export class UserController {
  constructor(private _service: UserService) {}


  @Post("users")
  async createUser(@Body() users: User[]) {
     await this._service.findAllUsers().toPromise().then(
      (res) => {
        if(res.status === 200 && res.data?.length>0) {
          res.data.forEach(
            user =>  this._service.addUsers(user).then(()=> console.log('created user with details: ', user )));
        }
      });
      
  }
  /*@Post("users")
  async addUser(
    @Body("email") email: string,
    @Body("first_name") first_name: string,
    @Body("last_name") last_name: string,
    @Body("avatar") avatar: string
  ) {
    const generatedId = await this._service.createUser(
      email,
      first_name,
      last_name,
      avatar
    );
    return { id: generatedId };
  }*/
  @Get("user/:Id")
  async getUserById(@Param("Id") userId: string) {
    return await this._service.getUserById(userId);
  }
  @Get("user/:avatar/:Id")
  getUser(@Param("Id") userId: string, @Param("avatar") avatar: string) {
    return this._service.getUserByAvatar(userId, avatar);
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
