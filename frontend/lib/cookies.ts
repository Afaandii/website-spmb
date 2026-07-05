/**
 * Set a cookie in the browser
 * @param name Cookie name
 * @param value Cookie value
 * @param maxAgeSeconds Optional max age in seconds. If omitted, the cookie is a session-only cookie.
 */
export function setCookie(name: string, value: string, maxAgeSeconds?: number) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  
  if (maxAgeSeconds !== undefined) {
    cookieString += `; max-age=${maxAgeSeconds}`;
  }
  
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    cookieString += "; Secure";
  }
  
  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 * @param name Cookie name
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = encodeURIComponent(name) + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

/**
 * Delete a cookie by name
 * @param name Cookie name
 */
export function deleteCookie(name: string) {
  document.cookie = `${encodeURIComponent(name)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
}
