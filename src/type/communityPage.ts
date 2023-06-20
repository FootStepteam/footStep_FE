interface ICommunityPost {
  communityName: string;
  createdDate: string;
  likeCount: number;
  memberNickname: string;
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
