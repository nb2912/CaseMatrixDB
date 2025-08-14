export function formatDate(date: string, locale = "en-IN", options?: Intl.DateTimeFormatOptions) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString(
      locale,
      options || { year: "numeric", month: "short", day: "numeric" }
    );
  } catch {
    return date; // fallback if parsing fails
  }
}
