import createNode from '../helpers/createNode.ts';
import { ISTEST } from '../constants';

export default function (rows: number, cols: number, mines: number) {
  const table = createNode('table') as HTMLTableElement;

  const fields = createField(rows, cols, mines);

  for (let i = 0; i < fields.length; i++) {
    const td = createNode('td');
    table.appendChild(td);

    let j = 0;
    while (j < fields[i].length) {
      const tr = createNode('tr');
      td.appendChild(tr);

      ISTEST && tr.setAttribute('data-attr', fields[i][j]);
      j++;
    }
  }

  return {
    table,
    fields
  };
}

function createField(rows: number, cols: number, mines: number) {
  const field = Array.from({length: rows}, () => Array(cols).fill(0));

  let placedMines: number = 0;

  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (field[row][col] === 0) {
      field[row][col] = 'M';
      placedMines++;
    }
  }

  return field;
}