import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
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
  scrollToTechnologies() {
    const targetElement = document.getElementById('scroll-technologies');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
