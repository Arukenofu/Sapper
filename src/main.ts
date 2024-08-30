'use strict';

import createTable from './app/createTable.ts';
import revealCell from './app/revealCell.ts';
import './index.css'
import createNode from './helpers/createNode.ts';

const root = document.getElementById('app')!;

function createApp() {
  const rows = 15;
  const cols = 15;
  const mines = 25;

  let { table, fields } = createTable(rows, cols, mines);
  root.appendChild(table);

  let revealed: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  function restartGame() {
    const button = createNode('button') as HTMLButtonElement;
    button.innerText = 'Начать заново';
    button.classList.add('restart');

    root.appendChild(button);
    table.style.pointerEvents = 'none';

    button.onclick = () => {
      const tableChildren = table.children;

      for (let i = 0; i < tableChildren.length; i++) {
        const rowChildren = tableChildren[i].children;
        for (let j = 0; j < rowChildren.length; j++) {
          const column = rowChildren[j];

          column.className = '';
          column.removeAttribute('data-attr');
        }
      }

      fields = (createTable(rows, cols, mines)).fields;
      revealed = Array.from({ length: rows }, () => Array(cols).fill(false));

      button.remove();
      table.style.pointerEvents = 'auto';
    }
  }

  function toggleFlag(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLElement;

    if (target.classList.contains('opened')) {
      return;
    }

    target.classList.toggle('flag');
  }

  table.querySelectorAll('tr').forEach((row, index) => {
    row.addEventListener('click', function(event) {
      const target = event.target as HTMLTableColElement;

      let rowIndex = Math.floor(index / rows);
      let columnIndex: number;

      columnIndex = Array.from(row.parentElement!.children).indexOf(target);

      revealCell(rowIndex, columnIndex, fields, revealed, table, restartGame);
    });
  });

  table.addEventListener('contextmenu', (e) => toggleFlag(e));
  table.addEventListener('dblclick', (e) => toggleFlag(e));
}

createApp();