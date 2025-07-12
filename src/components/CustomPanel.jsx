import React, { useRef, useEffect } from 'react';

const CustomPanel = () => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!panelRef.current) return;
    
    const handleIntersection = () => {
      // 安全访问 shadowRoot
      const shadowRoot = panelRef.current?.shadowRoot;
      if (!shadowRoot) return;
      
      // 交互逻辑...
    };
    
    // 添加事件监听
    panelRef.current.addEventListener('intersect', handleIntersection);
    
    return () => {
      panelRef.current?.removeEventListener('intersect', handleIntersection);
    };
  }, []);

  return <custom-panel ref={panelRef} />;
};

export default CustomPanel;