/**
 * 现代搜索组件 JavaScript 类
 * 使用方法：
 * const searchComponent = new SearchComponent('#search-container', options);
 */

class SearchComponent {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        
        if (!this.container) {
            throw new Error('搜索组件容器未找到');
        }

        // 默认配置
        this.options = {
            placeholder: '请输入搜索关键词...',
            buttonText: '搜索',
            width: '100%',
            maxWidth: '600px',
            size: 'medium', // small, medium, large
            theme: 'default', // default, minimal, rounded, success, warning
            enableKeyboardShortcuts: true,
            autoFocus: false,
            debounceDelay: 300,
            onSearch: null,
            onInput: null,
            enableSuggestions: false,
            suggestions: [],
            ...options
        };

        this.init();
        this.bindEvents();
    }

    init() {
        this.render();
        this.applyStyles();
        
        if (this.options.autoFocus) {
            setTimeout(() => {
                this.searchInput.focus();
            }, 100);
        }
    }

    render() {
        const { placeholder, buttonText, size, theme } = this.options;
        
        this.container.innerHTML = `
            <div class="search-component ${size ? `size-${size}` : ''} ${theme ? `theme-${theme}` : ''}">
                <form class="search-form">
                    <div class="search-input-wrapper">
                        <input 
                            type="text" 
                            class="search-input" 
                            placeholder="${placeholder}"
                            autocomplete="off"
                        >
                        ${this.options.enableSuggestions ? '<div class="search-suggestions" style="display: none;"></div>' : ''}
                    </div>
                    <button type="submit" class="search-button">
                        <span class="search-icon">🔍</span>
                        ${buttonText}
                    </button>
                </form>
            </div>
        `;

        this.searchForm = this.container.querySelector('.search-form');
        this.searchInput = this.container.querySelector('.search-input');
        this.searchButton = this.container.querySelector('.search-button');
        this.suggestionsContainer = this.container.querySelector('.search-suggestions');
    }

    applyStyles() {
        const component = this.container.querySelector('.search-component');
        component.style.width = this.options.width;
        component.style.maxWidth = this.options.maxWidth;
    }

    bindEvents() {
        // 搜索表单提交事件
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // 输入框输入事件（防抖）
        let debounceTimer;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.handleInput(e.target.value);
            }, this.options.debounceDelay);
        });

        // 键盘快捷键
        if (this.options.enableKeyboardShortcuts) {
            this.bindKeyboardShortcuts();
        }

        // 点击外部关闭建议
        if (this.options.enableSuggestions) {
            document.addEventListener('click', (e) => {
                if (!this.container.contains(e.target)) {
                    this.hideSuggestions();
                }
            });
        }
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K 或 Cmd+K 聚焦搜索框
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.focus();
            }
            
            // ESC 清空搜索框
            if (e.key === 'Escape' && document.activeElement === this.searchInput) {
                this.clear();
                this.searchInput.blur();
            }
        });
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.trim();
        
        if (!searchTerm) {
            this.showError('请输入搜索关键词！');
            return;
        }

        this.setLoading(true);
        
        if (this.options.onSearch && typeof this.options.onSearch === 'function') {
            const result = this.options.onSearch(searchTerm);
            
            // 如果返回 Promise，等待完成
            if (result && typeof result.then === 'function') {
                result
                    .then(() => this.setLoading(false))
                    .catch((error) => {
                        this.setLoading(false);
                        this.showError('搜索失败，请重试');
                        console.error('搜索错误:', error);
                    });
            } else {
                setTimeout(() => this.setLoading(false), 1000);
            }
        } else {
            // 默认行为
            setTimeout(() => {
                this.setLoading(false);
                alert(`搜索关键词: "${searchTerm}"`);
            }, 1000);
        }
    }

    handleInput(value) {
        if (this.options.onInput && typeof this.options.onInput === 'function') {
            this.options.onInput(value);
        }

        if (this.options.enableSuggestions && value.length > 0) {
            this.showSuggestions(value);
        } else {
            this.hideSuggestions();
        }
    }

    showSuggestions(query) {
        if (!this.suggestionsContainer) return;

        const filteredSuggestions = this.options.suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredSuggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        this.suggestionsContainer.innerHTML = filteredSuggestions
            .map(suggestion => `
                <div class="search-suggestion-item" data-suggestion="${suggestion}">
                    ${this.highlightMatch(suggestion, query)}
                </div>
            `).join('');

        // 绑定建议点击事件
        this.suggestionsContainer.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                this.searchInput.value = item.dataset.suggestion;
                this.hideSuggestions();
                this.handleSearch();
            });
        });

        this.suggestionsContainer.style.display = 'block';
    }

    hideSuggestions() {
        if (this.suggestionsContainer) {
            this.suggestionsContainer.style.display = 'none';
        }
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    setLoading(loading) {
        if (loading) {
            this.searchButton.disabled = true;
            this.searchButton.classList.add('loading');
            this.searchButton.innerHTML = '<span class="search-icon">⏳</span>搜索中...';
        } else {
            this.searchButton.disabled = false;
            this.searchButton.classList.remove('loading');
            this.searchButton.innerHTML = `<span class="search-icon">🔍</span>${this.options.buttonText}`;
        }
    }

    showError(message) {
        this.searchInput.classList.add('error');
        setTimeout(() => {
            this.searchInput.classList.remove('error');
        }, 3000);
        
        // 可以在这里添加错误提示显示逻辑
        alert(message);
    }

    showSuccess() {
        this.searchInput.classList.add('success');
        setTimeout(() => {
            this.searchInput.classList.remove('success');
        }, 2000);
    }

    // 公共方法
    focus() {
        this.searchInput.focus();
    }

    blur() {
        this.searchInput.blur();
    }

    clear() {
        this.searchInput.value = '';
        this.hideSuggestions();
    }

    getValue() {
        return this.searchInput.value;
    }

    setValue(value) {
        this.searchInput.value = value;
    }

    setPlaceholder(placeholder) {
        this.searchInput.placeholder = placeholder;
    }

    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.init();
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    // 尺寸调节方法
    setSize(size) {
        const component = this.container.querySelector('.search-component');
        component.className = component.className.replace(/size-\w+/g, '');
        if (size) {
            component.classList.add(`size-${size}`);
        }
    }

    setTheme(theme) {
        const component = this.container.querySelector('.search-component');
        component.className = component.className.replace(/theme-\w+/g, '');
        if (theme) {
            component.classList.add(`theme-${theme}`);
        }
    }

    // 动态调整尺寸
    setCustomSize(options) {
        const { width, height, fontSize, borderRadius } = options;
        
        if (width) {
            this.searchInput.style.width = width;
        }
        
        if (height) {
            const padding = `${(parseInt(height) / 2) - 8}px 20px`;
            this.searchInput.style.padding = padding;
            this.searchButton.style.padding = padding.replace('20px', '30px');
        }
        
        if (fontSize) {
            this.searchInput.style.fontSize = fontSize;
            this.searchButton.style.fontSize = fontSize;
        }
        
        if (borderRadius) {
            this.searchInput.style.borderRadius = borderRadius;
            this.searchButton.style.borderRadius = borderRadius;
        }
    }
}

// 辅助函数：简化初始化
function createSearchComponent(container, options) {
    return new SearchComponent(container, options);
}

// 如果在浏览器环境中，添加到全局对象
if (typeof window !== 'undefined') {
    window.SearchComponent = SearchComponent;
    window.createSearchComponent = createSearchComponent;
}

// 如果在 Node.js 环境中，导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SearchComponent, createSearchComponent };
}