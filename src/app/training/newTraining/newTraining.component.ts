import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { IExercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from 'src/app/shared/ui.service';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-newTraining',
  templateUrl: './newTraining.component.html',
  styleUrls: ['./newTraining.component.scss'],
})
export class NewTrainingComponent implements OnInit{
  @Output() trainingStart = new EventEmitter();
  exercises$ !: Observable<IExercise[]>;
  isLoading$!:Observable<boolean>;
  


  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store:Store<fromTraining.State>
  ) {}

  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();
    // this.exercises = this.db.collection('availableExercises').valueChanges();

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    // this.trainingStart.emit();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
