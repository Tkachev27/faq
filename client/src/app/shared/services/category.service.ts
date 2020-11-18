import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category, Message } from '../interfaces'

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    fetch(): Observable<Category[]> {
        return this.http.get<Category[]>(`/api/category`)
    }

    create(category: Category): Observable<Category> {
        return this.http.post<Category>('/api/category', category)
    }

    delete(category: Category): Observable<Message> {
        return this.http.delete<Message>(`/api/category/${category._id}`)
    }
    update(category: Category): Observable<Category> {
        return this.http.patch<Category>(
            `/api/category/${category._id}`,
            category
        )
    }
}
