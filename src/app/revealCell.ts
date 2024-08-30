import countNearbyMines from './countNearbyMines.ts';

export default function revealCell(
  row: number,
  col: number,
  board: ('M' | 0)[][],
  revealed: boolean[][],
  table: HTMLTableElement,
  onGameOver?: () => void
) {
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || revealed[row][col]) {
    return;
  }

  revealed[row][col] = true;

  const mineCount = countNearbyMines(row, col, board);

  if (board[row][col] === 'M') {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'M') {
          table.children[i].children[j].classList.add('reveal');
        }
      }
    }

    alert('Вы проиграли');
    onGameOver && onGameOver();
    return;
  }

  const cell = table.children[row].children[col];

  if (cell.classList.contains('flag')) {
    cell.classList.remove('flag');
  }

  cell.classList.add('opened')
  cell.setAttribute('data-attr', String(mineCount || ''));

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