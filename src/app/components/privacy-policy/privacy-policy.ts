import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Header } from '../header/header';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-privacy-policy',
    imports: [Header],
    templateUrl: './privacy-policy.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {
    protected i18n = inject(TranslationService);
}
