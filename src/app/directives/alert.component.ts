import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../services';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscptn: Subscription;
    message: any;

    constructor(private alertServc: AlertService) { }

    ngOnInit() {
        this.subscptn = this.alertServc.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnDestroy() {
        // Destroying component on unload
        this.subscptn.unsubscribe();
    }
}