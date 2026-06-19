// 页面辅助：提示卡片、关键词徽章与访问指引
(function() {
  'use strict';

  const siteDomain = 'https://mindex-leyu.com.cn';
  const mainKeyword = '乐鱼体育';
  const seed = 'acdd1c0e535057f3'; // 仅用于内部变化，不显示

  // 卡片配置数组
  const cardData = [
    {
      id: 'tip-welcome',
      title: '欢迎来到 ' + mainKeyword,
      content: '本站提供最新体育资讯、赛事分析与互动社区功能。',
      type: 'info'
    },
    {
      id: 'tip-feature',
      title: '特色服务',
      content: '实时比分、专家解读、个性化推荐，尽在' + mainKeyword + '。',
      type: 'highlight'
    },
    {
      id: 'tip-access',
      title: '访问说明',
      content: '请通过官方网站 ' + siteDomain + ' 获取最新入口与帮助。',
      type: 'guide'
    }
  ];

  // 关键词徽章列表
  const badgeKeywords = [
    mainKeyword,
    '体育赛事',
    '比分直播',
    '专家分析',
    '社区互动'
  ];

  // 创建提示卡片
  function createCard(cfg) {
    const card = document.createElement('div');
    card.className = 'site-helper-card site-helper-card-' + cfg.type;
    card.id = cfg.id;

    const titleEl = document.createElement('h4');
    titleEl.textContent = cfg.title;
    card.appendChild(titleEl);

    const contentEl = document.createElement('p');
    contentEl.textContent = cfg.content;
    card.appendChild(contentEl);

    return card;
  }

  // 创建关键词徽章
  function createBadge(text) {
    const badge = document.createElement('span');
    badge.className = 'site-helper-badge';
    badge.textContent = text;
    return badge;
  }

  // 生成访问说明区块
  function createAccessNotice() {
    const notice = document.createElement('div');
    notice.className = 'site-helper-notice';

    const icon = document.createElement('span');
    icon.textContent = 'ℹ️';
    icon.className = 'notice-icon';
    notice.appendChild(icon);

    const text = document.createElement('span');
    text.textContent = '官方唯一域名：' + siteDomain + '，请认准并安全访问。';
    notice.appendChild(text);

    return notice;
  }

  // 将生成内容插入指定容器
  function renderTo(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.warn('未找到容器：' + containerSelector + '，将附加到 body');
      return;
    }

    // 卡片区域
    const cardSection = document.createElement('div');
    cardSection.className = 'site-helper-section';
    cardData.forEach(function(item) {
      cardSection.appendChild(createCard(item));
    });
    container.appendChild(cardSection);

    // 徽章区域
    const badgeSection = document.createElement('div');
    badgeSection.className = 'site-helper-section site-helper-badges';
    badgeKeywords.forEach(function(kw) {
      badgeSection.appendChild(createBadge(kw));
    });
    container.appendChild(badgeSection);

    // 访问说明
    container.appendChild(createAccessNotice());
  }

  // 自动注入样式
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .site-helper-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 12px 16px;
        margin: 10px 0;
        background: #fafafa;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: transform 0.2s;
      }
      .site-helper-card:hover {
        transform: translateY(-2px);
      }
      .site-helper-card-info {
        border-left: 4px solid #4a90d9;
      }
      .site-helper-card-highlight {
        border-left: 4px solid #f5a623;
        background: #fff8e1;
      }
      .site-helper-card-guide {
        border-left: 4px solid #7ed321;
      }
      .site-helper-card h4 {
        margin: 0 0 6px 0;
        font-size: 16px;
        color: #333;
      }
      .site-helper-card p {
        margin: 0;
        font-size: 14px;
        color: #555;
      }
      .site-helper-badge {
        display: inline-block;
        background: #e0e7ff;
        color: #1a3a8a;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 13px;
        margin: 4px 6px 4px 0;
        border: 1px solid #b3c2f0;
      }
      .site-helper-badges {
        margin: 16px 0;
      }
      .site-helper-notice {
        display: flex;
        align-items: center;
        background: #fff3cd;
        border: 1px solid #ffc107;
        border-radius: 6px;
        padding: 10px 14px;
        margin: 12px 0;
        font-size: 14px;
        color: #856404;
      }
      .notice-icon {
        margin-right: 8px;
        font-size: 18px;
      }
      .site-helper-section {
        margin-bottom: 8px;
      }
    `;
    document.head.appendChild(style);
  }

  // 初始化：注入样式、渲染内容
  function init() {
    injectStyles();
    // 尝试渲染到 #site-helper-container，若不存在则附加到 body
    const container = document.getElementById('site-helper-container') || document.body;
    // 如果使用 body，则创建一个包装容器
    let targetContainer = container;
    if (container === document.body) {
      const wrapper = document.createElement('div');
      wrapper.id = 'site-helper-root';
      document.body.appendChild(wrapper);
      targetContainer = wrapper;
    }
    renderTo('#' + targetContainer.id);
  }

  // 在 DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();