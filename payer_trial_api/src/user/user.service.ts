/* eslint-disable prettier/prettier */
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AxiosResponse } from "axios";
import { Model } from "mongoose";
import { Observable } from "rxjs";
import { User } from "src/model/user.model";

@Injectable({})
export class UserService {
  logger: any;
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly httpService: HttpService
  ) {}
  users: User[] = [];

  async createUser(
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
  ) {
    const newUser = new this.userModel({
      email: email,
      first_name: first_name,
      last_name: last_name,
      avatar: avatar,
    });
    const result = await newUser.save();
    console.log(result.id);
  }
  async addUsers(user: User) {
    const newUser = new this.userModel({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    });
    await newUser.save();
  }
  async getUserById(userId: string) {
    const result = await this.userModel.find({ _id: userId }).exec();
    return result;
  }
  async getUsers() {
    const result = await this.userModel.find().exec();
    return result;
  }
  async getUserByAvatar(userId: string, avatar: string) {
    const result = await this.userModel
      .find({ _id: userId })
      .exec()
      .then((user) => {
        user.find((s) => s.avatar === avatar);
      });
    return result;
  }
  findAllUsers(): Observable<AxiosResponse<User[]>> {
    return this.httpService.get<User[]>('https://reqres.in/api/users');
  }

  /*
  async findAll(): <Observable<AxiosResponse<User[]>> {
    return await this.httpService.get("https://reqres.in/api/users");
  }
  */

  async deleteUser(Id: string, avatar: string) {
    await this.userModel.deleteOne({ Id: Id, avatar: avatar }).exec();
  }
}
