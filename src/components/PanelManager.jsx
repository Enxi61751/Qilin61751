import React, { useEffect, useRef } from 'react';
import { getSafeShadowRoot, withSafeDomAccess } from '../utils/domUtils';

const PanelManager = () => {
  const panelRef = useRef(null);

  // 安全处理面板交互的方法
  const handlePanelIsIntersecting = withSafeDomAccess(() => {
    const shadowRoot = getSafeShadowRoot('panel');
    if (!shadowRoot) return;
    
    // 原始交互逻辑...
  });

  // 使用 ref 确保元素存在
  const initPanel = () => {
    if (!panelRef.current) return;
    
    // 确保组件已挂载到 DOM
    const shadowRoot = panelRef.current.shadowRoot;
    if (!shadowRoot) {
      console.warn('ShadowRoot not ready');
      return;
    }
    
    handlePanelIsIntersecting();
  };

  useEffect(() => {
    // 添加延迟确保 DOM 渲染完成
    const timer = setTimeout(initPanel, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* 使用 ref 替代 ID 选择器 */}
      <custom-panel-element ref={panelRef} id="panel" />
    </div>
  );
};

export default PanelManager;