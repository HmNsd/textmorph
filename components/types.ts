export type AnimationStyle =
  | "rolling"
  | "vertical"
  | "typing"
  | "wave"
  | "fade";

export type AnimationSpeed = "slow" | "medium" | "fast";

export type FontStyle = "display" | "editorial" | "mono" | "poster";

export type TextDesign = "default" | "aurora" | "sunset" | "neon" | "prism";

export interface StyleOption {
  id: AnimationStyle;
  label: string;
}

export interface FontOption {
  id: FontStyle;
  label: string;
  description: string;
  className: string;
}

export interface TextDesignOption {
  id: TextDesign;
  label: string;
  description: string;
  className: string;
  swatchClassName: string;
}
