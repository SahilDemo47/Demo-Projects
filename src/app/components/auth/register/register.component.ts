import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
   this.form = this.fb.group({
  userName: ['', Validators.required],
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  phone: ['', Validators.required],
  company: ['', Validators.required]
});

  }

 register() {
  if (this.form.invalid) {
    this.toastr.warning('Please fill all required fields');
    return;
  }

  this.authService.register(this.form.value).subscribe({
    next: () => {
      this.toastr.success('Registration successful');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      const message =
        err.error?.errors
          ? Object.values(err.error.errors).flat().join(', ')
          : 'Registration failed';

      this.toastr.error(message);
    }
  });
}


}
