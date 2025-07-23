# 🔍 现代搜索组件

一个功能丰富、高度可定制的现代搜索组件，支持多种尺寸、主题和交互特性。

## ✨ 特性

- 🎨 **多种主题**：默认、简约、圆角、成功、警告等主题
- 📏 **可调尺寸**：小、中、大三种预设尺寸，支持自定义尺寸
- 🔍 **搜索建议**：支持自动完成和搜索建议功能
- ⌨️ **键盘快捷键**：Ctrl+K/Cmd+K 聚焦，ESC 清空
- 📱 **响应式设计**：完美适配各种屏幕尺寸
- 🎭 **丰富动画**：悬停、点击、加载等流畅动画效果
- 🛠️ **易于集成**：支持多种框架和纯 JavaScript 使用

## 📁 文件结构

```
search-component/
├── search-component.html      # 完整演示页面（带尺寸调节器）
├── search-component.css       # 组件样式文件
├── search-component.js        # 组件逻辑文件
├── example-usage.html         # 使用示例页面
└── README_SEARCH_COMPONENT.md # 使用说明文档
```

## 🚀 快速开始

### 1. 基础使用

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="search-component.css">
</head>
<body>
    <div id="search-container"></div>
    
    <script src="search-component.js"></script>
    <script>
        const searchComponent = new SearchComponent('#search-container', {
            placeholder: '请输入搜索关键词...',
            onSearch: (searchTerm) => {
                console.log('搜索:', searchTerm);
                // 在这里添加您的搜索逻辑
            }
        });
    </script>
</body>
</html>
```

### 2. 不同尺寸

```javascript
// 小尺寸
new SearchComponent('#small-search', {
    size: 'small',
    placeholder: '小搜索框...'
});

// 中等尺寸（默认）
new SearchComponent('#medium-search', {
    size: 'medium',
    placeholder: '中等搜索框...'
});

// 大尺寸
new SearchComponent('#large-search', {
    size: 'large',
    placeholder: '大搜索框...'
});
```

### 3. 不同主题

```javascript
// 默认主题（蓝紫渐变）
new SearchComponent('#search-default', {
    theme: 'default'
});

// 简约主题（黑色）
new SearchComponent('#search-minimal', {
    theme: 'minimal'
});

// 圆角主题
new SearchComponent('#search-rounded', {
    theme: 'rounded'
});

// 成功主题（绿色渐变）
new SearchComponent('#search-success', {
    theme: 'success'
});

// 警告主题（粉色渐变）
new SearchComponent('#search-warning', {
    theme: 'warning'
});
```

## 🔧 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `placeholder` | string | '请输入搜索关键词...' | 输入框占位符文本 |
| `buttonText` | string | '搜索' | 搜索按钮文本 |
| `width` | string | '100%' | 组件宽度 |
| `maxWidth` | string | '600px' | 组件最大宽度 |
| `size` | string | 'medium' | 尺寸：'small', 'medium', 'large' |
| `theme` | string | 'default' | 主题：'default', 'minimal', 'rounded', 'success', 'warning' |
| `enableKeyboardShortcuts` | boolean | true | 是否启用键盘快捷键 |
| `autoFocus` | boolean | false | 页面加载时是否自动聚焦 |
| `debounceDelay` | number | 300 | 输入防抖延迟（毫秒） |
| `onSearch` | function | null | 搜索回调函数 |
| `onInput` | function | null | 输入回调函数 |
| `enableSuggestions` | boolean | false | 是否启用搜索建议 |
| `suggestions` | array | [] | 搜索建议数组 |

## 🎮 API 方法

### 基础方法

```javascript
const search = new SearchComponent('#container');

// 聚焦搜索框
search.focus();

// 失焦搜索框
search.blur();

// 清空搜索框
search.clear();

// 获取当前值
const value = search.getValue();

// 设置值
search.setValue('新的搜索词');

// 设置占位符
search.setPlaceholder('新的占位符...');

// 销毁组件
search.destroy();
```

### 样式控制方法

```javascript
// 设置尺寸
search.setSize('large');

// 设置主题
search.setTheme('success');

// 自定义尺寸调节
search.setCustomSize({
    width: '800px',
    height: '60px',
    fontSize: '18px',
    borderRadius: '15px'
});

// 更新配置
search.updateOptions({
    placeholder: '新的占位符...',
    theme: 'minimal'
});
```

## 🔍 搜索建议功能

```javascript
const searchWithSuggestions = new SearchComponent('#search-container', {
    enableSuggestions: true,
    suggestions: [
        'JavaScript',
        'Python',
        'React',
        'Vue.js',
        'Node.js',
        'TypeScript'
    ],
    placeholder: '输入编程语言...',
    onSearch: (term) => {
        console.log('搜索:', term);
    }
});
```

## ⌨️ 键盘快捷键

- **Ctrl+K** 或 **Cmd+K**：聚焦搜索框
- **ESC**：清空搜索框并失焦

## 🎨 自定义样式

### CSS 变量自定义

```css
.search-component {
    --primary-color: #667eea;
    --primary-color-hover: #764ba2;
    --border-color: #e1e5e9;
    --border-radius: 12px;
    --shadow-color: rgba(102, 126, 234, 0.3);
}
```

### 添加自定义主题

```css
.search-component.theme-custom .search-button {
    background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
    box-shadow: 0 8px 15px rgba(255, 107, 107, 0.3);
}
```

## 📱 响应式支持

组件自动适配移动端，在小屏幕下：
- 搜索框和按钮垂直排列
- 按钮宽度自适应
- 触摸友好的尺寸调整

## 🔄 异步搜索支持

```javascript
const search = new SearchComponent('#search-container', {
    onSearch: async (searchTerm) => {
        try {
            // 发起异步搜索请求
            const response = await fetch(`/api/search?q=${searchTerm}`);
            const data = await response.json();
            
            // 处理搜索结果
            console.log('搜索结果:', data);
            
            return data; // 返回 Promise
        } catch (error) {
            console.error('搜索失败:', error);
            throw error; // 抛出错误会显示错误状态
        }
    }
});
```

## 🎯 集成示例

### React 集成

```jsx
import React, { useEffect, useRef } from 'react';

function SearchWrapper() {
    const searchRef = useRef(null);
    const componentRef = useRef(null);

    useEffect(() => {
        if (searchRef.current && !componentRef.current) {
            componentRef.current = new SearchComponent(searchRef.current, {
                placeholder: '搜索产品...',
                onSearch: (term) => {
                    // 处理搜索逻辑
                    console.log('React 搜索:', term);
                }
            });
        }

        return () => {
            if (componentRef.current) {
                componentRef.current.destroy();
                componentRef.current = null;
            }
        };
    }, []);

    return <div ref={searchRef}></div>;
}
```

### Vue 集成

```vue
<template>
    <div ref="searchContainer"></div>
</template>

<script>
export default {
    mounted() {
        this.searchComponent = new SearchComponent(this.$refs.searchContainer, {
            placeholder: '搜索内容...',
            onSearch: (term) => {
                // 处理搜索逻辑
                this.handleSearch(term);
            }
        });
    },
    beforeDestroy() {
        if (this.searchComponent) {
            this.searchComponent.destroy();
        }
    },
    methods: {
        handleSearch(term) {
            console.log('Vue 搜索:', term);
        }
    }
};
</script>
```

## 🌟 最佳实践

1. **性能优化**：使用防抖功能避免频繁的 API 调用
2. **用户体验**：提供清晰的加载状态和错误提示
3. **无障碍性**：保持良好的键盘导航支持
4. **移动端**：确保触摸友好的交互区域
5. **SEO**：使用语义化的 HTML 结构

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受使用现代搜索组件！** 🎉