import type { PostEntry } from "../posts";

export function Post({ title, body }: Pick<PostEntry, "title" | "body">) {
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
