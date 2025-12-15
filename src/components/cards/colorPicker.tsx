"use client";
import React from "react";
import {setThemeColor} from "@/utility/utility";

const COLOR_NAMES = [
    "RED",
    "BLUE",
    "GREEN",
    "PURPLE",
    "YELLOW",
    "BROWN",
    "ORANGE",
    "DEFAULT",
];

export default function ColorPicker({
                                        value,
                                        onChange,
                                    }: {
    value: string;
    onChange: (colorName: string) => void;
}) {
    return (
        <div className="flex gap-2 py-1">
            {COLOR_NAMES.map((name) => {
                const hex = setThemeColor(name);
                const isSelected = value === name;

                return (
                    <button
                        key={name}
                        type="button"
                        onClick={() => onChange(name.toLowerCase())}
                        className={`w-6 h-6 rounded-full border transition cursor-pointer
                ${isSelected ? "scale-110 border-white" : "border-transparent hover:scale-105"}
            `}
                        style={{ backgroundColor: hex }}
                    />
                );
            })}
        </div>
    );
}
