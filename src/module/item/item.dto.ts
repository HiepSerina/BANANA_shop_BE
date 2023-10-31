export class filterItemDTO{
    name:{ $regex: string; $options: string };
    nameSuggestions:string;
    type:string;
    category:string;
    weaponCategory:string;
    weaponExterior:string;
    weaponFloat:{ $gte: number; $lte: number };
    weaponQuality:string;
    price:{ $gte: number; $lte: number };
    minPrice:number;
    maxPrice:number;
    minFloat:number;
    maxFloat:number;
    sortBy:string;
}