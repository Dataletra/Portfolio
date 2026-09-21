import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Core } from './core/core';
import { TextMarquee } from './text-marquee/text-marquee';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Core, TextMarquee],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
