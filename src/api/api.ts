import axios from 'axios';

// 카테고리 번호를 한글로 변환하는 함수
const getCategoryName = (category: string) => {
  switch (category) {
    case 'PTY':
      return '강수형태';
    case 'REH':
      return '습도';
    case 'RN1':
      return '1시간 강수량';
    case 'T1H':
      return '기온';
    case 'UUU':
      return '동서바람성분';
    case 'VEC':
      return '풍향';
    case 'VVV':
      return '남북바람성분';
    case 'WSD':
      return '풍속';
    default:
      return category;
  }
};

export const fetchWeatherData = async () => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl =
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 1); // 현재 시간에서 1 시간 빼기
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const baseDate = `${year}${month}${day}`;
    const baseTime = `${hour}00`;

    const params = {
      serviceKey: apiKey,
      pageNo: '1',
      numOfRows: '10',
      dataType: 'JSON',
      base_date: baseDate,
      base_time: baseTime,
      nx: ' 58',
      ny: '133',
    };

    const response = await axios.get(apiUrl, { params });
    const data = response.data;
    console.log(data);
    // 데이터가 있을 때만 상태 업데이트
    if (
      data &&
      data.response &&
      data.response.body &&
      data.response.body.items &&
      data.response.body.items.item
    ) {
      const transformedData = data.response.body.items.item.map(
        (item: any) => ({
          category: getCategoryName(item.category),
          value: item.obsrValue,
        })
      );

      return transformedData;
    } else {
      console.error('API 응답 데이터 구조가 변경되었습니다.');
      return [];
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return [];
  }
};
