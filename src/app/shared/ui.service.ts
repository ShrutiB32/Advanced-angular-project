import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  // loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(message:any, action:any, duration:any) {
    this.snackbar.open(message, action, {
      duration:duration
    });
  }
}
