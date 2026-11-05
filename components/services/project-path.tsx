import { projectPath } from "@/content/services";

/** The four steps of a project, as a timeline whose line draws down the page as you scroll. */
export function ProjectPath() {
  return (
    <ol className="svc-path relative space-y-2 pl-14">
      <span aria-hidden className="svc-path-line absolute bottom-6 left-5 top-6 w-[3px] origin-top rounded bg-accent" />
      <span aria-hidden className="absolute bottom-6 left-5 top-6 -z-10 w-[3px] rounded bg-line" />
      {projectPath.map((s, i) => (
        <li key={s.name} className="reveal relative py-5">
          <span className="absolute -left-14 top-4 grid size-11 place-items-center rounded-xl border-2 border-accent bg-ground font-display font-bold">{i + 1}</span>
          <h3 className="h3">{s.name}</h3>
          <p className="mt-1 max-w-xl text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
