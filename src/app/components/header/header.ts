import { Component, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
    private router = inject(Router);
    private ngZone = inject(NgZone);
    menuOpen = false;
    isScrolledPast100Dvh = signal(false);

    private readonly onScroll = () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isScrolledPast100Dvh.set(currentScroll >= window.innerHeight);
    };

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            document.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
        });

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
