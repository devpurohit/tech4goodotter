import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { NgoService } from '../../../services/ngo.service';


@Component({
    selector: 'ngx-d3-advanced-pie-compliance',
    template: `
    <ngx-charts-advanced-pie-chart *ngIf='single.length !== 0'
      [scheme]="colorScheme"
      [results]="single">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class D3AdvancedPieComplianceComponent implements OnDestroy, OnInit {
    single = [

    ];
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

    setData(data) {
        const init_data = {
            '12 A': 0, '80 G': 0, 'FCRA': 0,
        };
        data.forEach(element => {
            element.a12 ? init_data['12 A']++ : null;
            element.g80 ? init_data['80 G']++ : null;
            element.fcra ? init_data['FCRA']++ : null;
        });
        for (const key in init_data) {
            if (init_data.hasOwnProperty(key)) {
                this.single.push({ name: key, value: init_data[key] });
            }
        }

    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}
