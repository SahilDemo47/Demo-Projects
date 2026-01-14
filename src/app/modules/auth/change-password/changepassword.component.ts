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
  hideOldPassword = true;
  hideNewPassword = true;

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
 toggleOldPassword() {
    this.hideOldPassword = !this.hideOldPassword;
  }

  toggleNewPassword() {
    this.hideNewPassword = !this.hideNewPassword;
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
  this.authService.changePassword(this.form.value).subscribe({
    next: (res: any) => {
      this.showSnack(res.message, 'success');
      this.authService.logout();
      this.router.navigate(['/login']);
      this.isSubmitting = false;
    },
    error: (err) => {

      let errorBody: any = err.error;

      if (typeof err.error === 'string') {
        try {
          errorBody = JSON.parse(err.error);
        } catch {
          this.showSnack('Failed to change password', 'error');
          this.isSubmitting = false;
          return;
        }
      }
      if (errorBody?.errors) {
        const messages: string[] = [];
        for (const key in errorBody.errors) {
          messages.push(...errorBody.errors[key]);
        }
        this.showSnack(messages.join(', '), 'error');
        this.isSubmitting = false;
        return;
      }
    }
  });
}
}
