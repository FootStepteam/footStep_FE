export interface ICommunityPost {
  communityName: string;
  createdDate: string;
  likeCount: number;
  memberNickname: string;
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
