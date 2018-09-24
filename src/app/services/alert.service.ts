import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertService {
    private subjectEvent = new Subject<any>();
    private holdNavigation = false;

    constructor(private router: Router) {

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.holdNavigation) {

                    this.holdNavigation = false;
                } else {

                    this.subjectEvent.next();
                }
            }
        });
    }

    success(message: string, holdNavigation = false) {
        this.holdNavigation = holdNavigation;
        this.subjectEvent.next({ type: 'success', text: message });
    }

    error(message: string, holdNavigation = false) {
        this.holdNavigation = holdNavigation;
        this.subjectEvent.next({ type: 'error', text: message });
    }

    getMessage(): Observable<any> {
        return this.subjectEvent.asObservable();
    }
}