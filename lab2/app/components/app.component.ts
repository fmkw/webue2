import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '/app/views/root.html',
})

export class AppComponent {
    showNavigation = false;

    constructor(
        private router: Router
    ) {

        router.events.subscribe
        (
            (url:any) =>
            {
                this.showNavigation = (url.url !== '/login' &&  url.url !== '/');
            }
        );
    }

    checkPermission() {
        if( this.router.url != '/login')
            this.router.navigate(['/overview']);
    }
}


