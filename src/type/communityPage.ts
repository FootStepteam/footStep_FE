interface ICommunityPost {
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

interface ICommunityData {
  communities: ICommunityPost[];
  lastPage: boolean;
}

interface IListsProps {
  searchQuery: string;
  selectedCategory: string;
}

interface IGetCommunityParams {
  page?: number;
  size?: number;
  sort?: string;
}
