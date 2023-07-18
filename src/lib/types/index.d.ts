export interface IStringObject {
  [key: string]: string;
}

export type TCacheStrategy = "NO-CACHE" | "PER-SESSION" | "RELOAD";
