import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const DynamicPage = ({ slug: defaultSlug, fallbackTitle }) => {
  const { slug: paramsSlug } = useParams();
  const targetSlug = defaultSlug || paramsSlug;

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      if (!targetSlug) return;
      try {
        setLoading(true);
        setError('');
        const data = await api.getPageBySlug(targetSlug);
        setPage(data);
      } catch (err) {
        setError(err.message || 'Page content could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [targetSlug]);

  if (loading) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-600 text-xs font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading Page Content...</span>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-10 h-10 text-neutral-400 mb-3" />
        <h1 className="text-xl font-bold uppercase tracking-wider text-neutral-900 mb-2">
          {fallbackTitle || 'Page Not Found'}
        </h1>
        <p className="text-xs text-neutral-500 max-w-md">
          {error || 'The requested page content is currently unavailable.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white text-neutral-900 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[0.12em] text-neutral-950 uppercase font-sans">
            {page.title}
          </h1>
        </div>


        <div className="prose max-w-none text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-6 font-sans">
          {page.content.split('\n\n').map((paragraph, idx) => {
            
            if (paragraph.startsWith('1.') || paragraph.startsWith('•') || paragraph.toUpperCase() === paragraph && paragraph.length < 50) {
              return (
                <div key={idx} className="space-y-2 font-medium text-neutral-800">
                  {paragraph.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className={line.toUpperCase() === line && line.length < 50 ? "font-bold text-neutral-900 uppercase tracking-wider text-xs pt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              );
            }

            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

      </div>
    </div>
  );
};
