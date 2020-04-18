import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { OutlineData, VisitorsAnalyticsData } from '../data/visitors-analytics';
import { AnalyticsService } from '../../services/analytics.service';
import { Analytics } from '../../models/analytics.model';

@Injectable()
export class VisitorsAnalyticsService extends VisitorsAnalyticsData {
    private pieChartValue = 99;

    constructor(private analyticsService: AnalyticsService) {
        super();
    }

    getOutlineLineChartData(): Observable<OutlineData[]> {
        return this.analyticsService.getOuterLine(new Date().getFullYear().toString());
    }

    getPieChartData(): Observable<number> {
        return this.analyticsService.getChartData(new Date().getFullYear().toString());
    }
}
