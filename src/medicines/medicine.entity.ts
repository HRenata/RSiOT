import { ApiProperty } from "@nestjs/swagger";
import { Recipe } from "src/recipes/recipe.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Medicine {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @OneToOne(() => Recipe, recipe => recipe.medicine)
    recipe: Recipe;
}