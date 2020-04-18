import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { NgoService } from '../../../services/ngo.service';

@Component({
    selector: 'ngx-d3-pie-geography',
    template: `
    <ngx-charts-pie-chart *ngIf="results.length !== 0"
      [scheme]="colorScheme"
      [results]="results"
      [legend]="showLegend"
      [labels]="showLabels">
    </ngx-charts-pie-chart>
  `,
})
export class D3PieGeographyComponent implements OnDestroy, OnInit {
    results = [

    ];
    showLegend = true;
    showLabels = true;
    colorScheme: any;
    themeSubscription: any;

    constructor(private theme: NbThemeService, private ngoService: NgoService) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            const colors: any = config.variables;
            this.colorScheme = {
                domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
            };
        });
    }

    ngOnInit() {
        this.ngoService.getNgo().subscribe(data => {
            this.setData(data);
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }

    setData(data) {
        const pre_render = {};
        data.forEach(element => {
            pre_render[element.state] = pre_render[element.state] ? pre_render[element.state] + 1 : 1;
        });
        for (const i of Object.keys(pre_render)) {
            this.results.push({ name: `${i}`, value: pre_render[i] });
        }

    }
}
