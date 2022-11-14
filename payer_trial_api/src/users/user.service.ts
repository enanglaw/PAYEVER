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
  user: User;
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

  findAllUsers(): Observable<AxiosResponse<User[]>> {
    return this.httpService.get<User[]>("https://reqres.in/api/users");
  }

  async getUserAvatarUrl(userId: string) {
    const result = await this.userModel.findOne({ _id: userId }).exec();
    return result.avatar;
  }

  async deleteUser(Id: string) {
    await this.userModel.deleteOne({ Id: Id }).exec();
  }

  downloadAvatar(url: string): Promise<string> {
    return this.httpService
      .get(url, { responseType: "arraybuffer" })
      .toPromise()
      .then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );
  }
}
