import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../interfaces'
import { tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token = null

    constructor(private http: HttpClient) {}

    register(user: User): Observable<User> {
        return this.http.post<User>('/api/auth/register', user)
    }

    login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
            tap(({ token }) => {
                localStorage.setItem('auth-token', token)
                let usrname = user.email
                localStorage.setItem('user', usrname)
                let userType =
                    user.email == '12admin34@gmail.com' ? 'admin' : 'user'
                localStorage.setItem('userType', userType)
                this.setToken(token)
            })
        )
    }

    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }
    isAdmin(): boolean {
        return localStorage.userType == 'admin'
    }

    logout() {
        this.setToken(null)
        localStorage.clear()
    }
}
