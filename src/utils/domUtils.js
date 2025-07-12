// 安全获取 ShadowRoot 的方法
export const getSafeShadowRoot = (id) => {
  const element = document.getElementById(id);
  
  if (!element) {
    console.warn(`[DOM Warning] Element with ID "${id}" not found`);
    return null;
  }
  
  if (!element.shadowRoot) {
    console.warn(`[DOM Warning] Element "${id}" has no shadowRoot`);
    return null;
  }
  
  return element.shadowRoot;
};

// 安全的 DOM 操作高阶函数
export const withSafeDomAccess = (callback) => {
  return (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      console.error('[DOM Access Error]', error);
      return null;
    }
  };
};