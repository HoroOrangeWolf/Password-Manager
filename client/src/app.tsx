import {
  createRoot,
} from 'react-dom/client';

import React from 'react';

const element = document.getElementById('root');

const root = createRoot(element);

root.render(
  <div>
    Hello
  </div>,
);
