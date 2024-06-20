import { Component, OnInit,OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit{
  ongoingTraining$ !: Observable<boolean>;
  // exerciseSubscription!: Subscription;
  constructor(private trainingService:TrainingService, private store: Store<fromTraining.State>) { }
  ngOnInit() {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
    //   (exercise) => {
    //     if(exercise) {
    //       this.ongoingTraining = true;
    //     }
    //     else {
    //       this.ongoingTraining = false;
    //     }
        
    //   }
    // );

    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

  
}