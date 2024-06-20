import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { CurrentTrainingComponent } from './currentTraining/currentTraining.component';
import { NewTrainingComponent } from './newTraining/newTraining.component';
import { PastTrainingsComponent } from './pastTrainings/pastTrainings.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store'; 
import { trainingReducer } from './training.reducer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    AngularFirestoreModule,
    SharedModule,
    FormsModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
