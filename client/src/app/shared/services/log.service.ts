import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Log, Message } from '../interfaces'

@Injectable({
    providedIn: 'root',
})
export class LogService {
    constructor(private http: HttpClient) {}

    fetch(): Observable<Log[]> {
        return this.http.get<Log[]>(`/api/log`)
    }

    create(log: Log): Observable<Log> {
        return this.http.post<Log>('/api/log', log)
    }

    delete(): Observable<Message> {
        return this.http.delete<Message>(`/api/log/`)
    }
}
