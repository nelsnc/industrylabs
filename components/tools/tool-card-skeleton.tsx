import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ToolCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="w-12 h-12 rounded-md" />
          <div className="flex gap-1">
            <Skeleton className="w-16 h-5 rounded" />
            <Skeleton className="w-16 h-5 rounded" />
          </div>
        </div>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
