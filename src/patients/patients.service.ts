import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Patient } from './patient.entity';


@Injectable()
export class PatientsService extends TypeOrmCrudService<Patient>{
    constructor(@InjectRepository(Patient) repo) {
        super(repo)
    }
}
