import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-technologies',
    imports: [],
    templateUrl: './technologies.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './technologies.scss',
})
export class Technologies {
    protected i18n = inject(TranslationService);
    private router = inject(Router);

    scrollToSection(sectionId: string) {
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
