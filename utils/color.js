export function getColorValue(color) {
    if (typeof window === "undefined") return `var(${color})`;
    return getComputedStyle(document.documentElement).getPropertyValue(color);
}
