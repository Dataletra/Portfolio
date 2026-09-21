import { Component } from '@angular/core';
import { Landing } from '../landing/landing';
import { AboutMe } from '../about-me/about-me';
import { Technologies } from '../technologies/technologies';
import { FeaturedProjects } from '../featured-projects/featured-projects';
import { Colleagues } from '../colleagues/colleagues';
import { ContactMe } from '../contact-me/contact-me';

@Component({
  selector: 'app-core',
  imports: [Landing, AboutMe, Technologies, FeaturedProjects, Colleagues, ContactMe],
  templateUrl: './core.html',
  styleUrl: './core.scss',
})
export class Core { }
