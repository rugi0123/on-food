import { IngredientCategory, ProductInfo } from '../types';

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    id: 'grains',
    name: '통곡물류 (15종)',
    description: '도정을 최소화하여 자연의 껍질과 씨눈 영양을 품은 100% 국산 통곡물',
    items: [
      { name: '현미', origin: '국내산 100%', feature: '구수하고 든든한 식이섬유 베이스' },
      { name: '발아현미', origin: '국내산 100%', feature: '싹을 틔워 부드러운 목넘김' },
      { name: '찰보리', origin: '국내산 100%', feature: '전통 맥류의 쫀득하고 고소한 풍미' },
      { name: '검은콩 (서리태)', origin: '국내산 100%', feature: '담백한 식물성 단백질 충전' },
      { name: '백태 (메주콩)', origin: '국내산 100%', feature: '깊고 은은한 고소함' },
      { name: '율무', origin: '국내산 100%', feature: '깔끔하고 맑은 곡물 뒷맛' },
      { name: '기장', origin: '국내산 100%', feature: '노란빛의 담백한 토종 잡곡' },
      { name: '차조', origin: '국내산 100%', feature: '부드럽고 은은한 단맛' },
      { name: '수수', origin: '국내산 100%', feature: '떫지 않고 구수한 옛 곡물' },
      { name: '흑미 (검은쌀)', origin: '국내산 100%', feature: '자연스러운 곡물 색감과 향' },
      { name: '귀리 (오트)', origin: '국내산 100%', feature: '오래 지속되는 든든한 포만감' },
      { name: '찹쌀', origin: '국내산 100%', feature: '물에 부드럽게 풀리는 질감' },
      { name: '멥쌀', origin: '국내산 100%', feature: '편안하고 친숙한 밥맛의 기준' },
      { name: '통밀', origin: '국내산 100%', feature: '정제되지 않은 원맥의 향' },
      { name: '메밀', origin: '국내산 100%', feature: '시원하고 담백한 풍미' },
    ],
  },
  {
    id: 'leafy',
    name: '푸른 잎채소 (15종)',
    description: '산지에서 수확 후 깨끗이 세척하여 동결건조한 신선 엽채류',
    items: [
      { name: '케일', origin: '국내산 100%', feature: '푸른 잎 본연의 싱그러운 엽록소' },
      { name: '신선초', origin: '국내산 100%', feature: '생채식의 깊은 풀내음' },
      { name: '시금치', origin: '국내산 100%', feature: '은은한 단맛과 부드러운 분말' },
      { name: '양배추', origin: '국내산 100%', feature: '속이 편안한 아침 식사 대용' },
      { name: '브로콜리', origin: '국내산 100%', feature: '신선한 꽃송이 채소의 담백함' },
      { name: '보리새싹', origin: '국내산 100%', feature: '어린 새싹의 맑고 푸른 풍미' },
      { name: '밀싹', origin: '국내산 100%', feature: '자연 그대로의 파릇한 생기' },
      { name: '미나리', origin: '국내산 100%', feature: '청아하고 향긋한 마무리' },
      { name: '쑥', origin: '국내산 100%', feature: '은은하게 퍼지는 토종 쑥향' },
      { name: '깻잎', origin: '국내산 100%', feature: '우리 땅에서 자란 특유의 알싸한 향' },
      { name: '열무잎', origin: '국내산 100%', feature: '깔끔하고 시원한 채소의 결' },
      { name: '청경채', origin: '국내산 100%', feature: '자극 없이 맑고 가벼운 맛' },
      { name: '콜라비잎', origin: '국내산 100%', feature: '달큼하고 아삭한 원물의 맛' },
      { name: '솔잎', origin: '국내산 100%', feature: '상쾌하고 숲속 같은 향미' },
      { name: '뽕잎', origin: '국내산 100%', feature: '예로부터 전해오는 부드러운 잎' },
    ],
  },
  {
    id: 'roots',
    name: '뿌리·구근채소 (8종)',
    description: '비옥한 흙의 기운을 담아 껍질째 깨끗하게 갈아 넣은 뿌리 채소',
    items: [
      { name: '당근', origin: '국내산 100%', feature: '자연스러운 달콤함과 주황빛 색감' },
      { name: '우엉', origin: '국내산 100%', feature: '뿌리 특유의 깊고 그윽한 구수함' },
      { name: '연근', origin: '국내산 100%', feature: '담백하고 끈기 있는 부드러움' },
      { name: '마 (산약)', origin: '국내산 100%', feature: '부드럽게 속을 감싸주는 질감' },
      { name: '무', origin: '국내산 100%', feature: '깔끔하고 시원한 뒷맛' },
      { name: '더덕', origin: '국내산 100%', feature: '은은한 흙향과 진한 풍미' },
      { name: '비트', origin: '국내산 100%', feature: '맑은 붉은빛과 담백한 맛' },
      { name: '고구마', origin: '국내산 100%', feature: '설탕 없이도 부드러운 단맛' },
    ],
  },
  {
    id: 'mushrooms',
    name: '버섯 및 해조류 (7종)',
    description: '청정 바다와 숲에서 자란 자연산·재배 원물 건조 분말',
    items: [
      { name: '표고버섯', origin: '국내산 100%', feature: '감칠맛 나는 고소한 자연의 향' },
      { name: '영지버섯', origin: '국내산 100%', feature: '아주 미세하게 배어나는 깊은 풍미' },
      { name: '느타리버섯', origin: '국내산 100%', feature: '담백하고 순한 맛의 조화' },
      { name: '다시마', origin: '국내 완도산', feature: '천연 미네랄과 감칠맛' },
      { name: '미역', origin: '국내 완도산', feature: '부드러운 해조류 본연의 질감' },
      { name: '김', origin: '국내 서해안', feature: '고소하고 은은한 바다의 풍미' },
      { name: '톳', origin: '국내 남해안', feature: '오돌오돌한 바다 채소 분말' },
    ],
  },
  {
    id: 'fruits',
    name: '과일 및 씨앗 (5종)',
    description: '화학 첨가물 없이 원물 그대로의 달콤함과 고소함을 완성',
    items: [
      { name: '사과', origin: '국내 청송·충주산', feature: '새콤달콤한 자연 과육의 풍미' },
      { name: '배', origin: '국내 나주산', feature: '시원하고 맑은 단맛' },
      { name: '단호박', origin: '국내산 100%', feature: '부드럽고 샛노란 자연 단맛' },
      { name: '참깨', origin: '국내산 100%', feature: '마지막 한 모금까지 진한 고소함' },
      { name: '들깨', origin: '국내산 100%', feature: '풍부하고 깊은 전통 들깨향' },
    ],
  },
];

export const MAIN_PRODUCT: ProductInfo = {
  id: 'onharu-saengsik-30',
  name: '온하루 순수 생식 (30포 / 1개월분)',
  subName: '100% 국내산 50가지 곡물·채소 동결건조 생식 분말',
  originalPrice: 58000,
  salePrice: 45000,
  unit: '1박스 (35g × 30포)',
  capacity: '총 1,050g (35g × 30포)',
  badge: '산지직송 무료배송',
  freeShippingThreshold: 0,
  bonusGift: '친환경 트라이탄 전용 보틀(500ml) + 원목 계량스푼 전원 무료 증정',
  deliveryTime: '오후 2시 이전 주문 시 오늘 바로 우체국 택배 발송 (익일 수령 가능)',
};

export const TARGET_AUDIENCE = [
  {
    step: '01',
    title: '바쁜 출근길, 아침 식사를 자주 거르시는 분',
    desc: '아침밥 차릴 시간 없는 5분, 보틀에 붓고 흔들면 든든하고 속 편한 한 끼 식사가 완성됩니다.',
    highlight: '1분 완성 아침 대용',
  },
  {
    step: '02',
    title: '매번 균형 잡힌 끼니 챙기기 번거로운 분',
    desc: '장보기부터 조리, 설거지까지 복잡한 과정 없이 물이나 우유만 부어 간편하게 해결할 수 있습니다.',
    highlight: '간편한 식사 관리',
  },
  {
    step: '03',
    title: '평소 자연 채소와 통곡물 섭취가 부족하신 분',
    desc: '현미, 케일, 당근, 버섯 등 매일 식탁에서 다 챙기기 어려운 국내산 50가지 자연 원물을 골고루 섭취할 수 있습니다.',
    highlight: '국내산 50가지 원물',
  },
];

export const HOW_TO_DRINK_STEPS = [
  {
    stepNumber: '1',
    label: '1단계',
    action: '물 또는 우유 200ml 붓기',
    description: '가루가 바닥에 뭉치지 않도록 보틀이나 컵에 액체(물, 우유, 두유 등)를 먼저 넉넉히 부어주세요.',
    tip: '고소한 맛을 선호하시면 우유나 두유를, 깔끔하고 담백한 맛을 원하시면 생수를 추천합니다.',
  },
  {
    stepNumber: '2',
    label: '2단계',
    action: '생식 1포(35g) 넣기',
    description: '개별 이지컷 포장된 온하루 생식 1포를 뜯어 보틀에 쏙 부어 넣습니다.',
    tip: '1회분씩 위생적으로 개별 포장되어 있어 가방에 넣어 출근하거나 외출 시에도 간편합니다.',
  },
  {
    stepNumber: '3',
    label: '3단계',
    action: '가볍게 흔들어 맛있게 마시기',
    description: '뚜껑을 닫고 위아래로 5~10초간 가볍게 흔들어주시면 부드럽게 섞입니다. 천천히 씹듯이 마셔주세요.',
    tip: '달콤한 풍미를 더하고 싶으시다면 꿀 반 스푼이나 조청을 살짝 넣어 드셔도 아주 잘 어울립니다.',
  },
];

export const TRUST_POINTS = [
  {
    title: '100% 국내산 원료',
    subtitle: '수입 원료 0%',
    text: '강원도 현미부터 제주 당근, 완도 해조류까지 우리 땅에서 자란 믿을 수 있는 50가지 농산물만 담았습니다.',
  },
  {
    title: '동결건조 공법',
    subtitle: '원물 영양 보존',
    text: '열풍으로 태우지 않고 영하 40도에서 급속 동결 건조하여 원재료의 색과 맛, 자연 영양소를 지켜냈습니다.',
  },
  {
    title: '첨가물 4無 원칙',
    subtitle: '순수 식품 그대로',
    text: '인공 감미료, 합성 착향료, 보존제, 백설탕을 일절 첨가하지 않은 순수 자연 곡물과 채소 분말입니다.',
  },
  {
    title: '1회용 이지컷 스틱',
    subtitle: '언제 어디서나 간편',
    text: '공기 접촉과 눅눅함을 방지하는 3중 알루미늄 개별 포장으로 출근길, 사무실, 여행지에서도 가볍게 챙깁니다.',
  },
];
