export function formatMembershipDuration(
  createdAt: string | Date | null | undefined,
): string | null {
  if (!createdAt) return null;

  const start = createdAt instanceof Date ? createdAt : new Date(createdAt);
  const now = new Date();

  if (isNaN(start.getTime())) return null;

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    // Borrow days from previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} år`);
  }
  if (months > 0) {
    parts.push(`${months} mån`);
  }
  if (days > 0 || parts.length === 0) {
    // Always show days if everything else is zero
    parts.push(`${days} dagar`);
  }

  return parts.join(', ');
}
