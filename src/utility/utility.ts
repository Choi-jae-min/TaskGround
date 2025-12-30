import React from "react";

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

export function setThemeColor (color_name : string) {
    switch (color_name.toUpperCase()){
        case "RED" : return "#e15353";
        case "BLUE" : return "#6084df";
        case "GREEN" : return "#157855";
        case "PURPLE" : return "#634080";
        case "YELLOW" : return "#363327";
        case "BROWN" : return "#8a4545";
        case "ORANGE" : return "#df5216";

        default : return "#3a3939";
    }
}

export function moreLightenColor(hex: string, percent: number) {
    hex = hex.replace(/^#/, '');

    const num = parseInt(hex, 16);
    const r = (num >> 16) + Math.round(2.55 * percent);
    const g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
    const b = (num & 0x0000ff) + Math.round(2.55 * percent);

    const clamp = (v: number) => Math.max(0, Math.min(255, v));

    return (
        "#" +
        (clamp(r) << 16 | clamp(g) << 8 | clamp(b))
            .toString(16)
            .padStart(6, "0")
    );
}

export function moreDarkenColor(hex: string, percent: number) {
    hex = hex.replace(/^#/, '');

    const num = parseInt(hex, 16);
    const r = (num >> 16) - Math.round(2.55 * percent);
    const g = ((num >> 8) & 0x00ff) - Math.round(2.55 * percent);
    const b = (num & 0x0000ff) - Math.round(2.55 * percent);

    const clamp = (v: number) => Math.max(0, Math.min(255, v));

    return (
        "#" +
        (clamp(r) << 16 | clamp(g) << 8 | clamp(b))
            .toString(16)
            .padStart(6, "0")
    );
}
export function getCaretOffsetInElement(el: HTMLElement): number | null {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const range = sel.getRangeAt(0);

    if (!el.contains(range.startContainer)) return null;

    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.startContainer, range.startOffset);

    return preRange.toString().length;
}

export function hasSelection(): boolean {
    const sel = window.getSelection();
    if (!sel) return false;
    return sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed; // 선택 범위가 존재
}

export const focusBlock = (i: number , ref: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
    if(!ref) return;
    const el = ref.current[i];
    el?.focus();
};