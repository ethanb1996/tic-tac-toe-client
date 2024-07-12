import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private currentPlayerSubject: BehaviorSubject<string> = new BehaviorSubject<string>('X');
  
  currentPlayer$ = this.currentPlayerSubject.asObservable();

  togglePlayer(): void {
    const nextPlayer = this.currentPlayerSubject.value === 'X' ? 'O' : 'X';
    this.currentPlayerSubject.next(nextPlayer);
  }

  resetPlayer(): void {
    this.currentPlayerSubject.next('X');
  }
}