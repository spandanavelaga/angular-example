import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Loading app specific services and components

import { fakeBackendProvider } from './helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './directives';
import { AppAuthGuard } from './guards';
import { AuthInterceptor, AppErrorInterceptor } from './helpers';
import { AlertService, AuthenticationService, UserService } from './services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        // Importing app components
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        // Adding the app level reusable services to the app
        AppAuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        // Proving interceptor options to the auth and validate the services
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppErrorInterceptor, multi: true },

        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }