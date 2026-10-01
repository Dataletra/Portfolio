import { Component } from '@angular/core';
import { TextMarquee } from '../text-marquee/text-marquee';

@Component({
  selector: 'app-landing',
  imports: [TextMarquee],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
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
