import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from "./auth.constant";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../../schemas";
import {LocalStrategy} from "./stategies/local.strategy";
import {JsonWebTokenStrategy} from "./stategies/jwt.strategy";
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema,
                collection: 'User',
            },
        ]),
        JwtModule.register({ secret:jwtConstants.secret })
    ],
    controllers: [AuthController],
    providers: [AuthService,LocalStrategy,JsonWebTokenStrategy],
})
export class AuthModule { }