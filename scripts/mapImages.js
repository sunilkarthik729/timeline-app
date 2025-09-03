import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

// Pixabay API key
const API_KEY = "52101857-191ae0280c2a09976a815f037";

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const eventsFile = path.join(__dirname, "../public/data/events.json");
const assetsDir = path.join(__dirname, "../public/assets");

// Load events
const events = JSON.parse(fs.readFileSync(eventsFile, "utf-8"));

// Critical curated images map
const curatedImages = {
  // Existing curated
  "Apollo 11 Moon Landing": "./assets/moonland.jpg",
  "Fall of the Berlin Wall": "./assets/berlin.jpg",
  "Christopher Columbus Reaches the Americas": "./assets/history13.jpg",
  "Barack Obama Elected President": "./assets/obama.jpg",
  "COVID-19 Pandemic": "./assets/corona.jpg",
  "First Use of Copper Tools": "./assets/history1.jpg",
  "Construction of the Great Pyramid of Giza": "./assets/history2.jpg",
  "First Olympic Games": "./assets/culture3.jpg",
  "Founding of the Roman Republic": "./assets/history4.jpg",
  "Assassination of Julius Caesar": "./assets/history5.jpg",
  "Fall of the Western Roman Empire": "./assets/history6.jpg",
  "Hijra of Prophet Muhammad": "./assets/history7.jpg",
  "Coronation of Charlemagne": "./assets/history8.jpg",
  "Norman Conquest of England": "./assets/history9.jpg",
  "Signing of the Magna Carta": "./assets/politics10.jpg",
  "Black Death Begins in Europe": "./assets/history11.jpg",
  "Fall of Constantinople": "./assets/history12.jpg",
  "Martin Luther's 95 Theses": "./assets/history14.jpg",
  "Defeat of the Spanish Armada": "./assets/history15.jpg",
  "Founding of Jamestown": "./assets/history16.jpg",
};

// Category images
const categoryImages = {
  history: ["./assets/history111.jpg", "./assets/history222.jpg"],
  science: ["./assets/science111.jpg", "./assets/science222.jpg"],
  politics: ["./assets/politics111.jpg","./assets/politics222.jpg"],
  culture: ["./assets/culture111.jpg","./assets/culture222.jpg"],
  technology: ["./assets/tech111.jpg","./assets/tech222.jpg"],
};

// Counters for cycling category images
const counters = {
  history: 0,
  science: 0,
  politics: 0,
  culture: 0,
  technology: 0,
};

// Placeholder
const placeholder = "./assets/placeholder.jpg";

// Download image helper
async function downloadImage(url, filename) {
  try {
    const res = await axios({ url, responseType: "arraybuffer" });
    fs.writeFileSync(path.join(assetsDir, filename), res.data);
  } catch (err) {
    console.log("Failed to download:", url);
  }
}

// Fetch Pixabay image
async function fetchPixabayImage(title) {
  try {
    const res = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        title
      )}&image_type=photo&per_page=3`
    );
    if (res.data.hits && res.data.hits.length > 0) return res.data.hits[0].largeImageURL;
    return null;
  } catch (err) {
    return null;
  }
}

// Main mapping function
async function mapImages() {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const title = event.title;
    const category = event.category.toLowerCase();

    // 1. Use curated image if exists
    if (curatedImages[title]) {
      event.imageURL = curatedImages[title];
      console.log(`Using curated image for "${title}"`);
      continue;
    }

    // 2. Try Pixabay
    let imageUrl = await fetchPixabayImage(title);
    if (imageUrl) {
      const ext = path.extname(imageUrl).split("?")[0] || ".jpg";
      const filename = `${category}${i + 1}${ext}`;
      await downloadImage(imageUrl, filename);
      event.imageURL = `./assets/${filename}`;
      console.log(`Downloaded Pixabay image for "${title}"`);
      continue;
    }

    // 3. Use category image cycling
    if (categoryImages[category] && categoryImages[category].length > 0) {
      const imgs = categoryImages[category];
      event.imageURL = imgs[counters[category] % imgs.length];
      counters[category]++;
      console.log(`Using category image for "${title}"`);
      continue;
    }

    // 4. Fallback placeholder
    event.imageURL = placeholder;
    console.log(`Using placeholder for "${title}"`);
  }

  // Save updated JSON
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
  console.log("All events mapped with images!");
}

// Run
mapImages();
