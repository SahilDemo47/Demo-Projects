import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent {

  form!: FormGroup;
   ngOnInit(): void {
    localStorage.removeItem('token'); 
  }
  
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
  if (this.form.invalid) {
    this.toastr.warning('Please enter valid credentials');
    return;
  }

  this.authservice.login(this.form.value).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userName', res.email);

      this.toastr.success('Login successful');
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.toastr.error('Invalid email or password', 'Login Failed');
    }
  });
  
}

}
