import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      if (typeof email === 'string' && typeof password === 'string') {
        this.authService.register(email, password).subscribe(
          (response: any) => {
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Registration failed', error);
          }
        );
      } else {
        console.error('Invalid email or password');
      }
    }
  }
}
