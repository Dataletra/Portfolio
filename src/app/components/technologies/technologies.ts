import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-technologies',
  imports: [],
  templateUrl: './technologies.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './technologies.scss',
})
export class Technologies {
  protected i18n = inject(TranslationService);
}
