import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot  from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private user!: User | null;
  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService : TrainingService , private uiService :UiService, private store: Store<fromRoot.State>) {}


  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        // this.isAuthenticated = true;
        // this.authChange.next(true);

        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      }
      else {
        this.trainingService.cancelSubscriptions();
        // this.authChange.next(false);

        this.store.dispatch(new Auth.SetUnauthenticated());
        // this.router.navigate(['/login']);
        this.router.navigate(['/home']);
        this.isAuthenticated = false;
      }
      
    });
  }

  registerUser(authData: AuthData) {
    // this.user = {
    //     email: authData.email,
    //     userId: Math.round(Math.random() * 10000).toString()
    // };

    // this.uiService.loadingStateChanged.next(true);

    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result:any) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error:any) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message,null,{
          duration: 3000
        });
      });
    
  }

  login(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString(),
    // };

    // this.uiService.loadingStateChanged.next(true);

    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((result:any) => {
      // this.uiService.loadingStateChanged.next(false);

      this.store.dispatch(new UI.StopLoading());
    })
    .catch((error:any) => {
      // this.uiService.loadingStateChanged.next(false);

      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message,null,{
        duration: 3000
      });
    });
  }

  logout() {
    // this.user = null;
    this.afAuth.signOut();
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
