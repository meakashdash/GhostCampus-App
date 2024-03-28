import { atom } from 'recoil';

export const isLoggedInState = atom<boolean>({
    key: 'isLoggedInState',
    default: false,
  });
  
export const userIdState = atom<string | null>({
    key: 'userIdState',
    default: null,
  });
  
export const likedPostsState = atom<string[]>({
    key: 'likedPostsState',
    default: [],
  });
  
export const bookmarkedPostsState = atom<string[]>({
    key: 'bookmarkedPostsState',
    default: [],
  });