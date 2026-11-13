import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-text-marquee',
  imports: [],
  templateUrl: './text-marquee.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './text-marquee.scss',
})
export class TextMarquee {
  protected i18n = inject(TranslationService);
}
