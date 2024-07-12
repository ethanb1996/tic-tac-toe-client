import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() value: string = '';
  @Input() row: number = 0;
  @Input() col: number = 0;
  @Output() cellClick: EventEmitter<{ row: number, col: number }> = new EventEmitter();

  onClick(): void {
    if (this.value === '') {
      this.cellClick.emit({ row: this.row, col: this.col });
    }
  }

  ngOnInit(){}
}
