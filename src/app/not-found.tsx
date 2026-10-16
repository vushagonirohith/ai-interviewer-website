import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell
      eyebrow="404"
      title={
        <>
          That question <span className="italic text-ember">isn&apos;t in the rubric.</span>
        </>
      }
      lede="The page you're looking for doesn't exist or has moved."
    >
      <div className="mt-10">
        <Button href="/">Back to the start</Button>
      </div>
    </PageShell>
  );
}
