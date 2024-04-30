// Explorer.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import Explorer from '../pages/Explorer'; 

test('renders Explorer component without crashing', () => {
  render(
    <BrowserRouter>
      <Explorer />
    </BrowserRouter>
  );
});
