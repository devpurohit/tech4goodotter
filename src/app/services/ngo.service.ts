import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/observable';


import { Ngo } from '../models/ngo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NgoService {

    constructor(private http: HttpClient) { }

    addNgo(ngo: Ngo) {
        this.http.post<any>('http://localhost:3000/api/ngo/add', ngo).subscribe(data => {
        });
    }

    getNgo(): Observable<any> {
        return this.http.get<any>('http://localhost:3000/api/ngo/getAll');
    }

}
