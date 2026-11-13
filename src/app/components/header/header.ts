import { Component, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
    private router = inject(Router);
    private ngZone = inject(NgZone);
    protected i18n = inject(TranslationService);

    menuOpen = false;

    // A signal (not a plain field) so the template updates even though the value
    // is set from a manual scroll listener, in zone-based and zoneless apps alike.
    isScrolledPast100Dvh = signal(false);

    private readonly onScroll = () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Setting a signal to the value it already has does nothing,
        // so the view is only refreshed when the state actually flips.
        this.isScrolledPast100Dvh.set(currentScroll >= window.innerHeight);
    };

    ngOnInit() {
        // Keep the high-frequency scroll event out of Angular's change detection.
        this.ngZone.runOutsideAngular(() => {
            // capture: true -> also catches scrolling when body/another wrapper is the
            // scroll container instead of the window (scroll events don't bubble).
            document.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
        });

        // Correct initial state, e.g. after a reload in the middle of the page.
        this.onScroll();
    }

    ngOnDestroy() {
        document.removeEventListener('scroll', this.onScroll, { capture: true });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    scrollToSection(sectionId: string) {
        this.menuOpen = false;
        if (this.router.url === '/' || this.router.url.startsWith('/#')) {
            this.performScroll(sectionId);
        } else {
            this.router.navigate(['/']).then(() => {
                setTimeout(() => {
                    this.performScroll(sectionId);
                }, 100);
            });
        }
    }

    private performScroll(sectionId: string) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
