import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    templateUrl: './footer.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './footer.scss',
})
export class Footer {
    private router = inject(Router);
    protected i18n = inject(TranslationService);

    private currentUrl = toSignal(
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            map((event) => event.urlAfterRedirects),
            startWith(this.router.url)
        ),
        { initialValue: this.router.url }
    );

    isTransparentFooter = computed(() => {
        const cleanUrl = this.currentUrl().split(/[?#]/)[0];
        return cleanUrl === '/legal-notice' || cleanUrl === '/privacy-policy';
    });

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
