export interface ICommunityPost {
  commentCount: number;
  comments: IComment[];
  communityId: number;
  communityName: string;
  content: string;
  createdDate: string;
  likeCount: number;
  memberId: number;
  memberNickname: string;
  travelEndDate: string;
  travelStartDate: string;
  communityPublicState: boolean;
}

export interface ICommunityData {
  communities: ICommunityPost[];
  lastPage: boolean;
}

export interface IListsProps {
  searchQuery: string;
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
  communityId: number;
  initialLikeCount: number;
}
