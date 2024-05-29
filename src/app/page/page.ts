import { IToggleItem } from "../toggle-item/toggle-item";

export interface IPageData {
    intro?: string;
    list?: string[];
    admin?: boolean;
    toggleItems?: IToggleItem[];
    listType?: 'Unordered' | 'Ordered';
}
