import { StorySkeleton } from "@/components/ui/SectionHeading";

export default function Loading() {
  return (
    <div className="desk grid gap-4 py-10 md:grid-cols-2">
      <StorySkeleton />
      <StorySkeleton />
    </div>
  );
}
