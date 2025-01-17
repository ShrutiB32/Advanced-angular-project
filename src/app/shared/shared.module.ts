import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class SharedModule{}