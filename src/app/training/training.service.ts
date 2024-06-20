import { Injectable } from '@angular/core';
import { IExercise } from './exercise.model';
import { Subject, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { pipe, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  finishedExercisesChanged = new Subject<IExercise[]>();

  // finishedExercises: IExercise[] = [];
  private availableExercises: IExercise[] = [];
  private fbSubs: Subscription[] = [];

  runningExercise: any;
  constructor(private db: AngularFirestore, private uiService : UiService, private store : Store<fromTraining.State>) {}

  fetchAvailableExercises() {
    // return this.availableExercises.slice();
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());

    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              // ...doc.payload.doc.data()
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories,
            };
          });
        })
      )
      .subscribe((exercises: IExercise[]) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercises))
        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
      }, (error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null,3000);
        // this.exercisesChanged.next([]);
      })
    );
  }

  startExercise(selectedId: any) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});

    // const selectedExercise = this.availableExercises.find(
    //   (exercise) => exercise.id === selectedId
    // );
    // this.runningExercise = selectedExercise;
    // this.exerciseChanged.next({ ...this.runningExercise });

    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  // getRunningExercise() {
  //   return { ...this.runningExercise };
  // }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).subscribe((ex:any) => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });

      // this.store.dispatch(new Training.StopTraining())
      
    });
    this.store.dispatch(new Training.StopTraining())

    // this.runningExercise = null;
    // this.exerciseChanged.next(this.runningExercise);
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe({
      next: (ex:any) => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        // duration: ex.duration || null,
        // calories: ex.calories || null,
        state: 'completed',
      });
      // this.store.dispatch(new Training.StopTraining())
    }});
    
    this.store.dispatch(new Training.StopTraining());
    // this.runningExercise = null;
    // this.exerciseChanged.next(this.runningExercise);
   
  }

  fetchCompletedOrCancelledExercise() {
    // return this.exercises.slice();
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises : any) => {
        // this.finishedExercises = exercises;
        // this.finishedExercisesChanged.next(exercises);
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  addDataToDatabase(exercise: IExercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
