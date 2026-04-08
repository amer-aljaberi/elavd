import { Layers } from "lucide-react";

export const ProductCardSkeleton = () => (
    <div className="bg-background border border-border p-6 flex flex-col h-[450px] animate-pulse">
        <div className="h-60 w-full bg-muted mb-6 flex items-center justify-center rounded-lg">
            <Layers className="size-12 text-muted-foreground/30" />
        </div>
        <div className="flex flex-col items-center space-y-3">
            <div className="h-5 w-3/4 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
            <div className="h-11 w-full bg-muted rounded-full mt-auto" />
        </div>
    </div>
);

