import {Component} from '@angular/core';

@Component({
    selector: 'navigation',
    template: `
        <nav aria-labelledby="navigationheadline">
            <h2 class="accessibility" id="navigationheadline">Navigation</h2>
    
            <ul class="navigation-list" ng-show="isActive('/')">
    
                <li class="nav-items">
                    <ul>
                        <li>
                            <a routerLink="/options" class="button" accesskey="2">Optionen</a>
                        </li>
                        <li>
                            <a routerLink="/login" class="button" accesskey="1">Abmelden</a>
                        </li>
                    </ul>
                </li>
                <li class="overflow-icon">
                    <a href="#" class="button" accesskey="1">☰</a>
                </li>
            </ul>
        </nav>
        `
})

export class NavigationComponent{}