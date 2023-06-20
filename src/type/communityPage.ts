export interface ICommunityPost {
  commentCount: number;
  comments: { commentId: number; content: string; memberNickname: string }[];
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
