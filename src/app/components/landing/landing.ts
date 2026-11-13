import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TextMarquee } from '../text-marquee/text-marquee';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-landing',
  imports: [TextMarquee],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landing.scss',
})
export class Landing {
  protected i18n = inject(TranslationService);

  scrollToAboutMe() {
    const targetElement = document.getElementById('scroll-about-me');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrollToFeaturedProjects() {
    const targetElement = document.getElementById('scroll-featured-projects');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrollToContactMe() {
    const targetElement = document.getElementById('scroll-contact-me');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
