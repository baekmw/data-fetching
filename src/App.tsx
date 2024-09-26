import './reset.css';
import './App.css';

import { useEffect, useRef, useState } from 'react';

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
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json: jsonplaceholderPost[]) => {
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
      .then((json: jsonplaceholderComment[]) => {
        setComment(json);
      })
      .catch(() => {
        window.alert('댓글 데이터를 불러오지 못했습니다.');
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4 sm:p-10 bg-zinc-100">
      <div className="hidden sm:grid grid-cols-2 grid-rows-2 w-full h-full p-3 bg-white rounded-2xl shadow-xl">
        <div className="col-span-1 row-span-2 flex flex-col h-full pr-[3px] space-y-3 border-r-2 border-zinc-300">
          <p className="w-fit text-xl font-bold brush-line z-10">
            ✨포스트 목록
          </p>
          <div className="overflow-y-scroll flex flex-col">
            {list?.map((post, index) => (
              <button
                className={
                  post.body === content
                    ? 'flex justify-start p-2 mx-2 rounded-lg bg-blue-200 hover:bg-blue-300 focus:ring-blue-300 focus:ring-2 font-semibold duration-300 animate-fadeIn'
                    : 'flex justify-start p-2 mx-2 rounded-lg hover:bg-blue-500/30 focus:ring-blue-300 focus:ring-2 font-semibold duration-300 animate-fadeIn'
                }
                key={index}
                onClick={() => {
                  handleContent(post);
                  setComment(null);
                  buttonRef.current[index]?.classList.add('bg-blue-200');
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
      <div className="flex flex-col w-full overflow-hidden sm:hidden">
        <div className="relative flex flex-col sm:hidden w-full h-fit p-3 space-y-3 bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between w-full">
            <p className="w-fit text-xl font-bold brush-line z-10">
              ✨포스트 목록
            </p>
            <button
              onClick={() => {
                setIsMenuOpened(!isMenuOpened);
              }}
            >
              메뉴버튼
            </button>
          </div>
        </div>
        {isMenuOpened && (
          <div
            className="absolute top-[3.8rem] w-[95%] overflow-y-scroll z-40 bg-white/30 backdrop-blur-md flex flex-col rounded-xl animate-clearIn origin-top"
            key={isMenuOpened.toString()}
          >
            {list?.map((post, index) => (
              <button
                className={
                  post.body === content
                    ? 'flex justify-start p-2 mx-2 rounded-lg bg-blue-200 hover:bg-blue-300 focus:ring-blue-300 focus:ring-2 font-semibold duration-300 animate-fadeIn'
                    : 'flex justify-start p-2 mx-2 rounded-lg hover:bg-blue-500/30 focus:ring-blue-300 focus:ring-2 font-semibold duration-300 animate-fadeIn'
                }
                key={index}
                onClick={() => {
                  handleContent(post);
                  setComment(null);
                  buttonRef.current[index]?.classList.add('bg-blue-200');
                }}
              >
                <div className="mr-3">{post.id}.</div>
                <div className="text-start">{post.title}</div>
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-col sm:hidden w-full h-[20vh] mt-3 p-3 space-y-3 bg-white rounded-2xl shadow-lg">
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
        <div className="flex flex-col sm:hidden w-full h-[70vh] mt-3 p-3 space-y-3 bg-white rounded-2xl shadow-lg">
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
