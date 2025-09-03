import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Your Pixabay API key
const API_KEY = "52101857-191ae0280c2a09976a815f037";

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load your events JSON using fs
const eventsFile = path.join(__dirname, "../public/data/events.json");
const events = JSON.parse(fs.readFileSync(eventsFile, "utf-8"));

// Folder to save images
const assetsDir = path.join(__dirname, "../public/assets");
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

// Path to placeholder image
const placeholder = "./assets/placeholder.jpg";

// Function to download image
async function downloadImage(url, filename) {
  const response = await axios({ url, responseType: "arraybuffer" });
  fs.writeFileSync(path.join(assetsDir, filename), response.data);
}

// Main function to fetch images
async function fetchImages() {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const query = encodeURIComponent(event.title);
    let filename = "";

    try {
      const res = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=3`
      );

      if (res.data.hits && res.data.hits.length > 0) {
        const imageUrl = res.data.hits[0].largeImageURL;
        const ext = path.extname(imageUrl).split("?")[0] || ".jpg";
        filename = `${event.category.toLowerCase()}${i + 1}${ext}`;
        await downloadImage(imageUrl, filename);
        console.log(`Downloaded: ${filename}`);
      } else {
        // Use placeholder
        filename = `placeholder${i + 1}.jpg`;
        fs.copyFileSync(path.join(assetsDir, "placeholder.jpg"), path.join(assetsDir, filename));
        console.log(`No image found for "${event.title}", using placeholder.`);
      }
    } catch (err) {
      // On error, use placeholder
      filename = `placeholder${i + 1}.jpg`;
      fs.copyFileSync(path.join(assetsDir, "placeholder.jpg"), path.join(assetsDir, filename));
      console.log(`Error fetching image for "${event.title}", using placeholder.`, err.message);
    }

    // Update imageURL in JSON
    event.imageURL = `./assets/${filename}`;
  }

  // Save updated JSON
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
  console.log("All images processed and JSON updated!");
}

// Run the script
fetchImages();
