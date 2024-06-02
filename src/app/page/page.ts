import { IToggleItem } from "../toggle-item/toggle-item";

export interface IPageData {
    intro?: string[];
    introWarning?: boolean;
    list?: string[];
    admin?: boolean;
    toggleItems?: IToggleItem[];
    listType?: 'Unordered' | 'Ordered';
}
