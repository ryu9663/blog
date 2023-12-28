export const convertImgTag = (markdown: string) => {
  const regex = /<img src="([^?]+)\?w=(\d+)&h=(\d+)" alt="([^"]+)">/g;
  const updatedStr = markdown.replace(
    regex,
    //layout shift방지를 위해 width,height를 img태그에 추가
    '<img src="$1" alt="$4" width="$2" height="$3">',
  );
  return updatedStr;
};
