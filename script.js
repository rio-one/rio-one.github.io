// ========== 留言板逻辑 ==========
const STORAGE_KEY = 'guestbook_messages';

// 获取已有留言列表
function getMessages() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// 保存留言列表
function saveMessages(messages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// 渲染留言列表
function renderMessages() {
    const container = document.getElementById('messageList');
    const messages = getMessages();
    if (messages.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8; padding: 8px 0;">欢迎对我的主页提出建议！😁</p>';
        return;
    }
    // 按时间倒序（最新在前）
    const sorted = [...messages].reverse();
    container.innerHTML = sorted.map(msg => `
        <div class="message-item">
            <div class="msg-meta">
                <span class="msg-name">${escapeHtml(msg.nickname || '匿名')}</span>
                <span class="msg-time">${msg.time}</span>
            </div>
            <div class="msg-content">${escapeHtml(msg.content)}</div>
        </div>
    `).join('');
}

// 简单的防 XSS 转义
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        if (m === '"') return '&quot;';
        return m;
    });
}

// 处理表单提交
const form = document.getElementById('messageForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nickname = document.getElementById('nickname').value.trim();
        const content = document.getElementById('content').value.trim();
        if (!content) {
            alert('请输入留言内容！');
            return;
        }

        const messages = getMessages();
        const now = new Date();
        const timeStr = now.toLocaleString('zh-CN', { hour12: false });
        messages.push({
            nickname: nickname || '匿名',
            content: content,
            time: timeStr
        });
        saveMessages(messages);
        renderMessages();

        // 清空表单
        document.getElementById('nickname').value = '';
        document.getElementById('content').value = '';
    });
}

// ========== 拾穗按钮 ==========
function showMore() {
    var moreContent = document.getElementById('more');
    if (moreContent) {
        if (moreContent.style.display === 'none') {
            moreContent.style.display = 'block';
        } else {
            moreContent.style.display = 'none';
        }
    }
}

// 页面加载时渲染已有留言
document.addEventListener('DOMContentLoaded', renderMessages);