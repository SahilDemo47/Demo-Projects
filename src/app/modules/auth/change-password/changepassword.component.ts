import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  standalone: false
})
export class ChangePasswordComponent {

  form!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
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


  changePassword() {
    if (this.form.invalid) {
      this.showSnack('Please fill all fields correctly', 'warning');
      return;
    }

    this.isSubmitting = true;

    this.authService.changePassword(this.form.value).subscribe({
      next: (res: any) => {
        this.showSnack(res.message || 'Password changed', 'success');
        this.router.navigate(['/login']);
        this.isSubmitting = false;
      },
      error: (err) => {
        if (err.status === 401) {
          this.showSnack('Old password is incorrect', 'error');
        } else {
          this.showSnack('Failed to change password', 'error');
        }
        this.isSubmitting = false;
      }
    });
  }
}
