import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';


import { Ngo } from '../models/ngo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NgoService {

    constructor(private http: HttpClient) { }

    addNgo(ngo: Ngo) {
        this.http.post<any>('http://admin.otterbyt4g.org:80/api/ngo/add', ngo).subscribe(data => {
        });
    }

    getNgo(): Observable<any> {
        return this.http.get<any>('http://admin.otterbyt4g.org:80/api/ngo/getAll');
    }

}
