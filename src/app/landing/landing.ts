import { Component } from '@angular/core';
import { TextMarquee } from '../text-marquee/text-marquee';

@Component({
  selector: 'app-landing',
  imports: [TextMarquee],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing { }
