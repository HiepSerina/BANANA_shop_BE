import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from "../../schemas";
import {ExtendedHeaders} from "./user.interface";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
    }

    async getAll() {
        return await this.userModel.find().exec();
    }

    async getById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async update(id: string, user: User) {
        return this.userModel.findByIdAndUpdate(id, user, {
            new: true,
        });
    }

    async delete(id: string) {
        await this.userModel.findByIdAndRemove(id);
    }

    async getInfoUser(request: Request) {
        const bearerToken = (request.headers as ExtendedHeaders).authorization?.split('.')[1];
        const payloadJson = Buffer.from(bearerToken, 'base64').toString('utf8');
        return JSON.parse(payloadJson);
    }
}