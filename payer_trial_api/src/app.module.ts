/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false"
    ),
  ],
})
export class AppModule {}
