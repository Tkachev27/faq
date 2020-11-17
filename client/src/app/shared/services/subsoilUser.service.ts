import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Message, SubsoilUser } from '../interfaces'

@Injectable({
    providedIn: 'root',
})
export class SubsoilUserService {
    constructor(private http: HttpClient) {}
    fetch(): Observable<SubsoilUser[]> {
        return this.http.get<SubsoilUser[]>(`/api/subsoilUser`)
    }

    create(subsoilUsers: Array<SubsoilUser>): Observable<SubsoilUser[]> {
        return this.http.post<SubsoilUser[]>('/api/subsoilUser', subsoilUsers)
    }

    delete(subsoilUser: SubsoilUser): Observable<Message> {
        return this.http.delete<Message>(`/api/subsoilUser/${subsoilUser._id}`)
    }

    // getById(id: string): Observable<Brand> {
    //     return this.http.get<Brand>(`/api/brand/${id}`)
    // }
    // update(brand: Brand): Observable<Brand> {
    //     return this.http.patch<Brand>(`/api/brand/${brand._id}`, brand)
    // }
}
