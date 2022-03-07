import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Recipe } from './recipe.entity';
import { RecipesService } from './recipes.service';

@Crud({ 
    model: {
        type: Recipe
    }
})

@Controller('recipes')
export class RecipesController implements CrudController<Recipe> {
    constructor(public service: RecipesService) {}
}