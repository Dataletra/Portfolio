import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Header } from '../header/header';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-legal-notice',
    imports: [Header],
    templateUrl: './legal-notice.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './legal-notice.scss',
})
export class LegalNotice {
    protected i18n = inject(TranslationService);
}
