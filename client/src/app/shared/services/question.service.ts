import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Question, Message } from '../interfaces'

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    constructor(private http: HttpClient) {}

    fetch(categoryId: string): Observable<Question[]> {
        return this.http.get<Question[]>(`/api/question/all/${categoryId}`)
    }
    find(req: string): Observable<Question[]> {
        return this.http.get<Question[]>(`/api/question/find/${req}`)
    }
    getById(id: String): Observable<Question> {
        return this.http.get<Question>(`/api/question/${id}`)
    }
    getByIdUser(id: String): Observable<any> {
        return this.http.get<any>(`/api/question/user/${id}`)
    }

    create(question: Question): Observable<Question> {
        return this.http.post<Question>('/api/question', question)
    }

    delete(question: Question): Observable<Message> {
        return this.http.delete<Message>(`/api/question/${question._id}`)
    }
    update(question: Question): Observable<Question> {
        return this.http.patch<Question>(
            `/api/Question/${question._id}`,
            question
        )
    }
}
