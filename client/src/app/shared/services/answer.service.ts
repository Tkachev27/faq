import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Answer, Message, Question } from '../interfaces'

@Injectable({
    providedIn: 'root',
})
export class AnswerService {
    constructor(private http: HttpClient) {}

    fetch(questionId: string): Observable<Answer[]> {
        return this.http.get<Answer[]>(`/api/answer/${questionId}`)
    }
    fetchUser(questionId: string): Observable<any[]> {
        return this.http.get<any[]>(`/api/answer/user/${questionId}`)
    }

    create(answer: Answer): Observable<Answer> {
        return this.http.post<Answer>('/api/answer', answer)
    }

    delete(answer: Answer): Observable<Message> {
        return this.http.delete<Message>(`/api/answer/${answer._id}`)
    }
    update(answer: Answer): Observable<Answer> {
        return this.http.patch<Answer>(`/api/answer/${answer._id}`, answer)
    }
}
