import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  initGame(): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.baseUrl}/init`);
  }

  makeMove(row: number, col: number, player: string): Observable<{ gameState: string[][], winner: string | null }> {
    return this.http.post<{ gameState: string[][], winner: string | null }>(`${this.baseUrl}/move`, { col,row , player });
  }

  resetGame(): Observable<string[][]> {
    return this.http.post<string[][]>(`${this.baseUrl}/reset`, {});
  }
}
