import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';

@Crud({ 
    model: {
        type: Patient
    }
})

@Controller('patients')
export class PatientsController implements CrudController<Patient> {
    constructor(public service: PatientsService) {}
}
