async function fetchDataFlow() {
    try {
        const response = await fetch('/getDataFlow', { credentials: 'include' });
        const { html } = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const table = doc.querySelector('table');
        if (!table) throw new Error('未找到流量表格');

        const rows = Array.from(table.querySelectorAll('tr')).slice(1);
        const tbody = document.getElementById('流量数据');
        tbody.innerHTML = '';
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 4) {
                const ip = cells[0].textContent.trim();
                const tx = cells[1].textContent.trim();
                const rx = cells[2].textContent.trim();
                const sessions = cells[3].textContent.trim();
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${ip}</td><td>${tx}</td><td>${rx}</td><td>${sessions}</td>`;
                tbody.appendChild(tr);
            }
        });
    } catch (error) {
        console.error('错误:', error);
        document.getElementById('流量数据').innerHTML = '<tr><td colspan="4">加载失败</td></tr>';
    }
}

fetchDataFlow();
setInterval(fetchDataFlow, 10000);
