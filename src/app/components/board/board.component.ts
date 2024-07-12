import { Component, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { io } from 'socket.io-client';
import { GameService } from 'src/app/services/game.service';
import { GameStoreService } from 'src/app/store/game-store.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private socket: any;
  private subscription!: Subscription;

  gameState: string[][] = [];

  constructor(private gameService: GameService, public gameStore: GameStoreService) { }

  ngOnInit(): void {    
    this.socket = io('http://localhost:3000');

    this.socket.on('initGame', (gameState: string[][]) => {
      this.gameState = gameState;
    });

    this.socket.on('moveMade', (data: { gameState: string[][], winner: string | null }) => {
      this.gameState = data.gameState;
      if (data.winner) {
        alert(`${data.winner} wins!`);
      }
      this.gameStore.togglePlayer()
      this.subscription.unsubscribe();
    });
    this.initGame();
  }

  initGame(): void {
    this.gameService.initGame().subscribe(gameState => {
      this.gameState = gameState;
      this.gameStore.resetPlayer();
    });
  }

  makeMove(row: number, col: number): void {
    this.subscription = this.gameStore.currentPlayer$.pipe(
      switchMap(player=>  this.gameService.makeMove(row, col,player))
    ).subscribe()
  }
  
  resetGame(): void {
    this.gameService.resetGame().subscribe(gameState => {
      this.gameState = gameState;
      this.gameStore.resetPlayer();
    });
  }
}
