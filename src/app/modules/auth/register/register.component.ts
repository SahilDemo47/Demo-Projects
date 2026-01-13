import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      company: ['', Validators.required]
    });
  }
showSnack(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration: 3000,
    });
  }


 register() {
    this.authService.register(this.form.value).subscribe({
    next: () => {
      this.showSnack('Registration successful', 'success');
      this.router.navigate(['/login']);
    },
 error: (err) => {

  let errorBody: any = err.error;


  if (typeof err.error === 'string') {
    try {
      errorBody = JSON.parse(err.error);
    } catch {
      this.showSnack('Registration failed', 'error');
      return;
    }
  }


  if (errorBody?.errors) {
    const messages: string[] = [];

    for (const key in errorBody.errors) {
      messages.push(...errorBody.errors[key]);
    }

    this.showSnack(messages.join(', '), 'error');
    return;
  }

    }
  });
}  
}
