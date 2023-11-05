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
    return '민소매, 반팔티, 반바지, 린넨';
  } else if (temp >= 23 && temp <= 27) {
    return '반팔티, 린넨 셔츠, 롱슬리브, 반바지, 면바지';
  } else if (temp >= 20 && temp <= 22) {
    return ' 롱슬리브, 셔츠, 후드티, 면바지, 슬랙스,  청바지';
  } else if (temp >= 17 && temp <= 19) {
    return ' 후드티, 스웨트 셔츠, 바람막이, 가디건, 긴바지, 청바지, 슬랙스';
  } else if (temp >= 12 && temp <= 16) {
    return '재킷, 가디건, 청재킷, 야상, 니트, 스웨트 셔츠(맨투맨), 셔츠, 기모 후드티, 청바지, 면바지, 살구색 스타킹';
  } else if (temp >= 9 && temp <= 11) {
    return '재킷, 야상, 점퍼, 트렌치 코트, 니트, 청바지, 면바지, 검은색 스타킹, 기모 바지, 레이어드';
  } else if (temp >= 5 && temp <= 8) {
    return '코트, 가죽 재킷, 플리스, 내복, 니트, 레깅스, 청바지, 두꺼운 바지, 스카프, 기모';
  } else {
    return '패딩, 코트, 누빔, 내복, 목도리, 장갑, 기모, 방한용품';
  }
}
