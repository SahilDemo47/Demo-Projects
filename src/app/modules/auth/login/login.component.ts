import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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


 login() {
  this.authService.login(this.form.value).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.token);
      this.showSnack('Login successful', 'success');
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {

 
      if ( err.error?.errors) {
        const messages = Object.values(err.error.errors).flat();
        this.showSnack(messages.join(', '), 'error');
        return;
      }
    }
  });
}
}
