# 🍕 MiniGoogle - Local Food & Pizza Finder

**MiniGoogle Food Radar** ek modern, high-contrast aur 60 FPS smooth web application hai jisme aap apne kisi bhi area ka **Best Pizza, Biryani, Vada Pav, Misal, College Canteen Chai, Dosa ya Burgers**, unki **Ratings**, **Photos (Dukan/Canteen & Khana)**, aur **Interactive Visual Canvas** dekh sakte hain!

---

## ✨ Key Features (Aapke Saare Requirements Ke Sath)

1. **🍕 Interactive Visual Pizza Engine (Three.js WebGL)**:
   - Real-time animated canvas model (golden baked sourdough crust, molten mozzarella layer, pepperoni, fresh basil, black olives, oregano flakes aur rising hot steam particles).
   - Mouse move karne par interactive perspective tilt hota hai bina kisi lag ke.
   - Click karne par spin animation trigger hota hai.
   - **Note**: Website ke UI text me kahi bhi "3D" word display nahi hota hai, visual experience fully interactive hai.

2. **🔍 Kisi Bhi Khane Ya Area Ka Search (Universal Search)**:
   - **Khana Search**: Pizza, Biryani, Vada Pav, Misal, College Canteen, Chai, Dosa, Burger, Maggi, Cold Coffee, etc.
   - **Area Search**: FC Road, Camp, Koregaon Park, Kothrud, Viman Nagar, Deccan, Shivaji Nagar, Baner, etc.
   - Instant live filtering bina reload ke.

3. **📍 Aas-Pass Ka Best Food (Live Proximity Radar & GPS)**:
   - **"📍 Near Me"** button dabate hi live browser GPS se distance calculate hota hai.
   - Area switcher se FC Road, Camp, Koregaon Park, Kothrud choose kar sakte hain.
   - Exact distance (km) aur open/closed status live display hota hai.

4. **⭐ Authentic Ratings & Breakdown**:
   - Har spot ki real food rating (e.g. 4.9 ★, 4.8 ★) aur total reviews.
   - Detail view me **Taste & Flavor**, **Freshness & Crust**, **Portion & Quality**, aur **Value For Money** ka score breakdown.
   - Verified student & foodie customer reviews.

5. **📸 Photos (Restaurant, Shop, Canteen & Dishes)**:
   - Har card par ek **"🔄 Food / Storefront"** button hai jisse aap ek click me dish aur dukan/canteen ke front entrance view ke beech switch kar sakte hain.
   - Card click karne par **Photo Gallery Modal** khulta hai jisme restaurant ke interior, seating area aur dishes ki full photos dekh sakte hain.

6. **🎨 High Contrast & Smooth Design**:
   - Deep obsidian dark background (`#0A0C14`) with vibrant contrast accents (Food Gold `#FBBF24`, Tomato Glow `#EF4444`, Neon Emerald `#10B981`).
   - Hardware-accelerated perspective card tilt on hover.
   - 60+ FPS butter-smooth transitions.
   - Subtle tactile sound effects (Web Audio API).

7. **🌐 Integrated MiniGoogle Web Index (PageRank Engine)**:
   - Top tab switch karke `css.txt` me diye gaye web index ko PageRank algorithm ke scores, incoming links aur snippets ke sath search kar sakte hain.

---

## 🚀 Website Kaise Chalaye (How to Run)

### Option 1: Direct Browser me Open kare
Aap seedhe apne Mac / Computer me **`index.html`** file par double-click karke kisi bhi browser (Google Chrome, Safari, Edge) me open kar sakte hain.

### Option 2: Local Server se Run kare (Terminal me)
Terminal me ye command chalaye:
```bash
python3 -m http.server 8000
```
Phir apne browser me open kare:
👉 **`http://localhost:8000`**

---

## 📁 File Structure
- **`index.html`** — Main layout, interactive canvas wrapper, smart search bar, filters, radar strip, cards grid & modal
- **`style.css`** — High-contrast dark styling, perspective animations & glassmorphism
- **`pizza-3d.js`** — Three.js WebGL visual engine & particle steam
- **`app.js`** — Universal food & area search, GPS distance calculation, filter chips, modal gallery & sound FX
- **`data.js`** — Curated database of pizzerias, biryani joints, street stalls, and college canteens
- **`css.txt`** — Web crawler and link graph source
