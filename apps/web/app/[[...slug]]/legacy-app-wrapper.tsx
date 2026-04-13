'use client';

import LegacyApp from 'front/app/app';
import { BrowserRouter } from 'react-router-dom';

export default function LegacyAppWrapper() {
  return (
    <BrowserRouter>
      <LegacyApp />
    </BrowserRouter>
  );
}
