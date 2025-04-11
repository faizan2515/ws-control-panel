import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEnterKey(code: string) {
  return ["Enter", "NumpadEnter"].includes(code);
}
