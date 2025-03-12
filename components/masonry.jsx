"use client"

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export default function Masonry({ 
  items, 
  renderItem, 
  columnWidth = 300,
  gap = 16,
  loadMore = false,
  className = ""
}) {
  const [columns, setColumns] = useState(1);
  const containerRef = useRef(null);
  const loadingRef = useRef(false);

  // Calculate number of columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      
      let newColumns;
      // Mobile screens
      if (window.innerWidth <= 640) {
        newColumns = 1;
      } 
      
      // Tablet screens
      else if (window.innerWidth <= 1024) {
        newColumns = 2;
      }
      // Desktop and larger
      else {
        newColumns = Math.max(1, Math.floor((containerWidth + gap) / (columnWidth + gap)));
      }
      
      console.log('Screen width:', window.innerWidth, 'Columns:', newColumns);
      setColumns(newColumns);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [columnWidth, gap]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (loadingRef.current || !loadMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 1000;

      if (scrollPosition >= threshold) {
        loadingRef.current = true;
        loadMore().finally(() => {
          loadingRef.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  // Distribute items into columns
  const getColumnItems = () => {
    const columnItems = Array.from({ length: columns }, () => []);
    
    items.forEach((item, index) => {
      const shortestColumn = columnItems.reduce((shortest, current, i) => {
        const currentHeight = current.reduce((sum, item) => sum + (item.height || 1), 0);
        const shortestHeight = shortest.reduce((sum, item) => sum + (item.height || 1), 0);
        return currentHeight < shortestHeight ? current : shortest;
      }, columnItems[0]);
      
      shortestColumn.push(item);
    });

    return columnItems;
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("w-full grid", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%' // Ensure full width
      }}
    >
      {getColumnItems().map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {column.map((item, itemIndex) => (
            <div key={itemIndex}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 