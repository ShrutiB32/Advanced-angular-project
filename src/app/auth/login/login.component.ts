import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators'
// import * as fromApp  from '../../app.reducer';
import * as fromRoot  from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  isLoading$ !: Observable<boolean>;


  constructor(private authService: AuthService,private uiService:UiService,private store:Store<fromRoot.State>) {}

  ngOnInit() {
    // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading))
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    // this.loadingSubs=this.uiService.loadingStateChanged.subscribe((isLoading:any)=>{
    //   this.isLoading=isLoading;
    // })
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  // ngOnDestroy(): void {
  //   if(this.loadingSubs) {

  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}