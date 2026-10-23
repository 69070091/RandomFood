// เพิ่มหรือแก้ไขเมนูได้ที่ Array นี้
const foods = [
  {
    name: "ข้าวผัด",
    description: "ข้าวผัดหอมกระทะ เสิร์ฟพร้อมไข่ดาวและผักสด",
    price: 55,
    image: "images/friedrice.png"
  },
  {
    name: "ผัดไทย",
    description: "เส้นจันท์เหนียวนุ่ม ผัดซอสมะขามรสกลมกล่อม",
    price: 60,
    image: "images/padthai.png"
  },
  {
    name: "ข้าวกะเพรา",
    description: "กะเพราร้อน ๆ กลิ่นใบกะเพราชัดเจน พร้อมไข่ดาว",
    price: 60,
    image: "images/krapao.png"
  },
  {
    name: "ส้มตำ",
    description: "มะละกอกรอบ ตำสดใหม่ รสเปรี้ยวหวานเผ็ดพอดี",
    price: 50,
    image: "images/somtam.png"
  },
  {
    name: "ก๋วยเตี๋ยว",
    description: "เส้นนุ่มในน้ำซุปร้อนหอม เสิร์ฟพร้อมเครื่องแน่นชาม",
    price: 55,
    image: "images/noodle.png"
  }
];

const image = document.querySelector("#food-image");
const fallback = document.querySelector("#image-fallback");
const name = document.querySelector("#food-name");
const description = document.querySelector("#food-description");
const price = document.querySelector("#food-price");
const button = document.querySelector("#random-button");
const card = document.querySelector(".food-card");
let currentIndex = 0;
let imageRequestId = 0;

function showImageFallback() {
  image.removeAttribute("src");
  image.hidden = true;
  fallback.hidden = false;
}

function displayFood(index, animate = false) {
  const food = foods[index];
  if (animate) {
    card.classList.remove("is-changing");
    void card.offsetWidth; // เริ่ม transition ใหม่ทุกครั้งที่กด
    card.classList.add("is-changing");
  }

  image.alt = `รูป${food.name}`;
  name.textContent = food.name;
  description.textContent = food.description;
  price.textContent = food.price;

  // URL จะอ้างอิงจากหน้า index.html (document.baseURI) ไม่ใช่ตำแหน่ง script.js
  const imageUrl = new URL(food.image, document.baseURI).href;
  const requestId = ++imageRequestId;
  const loader = new Image();

  loader.addEventListener("load", () => {
    // ป้องกัน event ของรูปเดิมมาทับเมนูที่สุ่มล่าสุด
    if (requestId !== imageRequestId) return;
    image.src = imageUrl;
    image.hidden = false;
    fallback.hidden = true;
  }, { once: true });

  loader.addEventListener("error", () => {
    if (requestId === imageRequestId) showImageFallback();
  }, { once: true });

  loader.src = imageUrl;
}

button.addEventListener("click", () => {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * foods.length);
  } while (foods.length > 1 && nextIndex === currentIndex);
  currentIndex = nextIndex;
  displayFood(currentIndex, true);
});

// แสดงเมนูเริ่มต้นทันทีเมื่อเปิดหน้าเว็บ
displayFood(currentIndex);
