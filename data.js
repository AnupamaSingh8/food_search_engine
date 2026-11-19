// MiniGoogle Local Food Database - Curated Pizzerias, Restaurants, Street Stalls & College Canteens
const FOOD_PLACES = [
  // 1. PIZZA SPOTS
  {
    id: "place-1",
    name: "La Gusto Wood Fired Pizzeria",
    category: "pizza",
    categoryLabel: "Authentic Wood-Fired Pizza",
    rating: 4.9,
    reviewsCount: 1420,
    priceRange: "₹₹₹",
    avgCostForTwo: "₹850 for two",
    distanceKm: 0.8,
    area: "Koregaon Park / North Main Rd",
    city: "Pune",
    lat: 18.5362,
    lng: 73.8940,
    type: "Fine Dine & Italian Kitchen",
    tags: ["Pizza", "Wood Fired", "Hand Tossed", "Imported Mozzarella", "Romantic Ambience", "Koregaon Park"],
    isOpen: true,
    timing: "11:30 AM - 11:30 PM",
    phone: "+91 98230 45678",
    description: "Famous for genuine oak-wood fired oven pizzas with 48-hour fermented sourdough crust and San Marzano tomato sauce.",
    featuredDish: "Truffle Burrata Margherita Pizza",
    price: "₹490",
    images: {
      cover: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Napoli Margherita D.O.P", price: "₹420", desc: "Fresh basil, buffalo mozzarella, extra virgin olive oil" },
      { name: "Quattro Formaggi (4 Cheese)", price: "₹520", desc: "Gorgonzola, fontina, mozzarella, parmesan drizzle" },
      { name: "Smoked Pepperoni Feast", price: "₹560", desc: "Artisanal pepperoni, chili hot honey, roasted garlic" }
    ],
    reviews: [
      { user: "Rohan Deshmukh", rating: 5, time: "2 days ago", comment: "The crust is pure magic! Crispy exterior with airy, soft interior. Best wood-fired pizza in Pune!" },
      { user: "Pooja Sharma", rating: 5, time: "1 week ago", comment: "Beautiful rustic ambiance and the cheese pull is insane. Must try their Burrata Margherita." }
    ]
  },
  {
    id: "place-2",
    name: "Campus Canteen Pizza Hub (COEP & FC Corner)",
    category: "canteen",
    categoryLabel: "College Canteen & Pocket Friendly",
    rating: 4.8,
    reviewsCount: 3890,
    priceRange: "₹",
    avgCostForTwo: "₹250 for two",
    distanceKm: 0.4,
    area: "FC Road, Deccan Gymkhana",
    city: "Pune",
    lat: 18.5204,
    lng: 73.8402,
    type: "Student Canteen & Quick Bite",
    tags: ["Pizza", "Student Canteen", "Pocket Pinch < ₹150", "Extra Cheese", "Late Night", "FC Road", "Deccan"],
    isOpen: true,
    timing: "9:00 AM - 1:00 AM",
    phone: "+91 97654 32109",
    description: "The holy grail for college students! Overloaded cheese pan pizzas, desi spice mix, and killer garlic bread at student-friendly prices.",
    featuredDish: "Maha Cheese Burst Double Decker Pizza",
    price: "₹149",
    images: {
      cover: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "FC Road Volcano Cheese Pan", price: "₹120", desc: "Overflowing liquid cheese with sweet corn and capsicum" },
      { name: "Desi Paneer Makhani Blast", price: "₹149", desc: "Tandoori paneer cubes with buttery makhani sauce base" },
      { name: "Crazy Garlic Stuffed Ring", price: "₹89", desc: "Garlic butter infused crust stuffed with mozzarella" }
    ],
    reviews: [
      { user: "Aditya Verma (Student)", rating: 5, time: "Yesterday", comment: "Under ₹150 and taste beats major brands easily! Huge portions, unlimited oregano, fast service." },
      { user: "Sneha Kulkarni", rating: 4.8, time: "3 days ago", comment: "Our go-to canteen spot after lectures. The cheese burst melts right into your mouth." }
    ]
  },
  {
    id: "place-3",
    name: "The Crust Cartel - NY Style Giant Slices",
    category: "pizza",
    categoryLabel: "NY Style Pizza & Street Cafe",
    rating: 4.7,
    reviewsCount: 960,
    priceRange: "₹₹",
    avgCostForTwo: "₹450 for two",
    distanceKm: 1.2,
    area: "Viman Nagar, Dutta Mandir Chowk",
    city: "Pune",
    lat: 18.5679,
    lng: 73.9143,
    type: "Street Cafe & Takeaway Bar",
    tags: ["Pizza", "Giant 18-inch Slices", "NY Fold", "Crispy Bottom", "Outdoor Seating", "Viman Nagar"],
    isOpen: true,
    timing: "12:00 PM - 2:00 AM",
    phone: "+91 88882 11990",
    description: "Serving authentic giant 18-inch New York style pizza by the slice. Crispy bottom, perfect flop, and foldable slices you can eat on the go.",
    featuredDish: "NY Classic Giant Pepperoni Slice",
    price: "₹180 / slice",
    images: {
      cover: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Original Brooklyn Cheese Slice", price: "₹140", desc: "Classic tomato herb sauce, whole milk low moisture mozzarella" },
      { name: "Hot Honey & Spicy Salami Slice", price: "₹210", desc: "Spiced pepperoni finished with house-infused hot habanero honey" },
      { name: "White Truffle Garlic Slice", price: "₹190", desc: "Ricotta cream base, roasted wild mushrooms, thyme" }
    ],
    reviews: [
      { user: "Sameer Joshi", rating: 5, time: "4 days ago", comment: "The only spot in town that understands real New York foldable pizza slices. 10/10 crunch!" },
      { user: "Tanya Sen", rating: 4.5, time: "Last week", comment: "Open till 2 AM! Perfect late night craving rescue in Viman Nagar." }
    ]
  },

  // 2. BIRYANI SPOTS
  {
    id: "place-4",
    name: "Blue Nile Heritage Restaurant & Biryani",
    category: "biryani",
    categoryLabel: "Legendary Biryani & Mughlai",
    rating: 4.9,
    reviewsCount: 5410,
    priceRange: "₹₹₹",
    avgCostForTwo: "₹800 for two",
    distanceKm: 2.2,
    area: "Camp / MG Road / Bund Garden",
    city: "Pune",
    lat: 18.5147,
    lng: 73.8785,
    type: "Heritage Dining & Irani Kitchen",
    tags: ["Biryani", "Mutton Dum Biryani", "Camp", "Mughlai", "Irani Chai", "Heritage Brand"],
    isOpen: true,
    timing: "11:30 AM - 11:30 PM",
    phone: "+91 98220 88771",
    description: "Legendary Pune landmark established in 1965, world-famous for its fragrant slow-cooked Dum Biryani, Chelo Kebabs, and tender meat.",
    featuredDish: "Royal Special Mutton Dum Biryani",
    price: "₹380",
    images: {
      cover: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Special Chicken Dum Biryani", price: "₹340", desc: "Long grain aromatic basmati, slow cooked saffron broth, tender spiced chicken" },
      { name: "Irani Mutton Chelo Kebab with Butter Rice", price: "₹420", desc: "Charcoal grilled juicy skewers with aromatic butter steamed rice" },
      { name: "Caramel Custard", price: "₹110", desc: "Iconic wobbly silk smooth dessert" }
    ],
    reviews: [
      { user: "Farhan Merchant", rating: 5, time: "Yesterday", comment: "The aroma of Blue Nile biryani hits you before you even enter. The best biryani in Maharashtra!" },
      { user: "Aakash Mehta", rating: 5, time: "3 days ago", comment: "Generous meat pieces, not overly oily, perfection." }
    ]
  },
  {
    id: "place-5",
    name: "George Restaurant & Biryani Corner",
    category: "biryani",
    categoryLabel: "Iconic Camp Biryani",
    rating: 4.8,
    reviewsCount: 4230,
    priceRange: "₹₹",
    avgCostForTwo: "₹650 for two",
    distanceKm: 2.0,
    area: "Camp / East Street",
    city: "Pune",
    lat: 18.5160,
    lng: 73.8790,
    type: "Restaurant & Takeaway",
    tags: ["Biryani", "Chicken Biryani", "Camp", "East Street", "Butter Chicken", "Mughlai"],
    isOpen: true,
    timing: "11:00 AM - 11:30 PM",
    phone: "+91 98225 33441",
    description: "Famous heritage eatery on East Street known for its flavorful Dum Biryani, Butter Chicken, and soft hot garlic butter naans.",
    featuredDish: "Authentic Hyderabadi Chicken Biryani",
    price: "₹310",
    images: {
      cover: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "George Special Mutton Biryani", price: "₹370", desc: "Slow braised mutton pieces layered in golden basmati rice" },
      { name: "Butter Chicken Boneless", price: "₹320", desc: "Velvety rich tomato butter gravy with tandoori tikka" }
    ],
    reviews: [
      { user: "Zahir Khan", rating: 5, time: "5 days ago", comment: "East Street staple! Whenever I visit Camp, George's Biryani is non-negotiable." }
    ]
  },

  // 3. VADA PAV & MISAL PAV SPOTS
  {
    id: "place-6",
    name: "Katakirr Spicy Misal & Katte Ki Chai",
    category: "misal-vadapav",
    categoryLabel: "Legendary Kolhapuri Misal",
    rating: 4.9,
    reviewsCount: 6800,
    priceRange: "₹",
    avgCostForTwo: "₹180 for two",
    distanceKm: 1.6,
    area: "Karve Road / Kothrud & Deccan",
    city: "Pune",
    lat: 18.5074,
    lng: 73.8077,
    type: "Traditional Breakfast & Snack Hub",
    tags: ["Misal", "Misal Pav", "Kothrud", "Karve Road", "Vada Pav", "Spicy Tarri", "Taak", "Under ₹100"],
    isOpen: true,
    timing: "8:00 AM - 9:30 PM",
    phone: "+91 98224 11223",
    description: "The crown jewel of Puneri Misal! Choice of Teekha (Fiery), Medium, and Light rassa served with crunchy farsan, fresh pav, and chilled buttermilk.",
    featuredDish: "Kolhapuri Special Tarri Misal Pav",
    price: "₹95",
    images: {
      cover: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Special Puneri Misal", price: "₹95", desc: "Sprouted moth beans, crisp spicy farsan, lemon, chopped onions" },
      { name: "Fresh Masala Taak (Buttermilk)", price: "₹30", desc: "Chilled cumin coriander spiced digestive buttermilk" },
      { name: "Solkadhi", price: "₹45", desc: "Kokum coconut milk refreshing digestive drink" }
    ],
    reviews: [
      { user: "Omkar Patil", rating: 5, time: "Yesterday", comment: "The fiery rassa combined with chilled taak is an unbeatable Sunday breakfast tradition!" },
      { user: "Gauri Joshi", rating: 5, time: "3 days ago", comment: "Best misal pav in Kothrud, quick service and consistent taste." }
    ]
  },
  {
    id: "place-7",
    name: "Rohit & Garden Jumbo Vada Pav Centre",
    category: "misal-vadapav",
    categoryLabel: "Famous Street Vada Pav Stall",
    rating: 4.8,
    reviewsCount: 7120,
    priceRange: "₹",
    avgCostForTwo: "₹100 for two",
    distanceKm: 0.5,
    area: "FC Road & Camp Branch",
    city: "Pune",
    lat: 18.5215,
    lng: 73.8415,
    type: "Street Stall & Fast Food",
    tags: ["Vada Pav", "Street Food", "FC Road", "Camp", "Chutney", "Under ₹50", "Budget Bite"],
    isOpen: true,
    timing: "9:00 AM - 10:00 PM",
    phone: "+91 98901 22334",
    description: "Famous for piping hot oversized golden batata vadas fried in fresh oil, loaded with spicy green coriander thecha and garlic red powder chutney.",
    featuredDish: "Garden Crispy Butter Jumbo Vada Pav",
    price: "₹30",
    images: {
      cover: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Jumbo Cheese Vada Pav", price: "₹45", desc: "Melted Amul cheese slice inside hot buttery pav" },
      { name: "Ulta Vada Pav", price: "₹35", desc: "Inside out batter fried stuffed pav" },
      { name: "Special Cutting Chai", price: "₹15", desc: "Ginger cardamom hot brew" }
    ],
    reviews: [
      { user: "Sumit Kale", rating: 5, time: "2 days ago", comment: "Best vada pav on FC road! Crunchy outside, steaming soft potato mash inside." }
    ]
  },

  // 4. COLLEGE CANTEEN & CHAI SPOTS
  {
    id: "place-8",
    name: "Fergusson College (FC) Student Canteen & Adda",
    category: "canteen",
    categoryLabel: "College Canteen & Campus Adda",
    rating: 4.8,
    reviewsCount: 4670,
    priceRange: "₹",
    avgCostForTwo: "₹150 for two",
    distanceKm: 0.3,
    area: "FC Road, Ferguson Campus",
    city: "Pune",
    lat: 18.5230,
    lng: 73.8390,
    type: "Campus Canteen",
    tags: ["College Canteen", "Chai", "FC Road", "Sandwich", "Maggi", "Student Budget", "Pocket Friendly"],
    isOpen: true,
    timing: "7:30 AM - 8:30 PM",
    phone: "+91 98231 99001",
    description: "The heart of student life in Pune! Hot masala chai, grilled cheese chilly toast, butter bun maska, and steaming Maggi under the campus banyan tree.",
    featuredDish: "Grilled Cheese Chilly Toast & Cutting Chai",
    price: "₹65",
    images: {
      cover: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "FC Double Cheese Sandwich", price: "₹70", desc: "Crisp grilled sandwich stuffed with capsicum, onion, Amul cheese" },
      { name: "Bun Maska with Jam", price: "₹35", desc: "Warm bakery bun layered with fresh yellow butter" },
      { name: "Special Adrak Chai", price: "₹15", desc: "Fresh ginger brewed kadak tea" }
    ],
    reviews: [
      { user: "Tanvi Saxena (FC Alum)", rating: 5, time: "4 days ago", comment: "The memories attached to this canteen! Affordable, tasty, and the vibe is unbeatable." }
    ]
  },
  {
    id: "place-9",
    name: "COEP Boat Club Canteen & Food Plaza",
    category: "canteen",
    categoryLabel: "College Canteen on Riverbank",
    rating: 4.7,
    reviewsCount: 3100,
    priceRange: "₹",
    avgCostForTwo: "₹160 for two",
    distanceKm: 1.4,
    area: "Shivaji Nagar / COEP Ground",
    city: "Pune",
    lat: 18.5300,
    lng: 73.8560,
    type: "Campus Canteen & Cafe",
    tags: ["College Canteen", "Chai", "Shivaji Nagar", "Cold Coffee", "Egg Bhurji", "Under ₹100"],
    isOpen: true,
    timing: "8:00 AM - 9:00 PM",
    phone: "+91 98229 00112",
    description: "Iconic riverside college canteen known for thick cold coffee, spicy egg bhurji pav, hot poha, and student-favorite cheese paneer rolls.",
    featuredDish: "COEP Thick Cold Coffee with Ice Cream",
    price: "₹50",
    images: {
      cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Spicy Egg Bhurji with 2 Pav", price: "₹60", desc: "Fresh eggs scrambled with onion, green chilies, coriander" },
      { name: "Cheese Butter Maggi", price: "₹50", desc: "Two minute Maggi made with vegetables and melted cheese" }
    ],
    reviews: [
      { user: "Prathamesh K.", rating: 4.8, time: "1 week ago", comment: "Cold coffee by the riverside! Best canteen experience in town." }
    ]
  },

  // 5. SOUTH INDIAN & DOSA
  {
    id: "place-10",
    name: "Vaishali Iconic Restaurant & Cafe",
    category: "dosa-south",
    categoryLabel: "Iconic South Indian & Cafe",
    rating: 4.9,
    reviewsCount: 9800,
    priceRange: "₹₹",
    avgCostForTwo: "₹400 for two",
    distanceKm: 0.3,
    area: "FC Road, Deccan",
    city: "Pune",
    lat: 18.5204,
    lng: 73.8402,
    type: "Heritage Cafe & South Indian",
    tags: ["Dosa", "South Indian", "FC Road", "Filter Coffee", "Sev Puri", "Heritage Cafe"],
    isOpen: true,
    timing: "7:00 AM - 11:00 PM",
    phone: "+91 98220 11999",
    description: "The most iconic gathering place on FC Road since 1971. Renowned for its crispy Mysore Masala Dosa, Filter Coffee, and garden courtyard.",
    featuredDish: "Special Mysore Cheese Masala Dosa",
    price: "₹160",
    images: {
      cover: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Onion Uttapam with White Butter", price: "₹140", desc: "Soft thick savory pancake with coconut chutney and hot sambar" },
      { name: "Sev Potato Dahi Puri (SPDP)", price: "₹110", desc: "Famous Pune street snack with sweet yogurt and chutneys" },
      { name: "South Indian Filter Coffee", price: "₹50", desc: "Frothy aromatic brass tumbler coffee" }
    ],
    reviews: [
      { user: "Ananya Iyer", rating: 5, time: "3 days ago", comment: "A pilgrimage spot for every foodie in Pune. Filter coffee and Mysore Dosa are unmatched!" }
    ]
  },

  // 6. BURGERS & STREET FAST FOOD
  {
    id: "place-11",
    name: "Camp Burger (Original Burger Corner)",
    category: "burger",
    categoryLabel: "Legendary Giant Burgers",
    rating: 4.8,
    reviewsCount: 6200,
    priceRange: "₹",
    avgCostForTwo: "₹250 for two",
    distanceKm: 2.1,
    area: "Camp / East Street",
    city: "Pune",
    lat: 18.5150,
    lng: 73.8795,
    type: "Fast Food Joint",
    tags: ["Burger", "Camp", "East Street", "Fries", "Giant Burger", "Budget Fast Food"],
    isOpen: true,
    timing: "11:30 AM - 10:30 PM",
    phone: "+91 98900 88221",
    description: "Famous for colossal oversized meaty burgers loaded with homemade coleslaw, special sauce, and toasted sesame buns.",
    featuredDish: "Giant Special King Chicken Burger",
    price: "₹130",
    images: {
      cover: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Jumbo Veg Cheese Burger", price: "₹100", desc: "Double patty, crispy onion rings, creamy coleslaw" },
      { name: "Peri Peri French Fries", price: "₹80", desc: "Golden crinkle cut fries dusted in spicy peri-peri" }
    ],
    reviews: [
      { user: "Nitin B.", rating: 5, time: "Yesterday", comment: "One burger is enough to skip two meals! Unreal value for money and legendary flavor." }
    ]
  },
  {
    id: "place-12",
    name: "Sai Baba Street Pizza & Cheese Grill",
    category: "pizza",
    categoryLabel: "Desi Street Food & Cheese Grill",
    rating: 4.6,
    reviewsCount: 1820,
    priceRange: "₹",
    avgCostForTwo: "₹180 for two",
    distanceKm: 0.6,
    area: "JM Road, Opposite Sambhaji Park",
    city: "Pune",
    lat: 18.5246,
    lng: 73.8478,
    type: "Street Stall & Fast Food",
    tags: ["Pizza", "Street Food", "JM Road", "Amul Cheese", "Under ₹100", "Quick Service"],
    isOpen: true,
    timing: "4:00 PM - 11:30 PM",
    phone: "+91 99221 44556",
    description: "Legendary JM Road street food stall famous for its thick toasted crust, generous Amul butter coating, and mountain of shredded cheese.",
    featuredDish: "Overloaded Amul Cheese Special Pizza",
    price: "₹99",
    images: {
      cover: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80",
      storefront: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
      ]
    },
    menuHighlights: [
      { name: "Super Veggie Delight", price: "₹89", desc: "Capsicum, onion, tomato, sweet corn, secret masala blend" },
      { name: "Paneer Tikka Street Special", price: "₹110", desc: "Spicy marinated paneer with chopped coriander & green chili" }
    ],
    reviews: [
      { user: "Nikhil Shinde", rating: 5, time: "5 days ago", comment: "Old school Pune street pizza! That Amul cheese aroma draws you from 100 meters away." }
    ]
  }
];

// Indexed Web Pages from MiniGoogle Crawler (css.txt with PageRank calculations)
const INDEXED_WEB_PAGES = [
  {
    id: 2,
    url: "https://best-pizza-pune.com",
    title: "Best Pizza Pune - Fresh Wood-Fired Pizza Made Daily",
    snippet: "Fresh wood-fired pizza made daily - try our cheese pizza with authentic Italian mozzarella and organic basil.",
    pageRank: 0.3928,
    rankBadge: "Rank #1 (Highest Authority)",
    linksTo: [1, 3],
    incomingLinks: [1, 3, 4, 5],
    tags: ["Wood-fired", "Fresh Pizza", "Cheese Pizza"]
  },
  {
    id: 1,
    url: "https://pune-food-guide.com",
    title: "Pune Food Guide - Where to Eat in Pune",
    snippet: "Where to eat in Pune - vada pav and biryani and pizza. Complete local culinary map and reviews.",
    pageRank: 0.2133,
    rankBadge: "Rank #2",
    linksTo: [2],
    incomingLinks: [2, 6],
    tags: ["Food Guide", "Pune Eats", "Biryani & Pizza", "Vada Pav"]
  },
  {
    id: 3,
    url: "https://college-canteen-blog.com",
    title: "College Canteen Blog - Student Reviews & Budget Pizza",
    snippet: "Student reviews of canteen food and chai and Friday pizza. Honest reviews by campus foodies across Pune.",
    pageRank: 0.1920,
    rankBadge: "Rank #3",
    linksTo: [2, 4],
    incomingLinks: [2],
    tags: ["College Canteen", "Budget Eats", "Friday Pizza", "Chai"]
  },
  {
    id: 4,
    url: "https://pizza-recipes-home.com",
    title: "Pizza Recipes at Home - Homemade Dough & Marinara Sauce",
    snippet: "Make pizza at home - pizza dough and pizza sauce recipes with simple stovetop and oven instructions.",
    pageRank: 0.1066,
    rankBadge: "Rank #4",
    linksTo: [2, 5],
    incomingLinks: [3],
    tags: ["DIY Pizza", "Pizza Dough", "Recipes"]
  },
  {
    id: 5,
    url: "https://cheap-eats-pune.com",
    title: "Cheap Eats Pune - Best Food Under 100 Rupees",
    snippet: "Good food under 100 rupees - misal and dosa and pizza slices for students and budget travelers.",
    pageRank: 0.0703,
    rankBadge: "Rank #5",
    linksTo: [2],
    incomingLinks: [4],
    tags: ["Cheap Eats", "Under ₹100", "Pizza Slices", "Misal", "Dosa"]
  },
  {
    id: 6,
    url: "https://pizza-pizza-pizza.com",
    title: "Pizza Pizza Pizza - The Ultimate Pizza Portal",
    snippet: "pizza pizza pizza pizza pizza pizza pizza pizza pizza pizza.",
    pageRank: 0.0250,
    rankBadge: "Rank #6",
    linksTo: [1],
    incomingLinks: [],
    tags: ["Pizza Keyword", "Aggregator"]
  }
];

// Area suggestions for quick switcher
const POPULAR_AREAS = [
  { name: "Nearby (GPS Live)", lat: null, lng: null },
  { name: "FC Road / Deccan", lat: 18.5204, lng: 73.8402 },
  { name: "Camp / East Street", lat: 18.5147, lng: 73.8785 },
  { name: "Koregaon Park", lat: 18.5362, lng: 73.8940 },
  { name: "Kothrud / Karve Road", lat: 18.5074, lng: 73.8077 },
  { name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
  { name: "Shivaji Nagar / JM Road", lat: 18.5246, lng: 73.8478 },
  { name: "Baner / Balewadi", lat: 18.5714, lng: 73.7699 }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FOOD_PLACES, INDEXED_WEB_PAGES, POPULAR_AREAS };
}
