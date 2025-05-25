
import React from 'react';
import { useCMS } from '@/contexts/CMSContext';
import NotFound from '@/pages/NotFound';

interface CMSPageRendererProps {
  pageSlug: string;
}

export const CMSPageRenderer: React.FC<CMSPageRendererProps> = ({ pageSlug }) => {
  const { pages } = useCMS();
  const page = pages.find(p => p.slug === pageSlug && p.status === 'published');

  if (!page) {
    return <NotFound />;
  }

  // Try to parse content as JSON (for visual editor content)
  let elements: any[] = [];
  let isVisualContent = false;
  
  try {
    const contentData = JSON.parse(page.content || '{}');
    if (contentData.elements && Array.isArray(contentData.elements)) {
      elements = contentData.elements;
      isVisualContent = true;
    }
  } catch (e) {
    // Not JSON, treat as HTML
    isVisualContent = false;
  }

  if (isVisualContent && elements.length > 0) {
    // Render visual editor content
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="w-full h-screen relative">
          {elements.map((element) => (
            <div
              key={element.id}
              className="absolute"
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                fontSize: element.styles?.fontSize || '16px',
                fontWeight: element.styles?.fontWeight || 'normal',
                color: element.styles?.color || '#ffffff',
                backgroundColor: element.styles?.backgroundColor || 'transparent'
              }}
            >
              {element.type === 'text' && (
                <p className="w-full h-full p-2 break-words">
                  {element.content}
                </p>
              )}
              {element.type === 'heading' && (
                <h1 className="w-full h-full p-2 font-bold break-words">
                  {element.content}
                </h1>
              )}
              {element.type === 'image' && (
                <img
                  src={element.content}
                  alt="Imagen del contenido"
                  className="w-full h-full object-cover rounded"
                />
              )}
              {element.type === 'button' && (
                <button className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-medium transition-colors">
                  {element.content}
                </button>
              )}
              {element.type === 'video' && (
                <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📹</div>
                    <p className="text-sm">Video: {element.content}</p>
                  </div>
                </div>
              )}
              {element.type === 'link' && (
                <a 
                  href="#" 
                  className="w-full h-full flex items-center p-2 text-blue-400 hover:text-blue-300 underline"
                >
                  {element.content}
                </a>
              )}
              {element.type === 'list' && (
                <ul className="w-full h-full p-2">
                  <li>{element.content}</li>
                </ul>
              )}
              {element.type === 'container' && (
                <div className="w-full h-full border border-gray-600 rounded p-2">
                  {element.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render HTML content
  return (
    <div 
      className="min-h-screen"
      dangerouslySetInnerHTML={{ __html: page.content || '' }}
    />
  );
};
