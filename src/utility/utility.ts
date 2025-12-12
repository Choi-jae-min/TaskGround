import {ColorEnum} from "@/enums";

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function setThemeColor (color_name : ColorEnum) {
    switch (color_name.toUpperCase()){
        case "RED" : return "#f65c5c";

        default : return "#686868";
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