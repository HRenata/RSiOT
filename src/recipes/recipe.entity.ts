import { ApiProperty } from "@nestjs/swagger";
import { Medicine } from "src/medicines/medicine.entity";
import { Patient } from "src/patients/patient.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    
    @OneToOne(() => Medicine, medicine => medicine.id)
    @ApiProperty()
    @JoinColumn()
    medicine: number;

    
    @OneToOne(() => Patient, patient => patient.id)
    @ApiProperty()
    @JoinColumn()
    patient: number;
}