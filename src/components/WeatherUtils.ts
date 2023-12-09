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

export function getWeatherOutfit(temp: number): string[] {
  if (temp > 28) {
    return ['민소매', '반팔티', '반바지', '린넨'];
  } else if (temp >= 23 && temp <= 27.9) {
    return ['반팔티', '린넨 셔츠', '롱슬리브', '반바지', '면바지'];
  } else if (temp >= 20 && temp <= 22.9) {
    return ['롱슬리브', '셔츠', '후드티', '면바지', '슬랙스', '청바지'];
  } else if (temp >= 17 && temp <= 19.9) {
    return ['후드티', '맨투맨', '바람막이', '가디건', '청바지', '슬랙스'];
  } else if (temp >= 12 && temp <= 16.9) {
    return [
      '재킷',
      '가디건',
      '야상',
      '니트',
      '맨투맨',
      '후드티',
      '청바지',
      '면바지',
    ];
  } else if (temp >= 9 && temp <= 11.9) {
    return ['재킷', '야상', '트렌치 코트', '니트', '청바지', '면바지'];
  } else if (temp >= 5 && temp <= 8.9) {
    return ['코트', '가죽 재킷', '플리스', '니트', '청바지'];
  } else {
    return ['패딩', '코트', '목도리', '방한용품'];
  }
}

export function getSeason(temp: number): string[] {
  if (temp >= -30 && temp < 9) {
    return ['winter'];
  } else if (temp >= 9 && temp < 17) {
    return ['fall'];
  } else if (temp >= 17 && temp < 23) {
    return ['spring'];
  } else if (temp >= 23 && temp < 40) {
    return ['summer'];
  } else {
    return ['알 수 없음'];
  }
}

export function getOutfitByCategory(category: string): string[] {
  switch (category) {
    case '아우터':
      return [
        '바람막이',
        '재킷',
        '야상',
        '트렌치코트',
        '코트',
        '가죽 재킷',
        '패딩',
        '플리스',
      ];
    case '상의':
      return [
        '민소매',
        '반팔티',
        '린넨',
        '린넨셔츠',
        '롱슬리브',
        '셔츠',
        '후드티',
        '맨투맨',
        '가디건',
        '니트',
      ];
    case '하의':
      return ['반바지', '면바지', '슬랙스', '청바지'];
    default:
      return [
        '바람막이',
        '재킷',
        '야상',
        '트렌치코트',
        '코트',
        '가죽 재킷',
        '패딩',
        '플리스',
        '민소매',
        '반팔티',
        '린넨',
        '린넨셔츠',
        '롱슬리브',
        '셔츠',
        '후드티',
        '맨투맨',
        '가디건',
        '니트',
        '반바지',
        '면바지',
        '슬랙스',
        '청바지',
      ];
  }
}

export const translateCategory = (category: string): string => {
  switch (category) {
    case '봄':
      return 'spring';
    case '여름':
      return 'summer';
    case '가을':
      return 'fall';
    case '겨울':
      return 'winter';
    default:
      return category;
  }
};
