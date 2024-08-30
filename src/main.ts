'use strict';

import createTable from './app/createTable.ts';
import revealCell from './app/revealCell.ts';
import './index.css'

const root = document.getElementById('app')!;

function createApp() {
  const rows = 15;
  const cols = 15;
  const mines = 25;

  const { table, fields } = createTable(rows, cols, mines);
  root.appendChild(table);

  const revealed: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  table.querySelectorAll('tr').forEach((row, index) => {
    row.addEventListener('click', function(event) {
      const target = event.target as HTMLTableColElement;

      let rowIndex = Math.floor(index / rows);
      let columnIndex: number;

      columnIndex = Array.from(row.parentElement!.children).indexOf(target);

      revealCell(rowIndex, columnIndex, fields, revealed, table);
    });
  });

  table.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;

    target.classList.toggle('flag');
  })
}

createApp();