import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    private router = inject(Router);

    menuOpen = false;

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
