import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-technologies',
    imports: [],
    templateUrl: './technologies.html',
    styleUrl: './technologies.scss',
})
export class Technologies {
    protected i18n = inject(TranslationService);
}
