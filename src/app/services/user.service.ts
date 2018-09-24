import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    // To get all existing user
    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
    // To Get user by id
    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/` + id);
    }
    // Make user to register
    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }
    // Update user by Id
    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    }
    // Delete user by id
    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/` + id);
    }
}