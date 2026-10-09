import { Recipe } from '../types';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'tuxumli-pomidor',
    title: 'Tuxumli pomidor',
    description: 'Xushbo‘y qovurilgan pomidor va mayin tuxumdan tayyorlanadigan yengil hamda to‘yimli taom.',
    prepTime: '15 daqiqa',
    prepMinutes: 15,
    difficulty: 'Oson',
    servings: '2 kishilik',
    calories: '320 kkal',
    category: 'Nonushta / Tezkor',
    imageUrl: '/images/tuxumli-pomidor.jpg',
    ingredients: [
      { ingredientId: 'eggs', name: 'Tuxum', amount: '3 dona' },
      { ingredientId: 'tomatoes', name: 'Pomidor', amount: '2 dona' },
      { ingredientId: 'onions', name: 'Piyoz', amount: '1 dona' },
      { ingredientId: 'oil', name: 'O‘simlik yog‘i', amount: '2 osh qoshiq' },
      { ingredientId: 'salt', name: 'Tuz', amount: '1 choy qoshiq' },
    ],
    instructions: [
      'Piyozni mayda to‘g‘rab, tovada qizdirilgan yog‘da tillarang bo‘lguncha qovuring.',
      'Pomidorlarni parrak yoki kubik shaklida to‘g‘rab, piyoz ustiga soling va 3-4 daqiqa ezilib pishguncha dimlang.',
      'Tuz seping va aralashtiring.',
      'Ustidan tuxumlarni chaqib soling, olovni pasaytirib, qopqoqni yopib 3-5 daqiqa davomida tuxum pishguncha kuting.',
      'Issiq holda yangi non va ko‘katlar bilan dasturxonga torting.'
    ]
  },
  {
    id: 'kartoshka-qovurmasi',
    title: 'Kartoshka qovurmasi',
    description: 'Qarsildoq po‘stloqli, xushbo‘y piyozli har bir o‘zbek xonadonining eng sevimli tezkor taomi.',
    prepTime: '25 daqiqa',
    prepMinutes: 25,
    difficulty: 'Oson',
    servings: '3 kishilik',
    calories: '410 kkal',
    category: 'Kechki ovqat',
    imageUrl: '/images/kartoshka-qovurmasi.jpg',
    ingredients: [
      { ingredientId: 'potatoes', name: 'Kartoshka', amount: '4 dona' },
      { ingredientId: 'onions', name: 'Piyoz', amount: '1 dona' },
      { ingredientId: 'oil', name: 'O‘simlik yog‘i', amount: '3 osh qoshiq' },
      { ingredientId: 'salt', name: 'Tuz', amount: '1 choy qoshiq' },
    ],
    instructions: [
      'Kartoshkalarni archib, somoncha yoki parrak shaklida to‘g‘rang va sovuq suvda chayib, quriting.',
      'Tovada yog‘ni yaxshilab qizdiring va kartoshkani solib, o‘rtacha olovda qovuring.',
      'Kartoshka yarim pishganida mayda to‘g‘ralgan piyozni qo‘shing.',
      'Pishishiga 2-3 daqiqa qolganida tuz seping, ehtiyotkorlik bilan aralashtiring va qopqog‘ini yopib 5 daqiqa dimlang.',
      'Ustiga yangi ko‘katlar sepib tortiq qiling.'
    ]
  },
  {
    id: 'sabzavotli-makaron',
    title: 'Sabzavotli makaron',
    description: 'Shirin sabzi, sharbatli pomidor va xushbo‘y piyoz bilan uyg‘unlashgan to‘yimli taom.',
    prepTime: '20 daqiqa',
    prepMinutes: 20,
    difficulty: 'Oson',
    servings: '3 kishilik',
    calories: '380 kkal',
    category: 'Tushlik / Kechki ovqat',
    imageUrl: '/images/sabzavotli-makaron.jpg',
    ingredients: [
      { ingredientId: 'pasta', name: 'Makaron', amount: '300 gr' },
      { ingredientId: 'tomatoes', name: 'Pomidor', amount: '2 dona' },
      { ingredientId: 'onions', name: 'Piyoz', amount: '1 dona' },
      { ingredientId: 'carrots', name: 'Sabzi', amount: '1 dona' },
      { ingredientId: 'oil', name: 'O‘simlik yog‘i', amount: '2 osh qoshiq' },
      { ingredientId: 'salt', name: 'Tuz', amount: '1 choy qoshiq' },
    ],
    instructions: [
      'Qaynayotgan sho‘r suvda makaronni 8-10 daqiqa davomida pishirib oling va suzgichda suzib qoldiring.',
      'Alohida tovada yog‘ qizdirilib, piyoz va qirg‘ichdan o‘tkazilgan sabzi yumshaguncha qovuriladi.',
      'Mayda to‘g‘ralgan pomidor solinib, sous holiga kelguncha 5 daqiqa dimlanadi.',
      'Tuz qo‘shilib, qaynatilgan makaron sabzavotli sous bilan aralashtiriladi.',
      'Past olovda 2 daqiqa birga ushlab, dasturxonga tortiladi.'
    ]
  },
  {
    id: 'tovuqli-guruch',
    title: 'Tovuqli guruch',
    description: 'Mayin tovuq filesi, shirin sabzi va guruch bilan tayyorlanadigan yengil va lazzatli palovona taom.',
    prepTime: '40 daqiqa',
    prepMinutes: 40,
    difficulty: "O'rtacha",
    servings: '4 kishilik',
    calories: '520 kkal',
    category: 'Tushlik / Kechki ovqat',
    imageUrl: '/images/tovuqli-guruch.jpg',
    ingredients: [
      { ingredientId: 'chicken', name: 'Tovuq go‘shti', amount: '300 gr' },
      { ingredientId: 'rice', name: 'Guruch', amount: '250 gr' },
      { ingredientId: 'carrots', name: 'Sabzi', amount: '2 dona' },
      { ingredientId: 'onions', name: 'Piyoz', amount: '1 dona' },
      { ingredientId: 'oil', name: 'O‘simlik yog‘i', amount: '50 ml' },
      { ingredientId: 'salt', name: 'Tuz', amount: '1 choy qoshiq' },
    ],
    instructions: [
      'Qozonda yog‘ni qizdirib, o‘rtacha bo‘laklangan tovuq go‘shtini qizarguncha qovuring.',
      'To‘g‘ralgan piyoz va somoncha sabzini solib, sabzi yumshaguncha qovuring.',
      'Tuz va bir oz suv solib, 15 daqiqa miltillatib qaynating.',
      'Yaxshilab yuvilgan guruchni bir tekisda yoying, ustidan guruch sathidan 1 sm balandlikda iliq suv quying.',
      'Suv tortilgach, guruchni o‘rtaga to‘plab, qopqog‘ini yopib 15-20 daqiqa damlang.'
    ]
  },
  {
    id: 'moshxorda',
    title: 'Moshxo‘rda',
    description: 'An’anaviy o‘zbek oshxonasining darmondorilarga boy, to‘yimli va iforli moshli sho‘rvasi.',
    prepTime: '50 daqiqa',
    prepMinutes: 50,
    difficulty: "O'rtacha",
    servings: '4 kishilik',
    calories: '480 kkal',
    category: 'Sho‘rva / Suyuq taom',
    imageUrl: '/images/moshxorda.jpg',
    ingredients: [
      { ingredientId: 'mung_beans', name: 'Mosh', amount: '150 gr' },
      { ingredientId: 'rice', name: 'Guruch', amount: '150 gr' },
      { ingredientId: 'meat', name: 'Go‘sht', amount: '250 gr' },
      { ingredientId: 'carrots', name: 'Sabzi', amount: '1 dona' },
      { ingredientId: 'onions', name: 'Piyoz', amount: '1 dona' },
      { ingredientId: 'salt', name: 'Tuz', amount: '1 osh qoshiq' },
    ],
    instructions: [
      'Go‘shtni kichik kubik shaklida to‘g‘rab, piyoz va sabzi bilan birga qozonda yengil qovuring.',
      'Suv solib qaynating. Yuvilgan va tozalangan moshni qaynayotgan suvga soling.',
      'Mosh ochilguncha (taxminan 25-30 daqiqa) o‘rtacha olovda qaynatiladi.',
      'Mosh ochilgach, yuvilgan guruchni va tuzni soling.',
      'Guruch pishguncha yana 15-20 daqiqa qaynatiladi. Qatiq yoki ko‘katlar bilan tortiladi.'
    ]
  },
  {
    id: 'oddiy-quymoq',
    title: 'Oddiy quymoq',
    description: 'Oson, shirin va xushbo‘y — bolajonlar va butun oila uchun sevimli nonushta quymog‘i.',
    prepTime: '15 daqiqa',
    prepMinutes: 15,
    difficulty: 'Oson',
    servings: '2 kishilik',
    calories: '290 kkal',
    category: 'Nonushta / Shirinlik',
    imageUrl: '/images/oddiy-quymoq.jpg',
    ingredients: [
      { ingredientId: 'eggs', name: 'Tuxum', amount: '2 dona' },
      { ingredientId: 'flour', name: 'Un', amount: '200 gr' },
      { ingredientId: 'milk', name: 'Sut', amount: '300 ml' },
      { ingredientId: 'sugar', name: 'Shakar', amount: '1 osh qoshiq' },
      { ingredientId: 'oil', name: 'O‘simlik yog‘i', amount: '2 osh qoshiq' },
    ],
    instructions: [
      'Idishda tuxum va shakarni yaxshilab ko‘pirtiring.',
      'Iliq sutni qo‘shing va bir xil massa bo‘lguncha aralashtiring.',
      'Unni elakdan o‘tkazib soling va qumoqlar qolmasligi uchun venchik bilan aralashtiring.',
      'Xamirga 1-2 osh qoshiq yog‘ quying.',
      'Yaxshi qizdirilgan tovada har ikki tomonini 1 daqiqadan oltin rangga kirguncha pishiring.'
    ]
  },
  {
    id: 'sabzavotli-shorva',
    title: 'Sabzavotli sho‘rva',
    description: 'Go‘sht, kartoshka, sabzi va pomidordan tayyorlanadigan tetiklashtiruvchi klassik sho‘rva.',
    prepTime: '45 daqiqa',
    prepMinutes: 45,
    difficulty: "O'rtacha",
    servings: '4 kishilik',
    calories: '390 kkal',
    category: 'Sho‘rva / Suyuq taom',
    imageUrl: '/images/sabzavotli-shorva.jpg',
    ingredients: [
      { ingredientId: 'potatoes', name: 'Kartoshka', amount: '3 dona' },
      { ingredientId: 'carrots', name: 'Sabzi', amount: '1 dona' },
      { ingredientId: 'onions', name: 'Piyoz', amount: '1 dona' },
      { ingredientId: 'tomatoes', name: 'Pomidor', amount: '1 dona' },
      { ingredientId: 'meat', name: 'Go‘sht', amount: '200 gr' },
      { ingredientId: 'salt', name: 'Tuz', amount: '1 osh qoshiq' },
    ],
    instructions: [
      'Go‘shtni sovuq suvga solib, olovga qo‘ying. Qaynab chiqqach ko‘pigini oling.',
      'Mayda to‘g‘ralgan piyoz va bo‘laklangan sabzini solib, 25 daqiqa past olovda qaynatiladi.',
      'To‘g‘ralgan pomidor va yirikroq kartoshkalarni qo‘shing.',
      'Tuz seping va kartoshka yumshaguncha (taxminan 15 daqiqa) miltillatib pishiring.',
      'Kosa yoki chuqur likopchalarga quyib, yangi shivit yoki kashnich bilan tortiq qiling.'
    ]
  },
  {
    id: 'tovuqli-makaron',
    title: 'Tovuqli makaron',
    description: 'Yumshoq tovuq go‘shti va mayin qaymoqli sous bilan uyg‘unlashgan italyancha uslubdagi taom.',
    prepTime: '25 daqiqa',
    prepMinutes: 25,
    difficulty: 'Oson',
    servings: '3 kishilik',
    calories: '510 kkal',
    category: 'Kechki ovqat / Tezkor',
    imageUrl: '/images/tovuqli-makaron.jpg',
    ingredients: [
      { ingredientId: 'chicken', name: 'Tovuq go‘shti', amount: '250 gr' },
      { ingredientId: 'pasta', name: 'Makaron', amount: '300 gr' },
      { ingredientId: 'cream', name: 'Qaymoq', amount: '150 ml' },
      { ingredientId: 'onions', name: 'Piyoz', amount: '1 dona' },
      { ingredientId: 'oil', name: 'O‘simlik yog‘i', amount: '2 osh qoshiq' },
      { ingredientId: 'salt', name: 'Tuz', amount: '1 choy qoshiq' },
    ],
    instructions: [
      'Makaronni sho‘r suvda 8 daqiqa al-dente darajasida qaynatib oling.',
      'Tovada yog‘ni qizdirib, mayda to‘g‘ralgan tovuq go‘shtini oqarguncha qovuring.',
      'Piyozni qo‘shib, yumshaguncha birga qovurishda davom eting.',
      'Qaymoq va tuz soling, olovni pasaytirib 3-4 daqiqa qaymoq quyulguncha miltillating.',
      'Makaronni qaymoqli tovuq ustiga soling, aralashtirib 1 daqiqadan so‘ng olovdan oling.'
    ]
  }
];
