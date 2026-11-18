import { site } from "@/content/site.config";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="desk py-10 sm:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">{site.volume}</p>
      <h1 className="display mt-3 max-w-[12ch] text-[clamp(3rem,7vw,6rem)]">An evening desk, not a feed.</h1>
      <div className="story mt-8 max-w-3xl">
        <p>
          Emberline files one edition. Twenty stories sit on a cylinder at the top of the page. You turn it by scrolling. When the twentieth plate faces you, the pin lets go and the rest of the paper begins.
        </p>
        <p>
          The mark is a folded page with a register cross on the crease, the sort a printer uses to know the colours landed on the same sheet. We kept that and left the gradients in the drawer.
        </p>
        <p>
          Eight desks file into the edition: world, politics, business, culture, science, climate, sport, and opinion. If a story has no photograph, the plate still holds its shape. The paper, the mark, and the section name stand in.
        </p>
        <p>The evening list never leaves this browser. The wire, when it is warm, is the point.</p>
      </div>
    </div>
  );
}
