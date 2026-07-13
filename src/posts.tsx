import type { ReactNode } from "react";

export type PostEntry = {
  slug: string;
  title: ReactNode;
  body: ReactNode;
};

export const posts: PostEntry[] = [
  {
    slug: "leech2-cfengine-3-28",
    title: "leech2 is now part of CFEngine 3.28",
    body: (
      <>
        <a href="https://github.com/larsewi/leech2">leech2</a> is now part of
        CFEngine 3.28. Read more in the{" "}
        <a href="https://cfengine.com/blog/2026/cfengine-3-28-released-introspection/">
          release blog post
        </a>
        .
      </>
    ),
  },
  {
    slug: "leech2",
    title: "Change tracking and replication with leech2",
    body: (
      <>
        <a href="https://github.com/larsewi/leech2">leech2</a> is a tool for
        tracking and replicating changes to CSV-based tables. It uses a git-like
        content-addressable block chain to store deltas and can generate SQL
        statements for replaying changes on target databases.
      </>
    ),
  },
  {
    slug: "zeugl",
    title: "Atomic file operations with zeugl",
    body: (
      <>
        I wrote <a href="https://github.com/larsewi/zeugl">zeugl</a>, a small C
        library that provides atomic file operations. It offers drop-in
        replacements for <code>open(2)</code> and <code>close(2)</code>, using
        temporary files and <code>rename(2)</code> to ensure updates are never
        partially written.
      </>
    ),
  },
  {
    slug: "librsync",
    title: "Efficient file streams with librsync",
    body: (
      <>
        I recently wrote a{" "}
        <a href="https://cfengine.com/blog/2025/efficient-file-streams-with-librsync/">
          blog post
        </a>{" "}
        on implementing efficient file streams with{" "}
        <a href="https://github.com/librsync/librsync">librsync</a>.
      </>
    ),
  },
  {
    slug: "getopt-long",
    title: (
      <>
        Optional arguments with <code>getopt_long(3)</code>
      </>
    ),
    body: (
      <>
        In this{" "}
        <a href="https://cfengine.com/blog/2021/optional-arguments-with-getopt-long/">
          blog post
        </a>
        , I answer a commonly asked question on how to parse optional arguments
        with <code>getopt_long(3)</code>.
      </>
    ),
  },
];
