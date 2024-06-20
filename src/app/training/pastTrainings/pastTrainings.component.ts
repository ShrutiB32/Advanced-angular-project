import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IExercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer'


@Component({
  selector: 'app-pastTrainings',
  templateUrl: './pastTrainings.component.html',
  styleUrls: ['./pastTrainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  displayedColumns = ['date', 'name', 'calories','duration', 'state'];
  dataSource = new MatTableDataSource<IExercise>();
  
  constructor(private trainingService: TrainingService,private store:Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises : IExercise[]) => {
        this.dataSource.data = exercises;
      });
    this.trainingService.fetchCompletedOrCancelledExercise();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort =this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterdata:any) {
    const filterValue = filterdata.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

