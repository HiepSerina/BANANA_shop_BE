import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Item, ItemDocument} from "../../schemas";
import {filterItemDTO} from "./item.dto";

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    ) {
    }

    async getAll() {
        return await this.itemModel.find().sort('-updatedAt').exec();
    }

    async create(item: Item) {
        const newItem = new this.itemModel(item);
        return await newItem.save();
    }

    async getById(id: string) {
        return await this.itemModel.findById(id).exec();
    }

    async update(id: string, item: Item) {
        return this.itemModel.findByIdAndUpdate(id, item, {
            new: true,
        });
    }

    async delete(id: string) {
        await this.itemModel.findByIdAndRemove(id);
    }

    async filter(filterItem: filterItemDTO) {
        if (filterItem.nameSuggestions) {
            filterItem.name = { $regex: filterItem.nameSuggestions, $options: 'i' };
            delete filterItem.nameSuggestions;
        }
        if( filterItem.maxFloat && filterItem.minFloat) {
            filterItem.weaponFloat = {$gte: filterItem.minFloat, $lte: filterItem.maxFloat}
            delete filterItem.maxFloat;
            delete filterItem.minFloat;
        }
        if( filterItem.maxPrice && filterItem.minPrice) {
            filterItem.price = {$gte: filterItem.minPrice, $lte: filterItem.maxPrice}
            delete filterItem.maxPrice;
            delete filterItem.minPrice;
        }
        const sortField = filterItem.sortBy || '-updatedAt';
        delete filterItem.sortBy;
        return await this.itemModel.find(filterItem).sort(sortField).exec();
    }
}