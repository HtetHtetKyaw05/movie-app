import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import App from './movieApp';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='*' element={<main style={{ padding: '1rem' }}>
                  <p>There&apos;s nothing here! </p>
                </main>
            }/>
          </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('contents'),
);
