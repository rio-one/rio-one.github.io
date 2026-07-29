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