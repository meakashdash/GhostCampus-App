import { atom } from 'recoil';

export const tokenState = atom<string | null>({
    key: 'token',
    default: '',
});

export const userIdState = atom<string>({
    key: 'userIdState',
    default: "",
});

export const likedPostsState=atom<string[]>({
    key:'likedPostsState',
    default:[]
})

export const bookmarkedPostsState=atom<string[]>({
    key:'bookmarkedPostsState',
    default:[]
})

export const downVotePostState=atom<string[]>({
    key:'downVotePostState',
    default:[]
})

export const visibleComment=atom<boolean>({
    key:'visibleComment',
    default:false
})

export const checkCommentPostId=atom<string>({
    key:'checkCommentPostId',
    default:''
})

export const userWishlistItemId=atom<string[]>({
    key:'userWishlistItemId',
    default:[]
})