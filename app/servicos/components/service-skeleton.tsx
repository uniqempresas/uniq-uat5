import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-5 w-20" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-8 rounded" />
      </CardFooter>
    </Card>
  );
}
