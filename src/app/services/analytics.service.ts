import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/observable';


import { Analytics } from '../models/analytics.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
    private months: String[] = ['January',
        'February',
        'March',
        'April',
        'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;
    constructor(private http: HttpClient) { }

    addLog(ip: string) {
        console.info(ip)
        const date = new Date();
        const log: Analytics = {
            ip, month: this.months[date.getMonth().toString()],
            year: date.getFullYear().toString(),
        };

        this.http.post<any>('http://localhost:3000/api/log/add', log).subscribe(data => {
        });
    }

    getLog(year: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('year', year);
        return this.http.get<any>('http://localhost:3000/api/log/getAll', { params });
    }

    getOuterLine(year: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('year', year);
        return this.http.get<any>('http://localhost:3000/api/log/getOuterLine', { params });
    }

    getChartData(year: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('year', year);
        return this.http.get<any>('http://localhost:3000/api/log/getChart', { params });
    }

}
