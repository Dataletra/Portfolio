import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface ColleagueReview {
  name: string;
  role: string;
  quote: string;
}

type CardPosition = 'active' | 'prev' | 'next';

@Component({
  selector: 'app-colleagues',
  templateUrl: './colleagues.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './colleagues.scss',
})
export class Colleagues {
  protected i18n = inject(TranslationService);
  protected readonly reviews = computed(
    () => this.i18n.tRaw<ColleagueReview[]>('colleagues.reviews') ?? [],
  );
  protected activeIndex = 0;

  protected next(): void {
    const count = this.reviews().length;
    if (count === 0) return;
    this.activeIndex = (this.activeIndex + 1) % count;
  }

  protected prev(): void {
    const count = this.reviews().length;
    if (count === 0) return;
    this.activeIndex = (this.activeIndex - 1 + count) % count;
  }

  protected goTo(index: number): void {
    this.activeIndex = index;
  }

  protected positionOf(index: number): CardPosition {
    const offset = (index - this.activeIndex + this.reviews().length) % this.reviews().length;
    if (offset === 0) return 'active';
    if (offset === 1) return 'next';
    return 'prev';
  }
}
