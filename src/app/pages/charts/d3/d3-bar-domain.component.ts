import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { NgoService } from '../../../services/ngo.service';


@Component({
    selector: 'ngx-d3-bar-domain',
    template: `
    <ngx-charts-bar-vertical *ngIf="results.length !== 0"
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarDomainComponent implements OnDestroy, OnInit {

    results = [

    ];
    showLegend = true;
    showXAxis = true;
    showYAxis = true;
    xAxisLabel = 'Country';
    yAxisLabel = 'Population';
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
        const domainMap = {
            'health': 'Health Sanitation',
            'skill': 'Skill Build',
            'env': 'Environment',
            'edu': 'Education',
            'tech': 'Tech Solutions',
            'hunger': 'Zero Hunger',
            'gender': 'Gender Rights',
            'human': 'Human Rights',
            'women': 'Women Rights',
            'child': 'Child Care',
            'disaster': 'Disaster Mgmt',
            'employ': 'Employment',
        };
        const pre_render = {};
        data.forEach(element => {
            pre_render[element.domain] = pre_render[element.domain] ? pre_render[element.domain] + 1 : 1;
        });
        for (const i of Object.keys(pre_render)) {
            this.results.push({ name: `${domainMap[i]}`, value: pre_render[i] });
        }
    }
}
