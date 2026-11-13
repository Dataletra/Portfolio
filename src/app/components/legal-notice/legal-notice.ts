import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Header } from '../header/header';

@Component({
  selector: 'app-legal-notice',
  imports: [Header],
  templateUrl: './legal-notice.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {}
