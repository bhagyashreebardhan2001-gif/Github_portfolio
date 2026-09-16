/**
 * projectsData.js
 * ------------------------------------------------------------------
 * Single source of truth for every project shown on the 3D globe.
 * Each project supports three optional attachment formats:
 *   - colabLink          : Google Colab notebook URL
 *   - htmlMapEmbed       : URL to an interactive HTML map (iframe-embeddable)
 *   - shapefileDownload  : URL to a .zip (Shapefile) or .geojson download
 *
 * Any of the three may be omitted — the modal only renders buttons
 * for attachments that are actually present (see app.js -> renderModal).
 *
 * Replace the placeholder URLs/coordinates/images with your real
 * project links before deploying.
 * ------------------------------------------------------------------
 */

const projectsData = {

  // ---------------------------------------------------------------
  // SEMESTER 1
  // ---------------------------------------------------------------
  semester1: [
    {
      id: "s1-p1",
      title: "MOD44B Vegetation Cover Classification",
      locationName: "Pan-India, State-wise Analysis",
      lat: 22.9734,
      lng: 78.6569,
      summary: "Classified percent tree-cover and vegetation continuous fields across Indian states using MODIS MOD44B, resolving reduceRegion memory limits with tileScale and bestEffort, and correcting ee.List filter syntax for multi-state batch processing.",
      tools: ["Google Earth Engine", "MODIS", "JavaScript"],
      colabLink: "https://colab.research.google.com/drive/your-notebook-s1p1",
      htmlMapEmbed: "",
      shapefileDownload: "https://github.com/your-repo/mod44b-vegetation/archive/refs/heads/main.zip",
      thumbnail: "https://placehold.co/640x480/e9edd9/2b4d39?text=MOD44B"
    },
    {
      id: "s1-p2",
      title: "Hyderabad LULC Classification",
      locationName: "Hyderabad, Telangana",
      lat: 17.3850,
      lng: 78.4867,
      summary: "Built a five-class land-use/land-cover classifier (waterbody, built-up, vegetation, cropland, barren land) using Sentinel-2 imagery and a smileCart classifier, with area statistics via pixelArea() and grouped reducers, deployed to a companion statistics dashboard.",
      tools: ["Sentinel-2", "smileCart", "GEE Apps"],
      colabLink: "",
      htmlMapEmbed: "https://your-username.github.io/hyderabad-lulc/",
      shapefileDownload: "https://github.com/your-repo/hyderabad-lulc/archive/refs/heads/main.zip",
      thumbnail: "https://placehold.co/640x480/e9edd9/2b4d39?text=Hyderabad+LULC"
    }
  ],

  // ---------------------------------------------------------------
  // SEMESTER 2
  // ---------------------------------------------------------------
  semester2: [
    {
      id: "s2-p1",
      title: "Magarpatta Vegetation Monitoring App",
      locationName: "Magarpatta, Pune",
      lat: 18.5150,
      lng: 73.9280,
      summary: "Published a GEE vegetation monitoring web app for the Magarpatta township using a fused Sentinel-2, Landsat 9, and MODIS time series, with a self-contained GitHub Pages companion site embedding the live EE app.",
      tools: ["GEE App", "Sentinel-2", "Landsat 9", "MODIS"],
      colabLink: "",
      htmlMapEmbed: "https://your-username.github.io/magarpatta-vegetation/",
      shapefileDownload: "",
      thumbnail: "https://placehold.co/640x480/e9edd9/2b4d39?text=Magarpatta"
    },
    {
      id: "s2-p2",
      title: "NDVI Drought Monitoring, 2015\u20132025",
      locationName: "Pune AOI, Maharashtra",
      lat: 18.5204,
      lng: 73.8567,
      summary: "Built a decade-long Landsat-based NDVI drought monitoring pipeline for a defined Pune area of interest, combining multi-sensor fusion, cloud/QA masking, and spatial statistics into an interactive UI dashboard within GEE.",
      tools: ["Landsat", "NDVI", "Spatial Statistics"],
      colabLink: "https://colab.research.google.com/drive/your-notebook-s2p2",
      htmlMapEmbed: "",
      shapefileDownload: "https://github.com/your-repo/pune-ndvi-drought/archive/refs/heads/main.zip",
      thumbnail: "https://placehold.co/640x480/e9edd9/2b4d39?text=NDVI+Drought"
    }
  ],

  // ---------------------------------------------------------------
  // SEMESTER 3
  // ---------------------------------------------------------------
  semester3: [
    {
      id: "s3-p1",
      title: "Canopy Height Estimation from GEDI RH98",
      locationName: "Western Ghats, Maharashtra",
      lat: 17.9307,
      lng: 73.5305,
      summary: "Trained a Random Forest regression model on GEDI RH98 relative-height metrics fused with optical predictors to estimate canopy height, including QA masking, spatial statistics, and CSV export for validation.",
      tools: ["GEDI", "Random Forest", "Python"],
      colabLink: "https://colab.research.google.com/drive/your-notebook-s3p1",
      htmlMapEmbed: "",
      shapefileDownload: "https://github.com/your-repo/canopy-height-gedi/archive/refs/heads/main.zip",
      thumbnail: "https://placehold.co/640x480/e9edd9/2b4d39?text=Canopy+Height"
    },
    {
      id: "s3-p2",
      title: "Explore Pune \u2014 Seasonal Travel Guide",
      locationName: "Pune, Maharashtra",
      lat: 18.5236,
      lng: 73.8478,
      summary: "Designed a self-contained interactive seasonal travel guide for Pune as a single HTML file, featuring a Canvas-based map and base64-encoded SVG illustrations, with no external asset dependencies.",
      tools: ["Canvas API", "SVG", "Single-file HTML"],
      colabLink: "",
      htmlMapEmbed: "https://your-username.github.io/explore-pune/",
      shapefileDownload: "",
      thumbnail: "https://placehold.co/640x480/e9edd9/2b4d39?text=Explore+Pune"
    },
    {
      id: "s3-p3",
      title: "Earthquake Event Mapping",
      locationName: "Global Seismic Dataset",
      lat: 35.6762,
      lng: 139.6503,
      summary: "Deployed an earthquake event visualization to GitHub Pages, troubleshooting deployment configuration and file naming to serve a clean interactive map of recent seismic activity.",
      tools: ["GitHub Pages", "GeoJSON", "Leaflet"],
      colabLink: "",
      htmlMapEmbed: "https://your-username.github.io/earthquake/",
      shapefileDownload: "https://github.com/your-repo/earthquake/archive/refs/heads/main.zip",
      thumbnail: "https://placehold.co/640x480/e9edd9/2b4d39?text=Earthquakes"
    }
  ]
};
