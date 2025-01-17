import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from '../welcome/welcome.component';


const routes: Routes =[
    {path:'home', component : WelcomeComponent},
    {path:'signup', component : SignupComponent},
    {path:'login', component : LoginComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})

export class AuthRoutingModule {}