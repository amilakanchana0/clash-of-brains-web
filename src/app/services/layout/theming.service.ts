import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable( {
    providedIn: 'root'
} )
export class ThemingService {
    themes = [ 'dark-theme', 'light-theme' ];
    theme = new Subject();

    constructor ( private ref: ApplicationRef ) {
        // initially trigger dark mode if preference is set to dark mode on system
        const darkModeOn =
            window.matchMedia &&
            window.matchMedia( '(prefers-color-scheme: dark)' ).matches;

        if ( darkModeOn ) {
            this.theme.next( 'light-theme' );
        }

        // watch for changes of the preference
        window.matchMedia( '(prefers-color-scheme: dark)' ).addListener( e => {
            const turnOn = e.matches;
            this.theme.next( turnOn ? 'dark-theme' : 'light-theme' );

            // trigger refresh of UI
            this.ref.tick();
        } );
    }

    setTheme( theme: string ) {
        this.theme.next( theme );
    }
}