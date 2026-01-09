import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordResponse } from 'src/models/change-password-response.model';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  standalone:false
})
export class ChangePasswordComponent {

  form!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  changePassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.warning('Please fill all fields correctly');
      return;
    }

    this.isSubmitting = true;

    this.authService.changePassword(this.form.value).subscribe({
      next: (res: ChangePasswordResponse) => {
        if (res.isSuccess) {
          this.toastr.success(res.message);
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(res.message);
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to change password');
        this.isSubmitting = false;
      }
    });
  }
}
