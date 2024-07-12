import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private socket: any;

  gameState: string[][] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {    
    this.socket = io('http://localhost:3000');

    this.socket.on('initGame', (gameState: string[][]) => {
      this.gameState = gameState;
    });

    this.initGame();
  }

  initGame(): void {
    this.gameService.initGame().subscribe(gameState => {
      this.gameState = gameState;
    });
  }
  
}
