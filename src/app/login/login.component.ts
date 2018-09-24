import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authServc: AuthenticationService,
        private alertServc: AlertService) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });


        this.authServc.logout();


        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // Returning if the form is not valid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authServc.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertServc.error(error);
                    this.loading = false;
                });
    }
}
