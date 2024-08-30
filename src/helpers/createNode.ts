'use strict';

export default function(name: string, classes?: string): HTMLElement {
  const node = document.createElement(name);

  classes && node.classList.add(classes);

  return node;
}