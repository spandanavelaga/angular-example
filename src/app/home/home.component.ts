import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService } from '../services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userServc: UserService) {
        // Getiing the current user from coockies
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // Loaidng all existing users
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userServc.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userServc.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}