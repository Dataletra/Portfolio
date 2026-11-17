import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface ColleagueReview {
    name: string;
    role: string;
    quote: string;
}

type CardPosition = 'active' | 'prev' | 'next';
const SWIPE_THRESHOLD = 50;

@Component({
    selector: 'app-colleagues',
    templateUrl: './colleagues.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './colleagues.scss',
})
export class Colleagues {
    protected i18n = inject(TranslationService);
    protected readonly reviews = computed(() => this.i18n.tRaw<ColleagueReview[]>('colleagues.reviews') ?? []);
    protected activeIndex = 0;

    private swipeActive = false;
    private swipeHandled = false;
    private swipeStartX = 0;
    private swipeStartY = 0;

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

    protected onCardClick(index: number): void {
        if (this.swipeHandled) {
            this.swipeHandled = false;
            return;
        }
        this.goTo(index);
    }

    protected positionOf(index: number): CardPosition {
        const offset = (index - this.activeIndex + this.reviews().length) % this.reviews().length;
        if (offset === 0) return 'active';
        if (offset === 1) return 'next';
        return 'prev';
    }

    // ---------- swipe ----------
    protected onPointerDown(event: PointerEvent): void {
        if (event.pointerType === 'mouse') return;
        this.swipeActive = true;
        this.swipeHandled = false;
        this.swipeStartX = event.clientX;
        this.swipeStartY = event.clientY;
    }

    protected onPointerUp(event: PointerEvent): void {
        if (!this.swipeActive) return;
        this.swipeActive = false;
        const deltaX = event.clientX - this.swipeStartX;
        const deltaY = event.clientY - this.swipeStartY;
        if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

        this.swipeHandled = true;
        if (deltaX < 0) {
            this.next();
        } else {
            this.prev();
        }
    }

    protected onPointerCancel(): void {
        this.swipeActive = false;
    }
}
