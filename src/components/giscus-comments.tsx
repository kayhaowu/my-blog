"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface GiscusCommentsProps {
  repo: `${string}/${string}`;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  term?: string; // Only if mapping is 'specific'
  reactionsEnabled?: '1' | '0';
  emitMetadata?: '1' | '0';
  inputPosition?: 'top' | 'bottom';
  lang?: string;
  loading?: 'lazy' | 'eager';
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping,
  term,
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  lang = 'en', // You can change the default language
  loading = 'lazy',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  // Determine the Giscus theme based on the site's theme
  const giscusTheme = 
    theme === 'system' 
      ? resolvedTheme === 'dark' ? 'dark_dimmed' : 'light'
      : theme === 'dark' ? 'dark_dimmed' : 'light'; // Or choose other Giscus dark/light themes

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    if (mapping === 'specific' && term) {
      script.setAttribute('data-term', term);
    }
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', giscusTheme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);

    // Remove any existing Giscus script before appending a new one
    // This is important for theme changes or if props update
    const existingScript = ref.current.querySelector('script[src="https://giscus.app/client.js"]');
    if (existingScript) {
      ref.current.removeChild(existingScript);
    }
    // Also remove the giscus iframe if it exists
    const giscusInstance = ref.current.querySelector('.giscus');
    if (giscusInstance) {
        ref.current.removeChild(giscusInstance);
    }

    ref.current.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const scriptInRef = ref.current?.querySelector('script[src="https://giscus.app/client.js"]');
      if (scriptInRef) {
        ref.current?.removeChild(scriptInRef);
      }
      const giscusInRef = ref.current?.querySelector('.giscus');
      if (giscusInRef) {
        ref.current?.removeChild(giscusInRef);
      }
    };
  }, [repo, repoId, category, categoryId, mapping, term, reactionsEnabled, emitMetadata, inputPosition, lang, giscusTheme, loading]);

  return <div ref={ref} />;
};

export default GiscusComments;
