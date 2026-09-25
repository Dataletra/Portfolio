import { Component } from '@angular/core';

interface ColleagueReview {
  name: string;
  role: string;
  quote: string;
}

type CardPosition = 'active' | 'prev' | 'next';

@Component({
  selector: 'app-colleagues',
  templateUrl: './colleagues.html',
  styleUrl: './colleagues.scss'
})
export class Colleagues {
  // Replace with real testimonials and initials.
  protected readonly reviews: ColleagueReview[] = [
    {
      name: 'Name Surname',
      role: 'Job Title',
      quote:
        '1',
    },
    {
      name: 'Name Surname',
      role: 'Job Title',
      quote:
        '2',
    },
    {
      name: 'Name Swirklich sehr langer name und so urname',
      role: 'Job Title',
      quote:
        'Name Swirklich sehr langer name und so urnameName Swirklich sehr langer name und so urnameName Swirklich sehr langer name und so urnameName Swirklich sehr langer name und so urnameName Swirklich sehr langer name und so urname',
    }
  ];

  protected activeIndex = 0;

  protected next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.reviews.length;
  }

  protected prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  protected goTo(index: number): void {
    this.activeIndex = index;
  }

  protected positionOf(index: number): CardPosition {
    const offset = (index - this.activeIndex + this.reviews.length) % this.reviews.length;
    if (offset === 0) return 'active';
    if (offset === 1) return 'next';
    return 'prev';
  }
}