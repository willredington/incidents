export type Gif = {
  id: string;
  title: string;
  images: {
    downsized: {
      url: string;
    };
    original: {
      url: string;
    };
  };
};
