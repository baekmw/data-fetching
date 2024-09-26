import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

export const App = () => {
  type jsonplaceholderPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
  type jsonplaceholderComment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  };
  const [list, setList] = useState<jsonplaceholderPost[]>();
  const [content, setContent] = useState<string>();
  const [comment, setComment] = useState<jsonplaceholderComment[] | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setList(json);
      })
      .catch(() => {
        window.alert('포스트 데이터를 불러오지 못했습니다.');
      });
  }, []);

  const handleContent = (post: jsonplaceholderPost) => {
    setContent(post.body);
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        setComment(json);
      })
      .catch(() => {
        window.alert('댓글 데이터를 불러오지 못했습니다.');
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-5 bg-zinc-100">
      <div className="grid grid-cols-2 grid-rows-2 w-full h-[50rem] p-3 bg-white rounded-2xl shadow-xl">
        <div className="col-span-1 row-span-2 flex flex-col h-full pr-[3px] space-y-3 border-r-2 border-zinc-300">
          <p className="w-fit text-xl font-bold brush-line z-10">
            ✨포스트 목록
          </p>
          <div className="overflow-y-scroll flex flex-col">
            {list?.map((post) => (
              <button
                className="flex justify-start p-2 mx-2 rounded-lg hover:bg-zinc-200 focus:ring-blue-300 focus:ring-2 font-semibold duration-300 animate-fadeIn"
                key={post.id}
                onClick={() => {
                  handleContent(post);
                  setComment(null);
                }}
              >
                <div className="mr-3">{post.id}.</div>
                <div className="text-start">{post.title}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-1 row-span-1 pl-3 space-y-3 border-b-2 border-zinc-300 border-dashed">
          <p className="w-fit text-xl font-bold brush-line z-10">📜내용</p>
          <div className="h-full">
            {comment === null ? (
              <div className="h-full flex justify-center items-center animate-fadeIn">
                <p>loading</p>
              </div>
            ) : (
              <div className="font-semibold animate-fadeIn" key={content}>
                {content}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col col-span-1 row-span-1 pt-3 pl-3 space-y-3">
          <p className="w-fit text-xl font-bold brush-line z-10">👥댓글</p>
          <div className="h-full space-y-3 overflow-y-scroll">
            {comment === null ? (
              <div className="h-full flex justify-center items-center animate-fadeIn">
                <p>loading</p>
              </div>
            ) : (
              comment.map((oneComment, index) => {
                return (
                  <div
                    key={index}
                    className="border-b-[2px] border-zinc-200 pb-3 animate-fadeIn"
                  >
                    <p className="font-bold">작성자: {oneComment.email}</p>
                    <p>{oneComment.body}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
