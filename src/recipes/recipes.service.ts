import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipesService extends TypeOrmCrudService<Recipe>{
    constructor(@InjectRepository(Recipe) repo) {
        super(repo)
    }
}