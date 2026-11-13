import React from 'react';
import { publicAsset } from '../utils/publicAsset';

// Absolute URL: a url() inside a custom property resolves against the
// stylesheet that uses it (assets/), not the page, so a relative path breaks.
const MARK_URL = new URL(publicAsset('/hj_favicon_text.svg'), document.baseURI).href;

// The HJ monogram, recoloured to the current text colour via a CSS mask.
export default function BrandMark({ className = 'w-5 h-4' }) {
  return (
    <span
      aria-hidden="true"
      className={`brand-mark ${className}`}
      style={{ '--mark': `url("${MARK_URL}")` }}
    />
  );
}
