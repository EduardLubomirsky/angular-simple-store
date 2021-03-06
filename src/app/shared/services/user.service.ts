
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/usr.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:3000/users`);
    }

    getById(id: number) {
        return this.http.get(`http://localhost:3000/users/${id}`);
    }

    register(user: User) {
        debugger;
        return this.http.post(`http://localhost:3000/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`http://localhost:3000/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:3000/users/${id}`);
    }
}