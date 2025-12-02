export function FilterSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>

      {/* Simulate 5 filter sections */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-100 rounded"></div>
            <div className="h-5 w-full bg-gray-100 rounded"></div>
            <div className="h-5 w-3/4 bg-gray-100 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
