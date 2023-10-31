import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../../schemas";
import {Model} from "mongoose";
import {JwtService} from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import {LoginDTO} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) {
    }

    async createNewUser(user: User) {
        const existUser = await this.userModel.findOne({userName: user.userName}, null)
        if (existUser) {
            throw new HttpException('Username had been used by another user, please use another username', HttpStatus.FORBIDDEN);
        }
        return await this.userModel.create(
            {
                userName: user.userName,
                password: this.hashPassword(user.password),
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        )
    }

    async login(login: LoginDTO) {
        const user = await this.userModel.findOne({userName: login.username})
        if (!user) {
            throw new HttpException('Username is not exist', HttpStatus.FORBIDDEN)
        }
        if (!bcryptjs.compareSync(login.password, user.password)) {
            throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN)
        }
        return {
            accessToken: await this.jwtService.signAsync({userName: user.userName, sub: user.id})
        }
    }

    async changePassword(userName: string, password: string) {
        return this.userModel.findOneAndUpdate(
            {userName: userName},
            {$set: {password: this.hashPassword(password)}},
            {new: true});
    }

    async authentication(userName: string, password: string) {
        const user = await this.userModel.findOne({userName: userName})
        const check = bcryptjs.compareSync(password, user.password)
        if (!user || !check) {
            return false;
        }
        return user;
    }

    private hashPassword(password: string) {
        return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8));
    }
}