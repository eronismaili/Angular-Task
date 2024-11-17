import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {TranslatePipe} from "@ngx-translate/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('state', [
      state('done', style({
      })),
      transition('* => done', [
        animate('0.5s')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
            window.alert('Invalid credentials! Please try again.');
          }
          else if (error.status === 400) {
            window.alert('User not found! Please check your email.');
          } else if (error.status === 404) {
            window.alert('User not found! Please check your email.');
          } else {
            window.alert('An error occurred. Please try again later.');
          }
        }
      );
    } else {
      console.error('Form is not valid');
      window.alert('Please enter valid email and password.');
    }
  }
}
