import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Medicine } from './medicine.entity';
import { MedicinesService } from './medicines.service';

@Crud({ 
    model: {
        type: Medicine
    }
})

@Controller('medicines')
export class MedicinesController implements CrudController<Medicine> {
    constructor(public service: MedicinesService) {}
}