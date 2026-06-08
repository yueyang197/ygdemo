// ===== Toast =====
function showToast(message, type) {
    type = type || 'success';
    var colors = { success: 'bg-success', danger: 'bg-danger', warning: 'bg-warning text-dark', info: 'bg-primary' };
    var titles = { success: '操作成功', danger: '操作失败', warning: '警告', info: '提示' };
    var el = document.getElementById('globalToast');
    if (!el) return;
    document.getElementById('toastTitle').textContent = titles[type] || '提示';
    document.getElementById('toastBody').textContent = message;
    el.className = 'toast align-items-center text-white border-0 ' + (colors[type] || 'bg-primary');
    new bootstrap.Toast(el, { delay: 2800 }).show();
}

// ===== Delete Confirm =====
var _deleteId = null;
function showDeleteConfirm(id) {
    _deleteId = id;
    new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
}
function confirmDelete() {
    bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
    showToast('记录已成功删除');
}

// ===== Export =====
function exportData() { showToast('数据导出成功，文件正在下载…', 'info'); }

// ===== Generic modal helpers =====
function openModal(id) { new bootstrap.Modal(document.getElementById(id)).show(); }
function closeModal(id) {
    var m = bootstrap.Modal.getInstance(document.getElementById(id));
    if (m) m.hide();
}

function saveForm(modalId) {
    closeModal(modalId);
    showToast('保存成功');
}

// ===== Remind/Urge =====
function remindItem() { showToast('催办通知已发送', 'info'); }
function rejectItem() { showToast('已驳回，已通知相关人员', 'warning'); }
function approveItem() { showToast('已审批通过', 'success'); }
function submitDispatch() { showToast('事件已成功分拨', 'success'); }
function submitHandle() { showToast('处置记录已提交', 'success'); }
function submitClose() { showToast('事件已办结', 'success'); }
function submitEvaluate() { showToast('评价已提交', 'success'); }
function printRecord() { showToast('正在调用打印服务…', 'info'); }

// ===== Sidebar Toggle =====
document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            var sidebar = document.getElementById('sidebar');
            var content = document.querySelector('.main-content');
            sidebar.classList.toggle('collapsed');
            if (content) content.classList.toggle('expanded');
        });
    }
    activateCurrentMenu();
});

// ===== Active Menu =====
function activateCurrentMenu() {
    var path = window.location.pathname.replace(/\/$/, '');
    // Normalize: /Index -> /
    if (path === '' || path === '/Index') path = '/';

    document.querySelectorAll('.sidebar-sublink').forEach(function (link) {
        var href = (link.getAttribute('href') || '').replace(/\/$/, '');
        if (href === path) {
            link.classList.add('active');
            // expand parent collapse
            var col = link.closest('.collapse');
            if (col) {
                col.classList.add('show');
                var trigger = document.querySelector('[data-bs-target="#' + col.id + '"]');
                if (trigger) { trigger.classList.remove('collapsed'); }
            }
            // also expand grandparent if nested
            var col2 = col && col.parentElement && col.parentElement.closest('.collapse');
            if (col2) {
                col2.classList.add('show');
                var t2 = document.querySelector('[data-bs-target="#' + col2.id + '"]');
                if (t2) t2.classList.remove('collapsed');
            }
        }
    });

    // Home link
    document.querySelectorAll('.sidebar-link-home').forEach(function (link) {
        if (path === '/' || path === '') link.classList.add('active');
    });
}

// ===== Simple client-side table search =====
function filterTable(inputId, tableId) {
    var val = document.getElementById(inputId).value.toLowerCase();
    var rows = document.querySelectorAll('#' + tableId + ' tbody tr');
    rows.forEach(function (row) {
        row.style.display = row.textContent.toLowerCase().includes(val) ? '' : 'none';
    });
}

// ===== Pagination (demo) =====
function changePage(page) {
    showToast('切换到第 ' + page + ' 页', 'info');
}
