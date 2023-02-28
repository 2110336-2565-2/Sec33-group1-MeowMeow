const NO_NEED_TO_REFRESH_URLS = ["/auth/sign-in", "/auth/refresh"];

const checkRefresh = (url: string) => {
  const isRefresh = !NO_NEED_TO_REFRESH_URLS.find((eachUrl) => {
    return eachUrl === url;
  });

  return isRefresh;
};

export default checkRefresh;
