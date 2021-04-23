import { Group, View } from '../ui/view';
import { BridgeContext } from '../runtime/global';
export declare class NestedSlider extends Group {
    onPageSlided?: (index: number) => void;
    scrollable?: boolean;
    addSlideItem(view: View): void;
    slidePage(context: BridgeContext, page: number, smooth?: boolean): Promise<any>;
    getSlidedPage(context: BridgeContext): Promise<number>;
}
