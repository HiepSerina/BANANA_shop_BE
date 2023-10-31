import {Body, Controller, Delete, Get, Param, Put, Req, UseGuards} from '@nestjs/common';
import {User} from "../../schemas";
import {UserService} from "./user.service";
import {AuthenticationGuard} from "../auth/guard/auth.guard";


@UseGuards(AuthenticationGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get('/info')
    async getInfoUser(@Req() request: Request){
        return await this.userService.getInfoUser(request)
    }


    @Get()
    async getAll() {
        return await this.userService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        return await this.userService.getById(id);
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() user: User,
    ) {
        return await this.userService.update(id, user);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
    }
}