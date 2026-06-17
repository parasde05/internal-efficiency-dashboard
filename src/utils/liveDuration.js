export function getLiveDuration(dateString) {
  if (!dateString) return '';
  const start = new Date(dateString);
  const now = new Date();
  if (isNaN(start.getTime()) || start > now) return '';

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years}y`);
  if (months > 0) parts.push(`${months}m`);
  parts.push(`${days}d`);
  return parts.join(' ');
}
