import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
import { OutlineData, VisitorsAnalyticsData } from '../../../@core/data/visitors-analytics';
import { forkJoin } from 'rxjs';


@Component({
    selector: 'ngx-ecommerce-visitors-analytics',
    styleUrls: ['./visitors-analytics.component.scss'],
    templateUrl: './visitors-analytics.component.html',
})
export class ECommerceVisitorsAnalyticsComponent implements OnDestroy, OnInit {
    private alive = false;

    pieChartValue: number;
    chartLegend: { iconColor: string; title: string }[];
    visitorsAnalyticsData: { outerLine: OutlineData[]; };

    constructor(private themeService: NbThemeService,
        private visitorsAnalyticsChartService: VisitorsAnalyticsData) {
        this.themeService.getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe(theme => {
                this.setLegendItems(theme.variables.visitorsLegend);
            });


    }
    ngOnInit() {
        forkJoin(
            this.visitorsAnalyticsChartService.getOutlineLineChartData(),
            this.visitorsAnalyticsChartService.getPieChartData(),
        )
            .subscribe(([outerLine, pieChartValue]: [any, number]) => {
                this.visitorsAnalyticsData = {
                    outerLine: outerLine,
                };
                this.pieChartValue = pieChartValue;
                this.alive = true;
            });
    }

    setLegendItems(visitorsLegend): void {
        this.chartLegend = [
            {
                iconColor: visitorsLegend.secondIcon,
                title: 'Page Views',
            },
        ];
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
