export function transformCityName(cityName: string): string {
  const cityMappings: { [key: string]: string } = {
    seoul: '서울',
    busan: '부산',
    incheon: '인천',
    daegu: '대구',
    ulsan: '울산',
    suwon: '수원',
    daejeon: '대전',
  };

  return cityMappings[cityName.toLowerCase()] || cityName;
}

export function getWeatherImage(
  temp: number,
  rain: number | undefined,
  snow: number | undefined
): string {
  if (rain) {
    return 'asset/Rain-img.jpg';
  } else if (snow) {
    return 'asset/Snow-img.jpg';
  } else if (temp >= 28) {
    return 'asset/Hot-img.jpg';
  } else if (temp >= 23) {
    return 'asset/Warm-img.jpg';
  } else if (temp >= 12) {
    return 'asset/Fall-img.jpg';
  } else {
    return 'asset/Cold-img.jpg';
  }
}

export function getWeatherOutfit(temp: number): string {
  if (temp > 28) {
    return '민소매, 반팔, 반바지, 원피스';
  } else if (temp >= 27 && temp <= 28) {
    return '반팔, 얇은 셔츠, 반바지';
  } else if (temp >= 22 && temp <= 26) {
    return '얇은 가디건, 긴팔';
  } else if (temp >= 19 && temp <= 21) {
    return '얇은 니트, 맨투맨, 가디건';
  } else if (temp >= 16 && temp <= 18) {
    return '자켓, 야상';
  } else if (temp >= 12 && temp <= 15) {
    return '자켓, 트렌치코트, 야상';
  } else if (temp >= 5 && temp <= 11) {
    return '코트, 가죽자켓';
  } else {
    return '패딩, 두꺼운 코트, 목도리';
  }
}
