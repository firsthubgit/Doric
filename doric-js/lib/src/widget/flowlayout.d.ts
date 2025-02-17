import { Stack } from './layouts';
import { Superview, View, NativeViewModel } from '../ui/view';
import { BridgeContext } from "../runtime/global";
export declare class FlowLayoutItem extends Stack {
    /**
    * Set to reuse native view
    */
    identifier?: string;
    /**
     * When set to true, the item will layout using all span area.
     * LoadMoreView is default to true.
     */
    fullSpan?: boolean;
}
export declare class FlowLayout extends Superview {
    private cachedViews;
    allSubviews(): FlowLayoutItem[];
    columnCount: number;
    columnSpace?: number;
    rowSpace?: number;
    itemCount: number;
    renderItem: (index: number) => FlowLayoutItem;
    batchCount: number;
    onLoadMore?: () => void;
    loadMore?: boolean;
    loadMoreView?: FlowLayoutItem;
    onScroll?: (offset: {
        x: number;
        y: number;
    }) => void;
    onScrollEnd?: (offset: {
        x: number;
        y: number;
    }) => void;
    scrollable?: boolean;
    /**
     * Take effect only on iOS
     */
    bounces?: boolean;
    /**
     * @param context
     * @returns Returns array of visible view's index.
     */
    findVisibleItems(context: BridgeContext): Promise<number[]>;
    /**
     * @param context
     * @returns Returns array of completely visible view's index.
     */
    findCompletelyVisibleItems(context: BridgeContext): Promise<number[]>;
    reset(): void;
    private getItem;
    private renderBunchedItems;
    toModel(): NativeViewModel;
}
export declare function flowlayout(config: Partial<FlowLayout>): FlowLayout;
export declare function flowItem(item: View | View[], config?: Partial<FlowLayoutItem>): FlowLayoutItem;
