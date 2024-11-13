import { Controller, HttpCode, HttpStatus, Post, Sse, } from '@nestjs/common';
import { Observable, Subject, interval, map, takeUntil, tap } from 'rxjs';

type GameScore = { data: { game: { lakers: number; denver: number } } };

@Controller('games')
export class GamesController {
    private readonly actionSubject = new Subject<boolean>();
  private readonly action$ = this.actionSubject.asObservable();

  @Sse('scores')
  scores(): Observable<GameScore> {
    const game = {
        lakers: 0,
        denver: 0,
      };
      return interval(2000).pipe(
        tap(() => {
          game.lakers += Math.floor(Math.random() * 4) + 1;
          game.denver += Math.floor(Math.random() * 4) + 1;
        }),
        takeUntil(this.action$),
        map(() => ({ data: { game } }))
      );
  }

  @Post('stop')
  @HttpCode(HttpStatus.OK)
  stopCounter() {
    this.actionSubject.next(false);
  }
}
