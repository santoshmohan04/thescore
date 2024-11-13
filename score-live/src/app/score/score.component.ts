import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent {
  private readonly scoreService = inject(ScoreService);
  public gameScore$ = this.scoreService.scores$;

  public stop(): void {
    this.scoreService.stop();
  }
  public start(): void {
    this.scoreService.start();
  }
}
