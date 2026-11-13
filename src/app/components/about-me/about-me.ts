import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './about-me.scss',
})
export class AboutMe {
  protected i18n = inject(TranslationService);
}
