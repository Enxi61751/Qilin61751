export const handleHotKey = (event) => {
  // 安全处理未定义值
  const key = event?.key || '';
  
  // 使用可选链和空值合并
  const upperKey = key?.toUpperCase?.() || '';
  
  // 原始热键逻辑...
};