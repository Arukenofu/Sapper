export default function(row: number, col: number, board: ('M' | 0)[][]) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  let count = 0;

  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;

    if (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c]) {
      count++;
    }
  }
  return count;
}