import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMarquee } from './text-marquee';

describe('TextMarquee', () => {
  let component: TextMarquee;
  let fixture: ComponentFixture<TextMarquee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextMarquee],
    }).compileComponents();

    fixture = TestBed.createComponent(TextMarquee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
