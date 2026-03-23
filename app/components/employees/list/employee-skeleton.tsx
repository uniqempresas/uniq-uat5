'use client';

import { Card } from '../../../../components/ui/card';
import { Skeleton } from '../../../../components/ui/skeleton';

interface EmployeeSkeletonProps {
  count?: number;
}

export function EmployeeSkeleton({ count = 6 }: EmployeeSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-5">
          <div className="flex items-start gap-4 mb-4">
            <Skeleton className="w-14 h-14 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <Skeleton className="h-6 w-24 rounded-full mb-3" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-12 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );
}
