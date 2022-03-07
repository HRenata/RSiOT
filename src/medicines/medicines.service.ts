import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Medicine } from './medicine.entity';

@Injectable()
export class MedicinesService extends TypeOrmCrudService<Medicine> {
    constructor(@InjectRepository(Medicine) repo) {
        super(repo)
    }
}
