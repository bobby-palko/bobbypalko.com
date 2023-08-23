import { SIZE_TO_WIDTH_MAP } from "./constants";

export type ViewType = 'sign_in' | 'sign_up' | 'forgotten_password' | 'update_password'
export type RedirectTo = string | undefined;

export type ButtonStyle = 'primary' | 'secondary';

export type AvatarSize = keyof typeof SIZE_TO_WIDTH_MAP;
export type WidthValue = typeof SIZE_TO_WIDTH_MAP[keyof typeof SIZE_TO_WIDTH_MAP];
