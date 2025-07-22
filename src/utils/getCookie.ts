const getCookie = (name: string, cookies?: string) => {
  if (!cookies) {
    return null;
  }

  const cookiesSplitted = cookies.split(';');

  for (let i = 0; i < cookiesSplitted.length; i += 1) {
    const [key, value] = cookiesSplitted[i]
      .split('=')
      .map((item) => item.trim());

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
};

export default getCookie;
