import countNearbyMines from './countNearbyMines.ts';

export default function revealCell(
  row: number,
  col: number,
  board: ('M' | 0)[][],
  revealed: boolean[][],
  table: HTMLTableElement
) {
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || revealed[row][col]) {
    return;
  }

  revealed[row][col] = true;

  const mineCount = countNearbyMines(row, col, board);

  if (board[row][col] === 'M') {
    alert('Вы проиграли');

    return;
  }

  const cell = table.children[row].children[col];

  if (!cell) {
    return;
  }

  cell.classList.add('opened')
  cell.setAttribute('data-attr', mineCount.toString());

  if (mineCount === 0) {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r !== row || c !== col) {
          revealCell(r, c, board, revealed, table);
        }
      }
    }
  }
}