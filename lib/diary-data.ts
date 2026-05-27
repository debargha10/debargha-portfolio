export type DiaryImage = {
  src: string;
  alt: string;
};

export type DiaryVideo = {
  src: string;
  title: string;
};

export const diaryImages: DiaryImage[] = Array.from({ length: 18 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return {
    src: `/diary/images/img-${id}.jpg`,
    alt: `Travel diary frame ${id}`,
  };
});

export const diaryVideos: DiaryVideo[] = Array.from({ length: 6 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return {
    src: `/diary/videos/clip-${id}.mp4`,
    title: `Travel motion ${id}`,
  };
});

export const diaryHeroVideo = "/diary/videos/top.mp4";
export const diaryMusic = "/diary/audio/travel.mp3";
