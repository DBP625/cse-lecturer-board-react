export function daysLeft(iso) {
  if (!iso) return null;
  const d = new Date(iso + 'T23:59:59');
  return Math.ceil((d - new Date()) / 86400000);
}

export function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function timeAgo(dateStr) {
  if (!dateStr) return 'unknown';
  const ms = Date.now() - new Date(dateStr).getTime();
  const h = ms / 3600000;
  if (h < 1) return 'just now';
  if (h < 24) return Math.round(h) + 'h ago';
  return Math.round(h / 24) + 'd ago';
}

export function staleness(dateStr) {
  if (!dateStr) return '';
  const h = (Date.now() - new Date(dateStr).getTime()) / 3600000;
  if (h > 48) return 'stale';
  if (h > 12) return 'warn';
  return '';
}
