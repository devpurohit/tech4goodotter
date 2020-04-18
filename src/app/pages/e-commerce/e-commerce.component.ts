import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnalyticsService } from '../../services/analytics.service';

@Component({
    selector: 'ngx-ecommerce',
    templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {
    constructor(private http: HttpClient, private analyticsService: AnalyticsService) { }

    ngOnInit() {
        this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
            this.analyticsService.addLog(res.ip);
        });
    }
}
