import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
    {
        path: '', component: NxWelcomeComponent
    },
    {
        path: 'score', component: AppComponent
    }
];
