import React from "react";
import MyReact from "../lib/MyReact";

const Board = ({ posts, tag }) => {
  MyReact.resetCursor();

  const [darkTheme, setDarkTheme] = React.useState(false);
  const filterPosts = () => {
    // 아주 무거운 연산.. 이라고 가정..
    for (let i = 0; i < 2500000001; i++) {}

    console.log("filtering..");

    return posts.filter((post) => (tag ? post.tag === tag : true));
  };

  const filteredPosts = MyReact.useMemo(filterPosts, [posts, tag]);

  console.log("Board rendered");

  return (
    <section>
      <button onClick={() => setDarkTheme(!darkTheme)}>
        테마 변경
        <span>{darkTheme ? "어두운 테마" : "밝은 테마"}</span>
      </button>
      <FilteredPosts posts={filteredPosts} />
    </section>
  );
};

const FilteredPosts = MyReact.memo(({ posts }) => {
  console.log("Filtered Posts rendered");

  return (
    <ul>
      {posts.map(({ id, content, tag }) => (
        <li key={id}>
          #{tag} {content}
        </li>
      ))}
    </ul>
  );
});

const POSTS = [
  { id: "id_1", content: "content_1", tag: "tag_1" },
  { id: "id_2", content: "content_2", tag: "tag_1" },
  { id: "id_3", content: "content_3", tag: "tag_2" },
];

export default () => {
  const [tag, setTag] = React.useState("");

  return (
    <>
      <button onClick={() => setTag("")}>ALL</button>
      <button onClick={() => setTag("tag_1")}>Tag1</button>
      <button onClick={() => setTag("tag_2")}>Tag2</button>
      <Board posts={POSTS} tag={tag} />
    </>
  );
};
