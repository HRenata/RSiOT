import { ApiProperty } from "@nestjs/swagger";
import { Recipe } from "src/recipes/recipe.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    surname: string;

    @OneToOne(() => Recipe, recipe => recipe.patient)
    recipe: Recipe;
}