import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { NgoService } from '../../services/ngo.service';


interface CardSettings {
    title: string;
    iconClass: string;
    type: string;
    content: string;
}

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {


    ngosAboardCard: CardSettings;
    ngoTechTeamCard: CardSettings;
    mostWantedCard: CardSettings;
    a12Card: CardSettings;
    g80Card: CardSettings;
    fcraCard: CardSettings;
    techBudgetCard: CardSettings;
    totalBenCard: CardSettings;
    statusCards: string;

    statusCardsByThemes: {
        corporate: CardSettings[];
    };


    constructor(private themeService: NbThemeService, private ngoService: NgoService) {
        this.ngoService.getNgo().subscribe(data => {
            this.setData(data);
            this.themeService.getJsTheme()
                .subscribe(theme => {
                    this.statusCards = this.statusCardsByThemes[theme.name];
                });
        });
    }

    setData(ngos) {
        const totalNgos = ngos.length;
        let totalTechTeam = 0;
        let total12a = 0;
        let total80g = 0;
        const toolMap = {};
        let fcra = 0;
        let techBudget = 0;
        let totalBen = 0;

        ngos.forEach(ngo => {
            ngo.techteam ? totalTechTeam++ : null;
            ngo.a12 ? total12a++ : null;
            ngo.g80 ? total80g++ : null;
            ngo.fcra ? fcra++ : null;
            ngo.budget ? techBudget++ : null;
            totalBen += ngo.benificiaries;
            for (const tool of ngo.toolsapplied) {
                if (toolMap.hasOwnProperty(tool)) {
                    toolMap[tool]++;
                }
                else {
                    toolMap[tool] = 1;
                }
            }
        });

        this.ngosAboardCard = {
            title: `${totalNgos}`,
            iconClass: 'nb-lightbulb',
            content: `NGO's Aboard`,
            type: 'primary',
        };

        this.ngoTechTeamCard = {
            title: `${totalTechTeam}`,
            iconClass: 'nb-roller-shades',
            type: 'success',
            content: `NGO's have internal Tech Team`,
        };

        this.mostWantedCard = {
            title: `${this.getMax(toolMap)}`,
            iconClass: 'nb-audio',
            type: 'info',
            content: `Most Wanted Tools`,
        };

        this.a12Card = {
            title: `${total12a}`,
            iconClass: 'nb-coffee-maker',
            type: 'warning',
            content: `NGO's have valid 12A`,
        };

        this.g80Card = {
            title: `${total80g}`,
            iconClass: 'nb-partlysunny',
            type: 'warning',
            content: `NGO's have valid 80G`,

        };

        this.fcraCard =
        {
            title: `${fcra}`,
            iconClass: 'nb-flame-circled',
            type: 'warning',
            content: `NGO's have valid FCRA`,
        };

        this.techBudgetCard = {
            title: `${techBudget}`,
            iconClass: ' nb-drops',
            type: 'warning',
            content: `NGO's have tech budget`,
        };

        this.totalBenCard = {
            title: `${totalBen}`,
            iconClass: 'nb-star',
            type: 'warning',
            content: `Total benificiaries impacted`,
        };

        // Creating theme pack after editing
        this.statusCardsByThemes = {
            corporate: [
                {
                    ...this.ngosAboardCard,
                    type: 'warning',
                },
                {
                    ...this.ngoTechTeamCard,
                    type: 'primary',
                },
                {
                    ...this.mostWantedCard,
                    type: 'danger',
                },
                {
                    ...this.a12Card,
                    type: 'success',
                },
                {
                    ...this.g80Card,
                    type: 'info',
                },
                {
                    ...this.fcraCard,
                    type: 'danger',
                },
                {
                    ...this.techBudgetCard,
                    type: 'primary',
                },
                {
                    ...this.totalBenCard,
                    type: 'success',
                },
            ],
        };
    }

    getMax(toolMap) {
        let wanted;
        let maxCount;
        for (const i of Object.keys(toolMap)) {
            if (!maxCount) {
                wanted = i;
                maxCount = toolMap[i];
            }
            else if (maxCount < toolMap[i]) {
                wanted = i;
                maxCount = toolMap[i];
            }
        }
        return wanted;
    }
}
