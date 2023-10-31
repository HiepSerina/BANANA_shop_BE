import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {User} from "../../schemas";
import {ChangePasswordRequestDto} from "./dto/changePassword.dto";
import {AuthService} from "./auth.service";
import {LoginDTO} from "./dto/login.dto";
import {LocalAuthGuard} from "./guard/local.guard";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    async signUp(@Body() user: User) {
        return await this.authService.createNewUser(user);
    }
    
    @Post('login')
    async login(@Body() login: LoginDTO) {
        return await this.authService.login(login);
    }

    @Post('change-password')
    async changePassword(@Body() changePassword: ChangePasswordRequestDto) {
        const userName = changePassword.username;
        const password = changePassword.password
        return await this.authService.changePassword(userName, password);
    }
}