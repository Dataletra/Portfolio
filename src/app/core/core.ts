import { Component } from '@angular/core';
import { Landing } from '../landing/landing';

@Component({
  selector: 'app-core',
  imports: [Landing],
  templateUrl: './core.html',
  styleUrl: './core.scss',
})
export class Core { }
