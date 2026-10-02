import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);

  scrollToSection(sectionId: string) {
    // If on main page, scroll immediately
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.performScroll(sectionId);
    } else {
      // If not on main route, navigate to main route first
      this.router.navigate(['/']).then(() => {
        // then allow to render core.html DOM before scrolling
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