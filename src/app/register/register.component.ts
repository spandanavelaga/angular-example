import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private usrServc: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        // Using formbuilder to write basic validations
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        // If the form is invalid then stop user to proceed further
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.usrServc.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('User registerd successfully', true);
                    // Then navigating user to login
                    this.router.navigate(['/login']);
                },
                error => {
                    // Alerting user when error happened
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
