import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {Item} from "../../schemas";
import {ItemService} from "./item.service";
import {AuthenticationGuard} from "../auth/guard/auth.guard";
import {filterItemDTO} from "./item.dto";

//@UseGuards(AuthenticationGuard)
@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {
    }

    @Get()
    async getAll() {
        return await this.itemService.getAll();
    }

    @Get('/filter')
    async filter(@Query() filterItem:filterItemDTO){
        return await this.itemService.filter(filterItem)
    }

    @Post()
    async create(@Body() item: Item) {
        return await this.itemService.create(item);
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        return await this.itemService.getById(id);
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() item: Item,
    ) {
        return await this.itemService.update(id, item);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        await this.itemService.delete(id);
    }
}