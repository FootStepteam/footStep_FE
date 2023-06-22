export interface ICommunityPost {
  commentCount: number;
  comments: IComment[];
  communityId: number;
  communityName: string;
  content: string;
  createdDate: string;
  likeCount: number;
  memberNickname: string;
  travelEndDate: string;
  travelStartDate: string;
}

export interface ICommunityData {
  communities: ICommunityPost[];
  lastPage: boolean;
}

export interface IListsProps {
  searchQuery: string;
  selectedCategory: string;
}

export interface IGetCommunityParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface ICommentCreateForm {
  content: string;
  communityId: number;
}

export interface IComment {
  commentId: number;
  content: string;
  memberNickname: string;
  memberId: number;
}

export interface ICommentUpdateForm {
  content: string;
}

export interface ILikeProps {
  communityId: string;
  initialLikeCount: number;
}
