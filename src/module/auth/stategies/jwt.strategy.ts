import { PassportStrategy } from '@nestjs/passport';
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthPayload} from "../dto/auth-payload.dto";
import {jwtConstants} from "../auth.constant";

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    async validate(payload: AuthPayload) {
        return { name: payload.userName, id: payload.id };
    }
}
