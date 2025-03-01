import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, startWith } from 'rxjs';

export type GameScore = {
  lakers: number;
  denver: number;
};

@Injectable({
  providedIn: 'root'
})

export class ScoreService {
  private readonly API = 'http://localhost:3000/api/games';
  private readonly sseSource = new EventSource(`${this.API}/scores`);
  private readonly http = inject(HttpClient);
  private readonly scoreSubject$ = new Subject<GameScore>();
  public scores$ = this.scoreSubject$.asObservable().pipe(
    startWith({
      lakers: 0,
      denver: 0,
    })
  );

  private getFeed(): void {
    this.sseSource.addEventListener('message', (e: MessageEvent) => {
      const { game } = JSON.parse(e.data);

      this.scoreSubject$.next(game);
    });

    this.sseSource.onerror = () => {
      console.error('😭 sse error');
    };
  }

  public start(): void {
    this.getFeed();
  }
  public stop(): void {
    this.http.post(`${this.API}/stop`, {}).subscribe(() => {
      console.log('✋🏼');
      this.scoreSubject$.complete();
    });
  }
}
