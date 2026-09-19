import type { StateCode } from "@/data/states";

export type NationalParkLocation = {
  id: string;
  name: string;
  parkCode: string;
  states: readonly StateCode[];
  latitude: number;
  longitude: number;
};

export const NATIONAL_PARK_LOCATION_SOURCE = {
  designationSnapshot: "us-states-2026-09-05-v1",
  designationUrl: "https://www.nps.gov/aboutus/national-park-system.htm",
  locationUrl: "https://developer.nps.gov/api/v1/parks",
  retrievedAt: "2026-09-18",
} as const;

// Formal-designation membership comes from the immutable NPS snapshot above.
// Coordinates are the corresponding official NPS Data API park location fields.
export const NATIONAL_PARK_LOCATIONS: readonly NationalParkLocation[] = [
  { id: "acadia-national-park", name: "Acadia National Park", parkCode: "acad", states: ["ME"], latitude: 44.409286, longitude: -68.247501 },
  { id: "arches-national-park", name: "Arches National Park", parkCode: "arch", states: ["UT"], latitude: 38.72261844, longitude: -109.5863666 },
  { id: "badlands-national-park", name: "Badlands National Park", parkCode: "badl", states: ["SD"], latitude: 43.68584846, longitude: -102.482942 },
  { id: "big-bend-national-park", name: "Big Bend National Park", parkCode: "bibe", states: ["TX"], latitude: 29.29817767, longitude: -103.2297897 },
  { id: "biscayne-national-park", name: "Biscayne National Park", parkCode: "bisc", states: ["FL"], latitude: 25.490587, longitude: -80.21023851 },
  { id: "black-canyon-of-the-gunnison-national-park", name: "Black Canyon of the Gunnison National Park", parkCode: "blca", states: ["CO"], latitude: 38.57779869, longitude: -107.7242756 },
  { id: "bryce-canyon-national-park", name: "Bryce Canyon National Park", parkCode: "brca", states: ["UT"], latitude: 37.58399144, longitude: -112.1826689 },
  { id: "canyonlands-national-park", name: "Canyonlands National Park", parkCode: "cany", states: ["UT"], latitude: 38.24555783, longitude: -109.8801624 },
  { id: "capitol-reef-national-park", name: "Capitol Reef National Park", parkCode: "care", states: ["UT"], latitude: 38.2821653131, longitude: -111.247048378 },
  { id: "carlsbad-caverns-national-park", name: "Carlsbad Caverns National Park", parkCode: "cave", states: ["NM"], latitude: 32.14089463, longitude: -104.5529688 },
  { id: "channel-islands-national-park", name: "Channel Islands National Park", parkCode: "chis", states: ["CA"], latitude: 33.98680093, longitude: -119.9112735 },
  { id: "congaree-national-park", name: "Congaree National Park", parkCode: "cong", states: ["SC"], latitude: 33.79187523, longitude: -80.74867805 },
  { id: "crater-lake-national-park", name: "Crater Lake National Park", parkCode: "crla", states: ["OR"], latitude: 42.94065854, longitude: -122.1338414 },
  { id: "cuyahoga-valley-national-park", name: "Cuyahoga Valley National Park", parkCode: "cuva", states: ["OH"], latitude: 41.26093905, longitude: -81.57116722 },
  { id: "death-valley-national-park", name: "Death Valley National Park", parkCode: "deva", states: ["CA", "NV"], latitude: 36.48753731, longitude: -117.134395 },
  { id: "denali-national-park", name: "Denali National Park", parkCode: "dena", states: ["AK"], latitude: 63.29777484, longitude: -151.0526568 },
  { id: "dry-tortugas-national-park", name: "Dry Tortugas National Park", parkCode: "drto", states: ["FL"], latitude: 24.628741, longitude: -82.87319 },
  { id: "everglades-national-park", name: "Everglades National Park", parkCode: "ever", states: ["FL"], latitude: 25.37294225, longitude: -80.88200301 },
  { id: "gates-of-the-arctic-national-park", name: "Gates of the Arctic National Park", parkCode: "gaar", states: ["AK"], latitude: 67.75961636, longitude: -153.2917758 },
  { id: "gateway-arch-national-park", name: "Gateway Arch National Park", parkCode: "jeff", states: ["MO", "IL"], latitude: 38.6258069, longitude: -90.1892508 },
  { id: "glacier-bay-national-park", name: "Glacier Bay National Park", parkCode: "glba", states: ["AK"], latitude: 58.80086718, longitude: -136.8407579 },
  { id: "glacier-national-park", name: "Glacier National Park", parkCode: "glac", states: ["MT"], latitude: 48.68414678, longitude: -113.8009306 },
  { id: "grand-canyon-national-park", name: "Grand Canyon National Park", parkCode: "grca", states: ["AZ"], latitude: 36.0001165336, longitude: -112.121516363 },
  { id: "grand-teton-national-park", name: "Grand Teton National Park", parkCode: "grte", states: ["WY"], latitude: 43.81853565, longitude: -110.7054666 },
  { id: "great-basin-national-park", name: "Great Basin National Park", parkCode: "grba", states: ["NV"], latitude: 38.94617378, longitude: -114.2579782 },
  { id: "great-sand-dunes-national-park", name: "Great Sand Dunes National Park", parkCode: "grsa", states: ["CO"], latitude: 37.79256812, longitude: -105.5919572 },
  { id: "great-smoky-mountains-national-park", name: "Great Smoky Mountains National Park", parkCode: "grsm", states: ["NC", "TN"], latitude: 35.60116374, longitude: -83.50818326 },
  { id: "guadalupe-mountains-national-park", name: "Guadalupe Mountains National Park", parkCode: "gumo", states: ["TX"], latitude: 31.92304462, longitude: -104.885527 },
  { id: "haleakal-national-park", name: "Haleakalā National Park", parkCode: "hale", states: ["HI"], latitude: 20.70693015, longitude: -156.1591775 },
  { id: "hawai-i-volcanoes-national-park", name: "Hawaiʻi Volcanoes National Park", parkCode: "havo", states: ["HI"], latitude: 19.3355036, longitude: -155.4700257 },
  { id: "hot-springs-national-park", name: "Hot Springs National Park", parkCode: "hosp", states: ["AR"], latitude: 34.52414366, longitude: -93.06332936 },
  { id: "indiana-dunes-national-park", name: "Indiana Dunes National Park", parkCode: "indu", states: ["IN"], latitude: 41.63765525, longitude: -87.09647445 },
  { id: "isle-royale-national-park", name: "Isle Royale National Park", parkCode: "isro", states: ["MI"], latitude: 48.01145819, longitude: -88.82780657 },
  { id: "joshua-tree-national-park", name: "Joshua Tree National Park", parkCode: "jotr", states: ["CA"], latitude: 33.91418525, longitude: -115.8398125 },
  { id: "katmai-national-park", name: "Katmai National Park", parkCode: "katm", states: ["AK"], latitude: 58.62235668, longitude: -155.0126574 },
  { id: "kenai-fjords-national-park", name: "Kenai Fjords National Park", parkCode: "kefj", states: ["AK"], latitude: 59.81804414, longitude: -150.106502 },
  { id: "kings-canyon-national-park", name: "Kings Canyon National Park", parkCode: "seki", states: ["CA"], latitude: 36.71277299, longitude: -118.587429 },
  { id: "kobuk-valley-national-park", name: "Kobuk Valley National Park", parkCode: "kova", states: ["AK"], latitude: 67.35631336, longitude: -159.2002293 },
  { id: "lake-clark-national-park", name: "Lake Clark National Park", parkCode: "lacl", states: ["AK"], latitude: 60.57405857, longitude: -153.55535 },
  { id: "lassen-volcanic-national-park", name: "Lassen Volcanic National Park", parkCode: "lavo", states: ["CA"], latitude: 40.49354575, longitude: -121.4075993 },
  { id: "mammoth-cave-national-park", name: "Mammoth Cave National Park", parkCode: "maca", states: ["KY"], latitude: 37.19760458, longitude: -86.13090198 },
  { id: "mesa-verde-national-park", name: "Mesa Verde National Park", parkCode: "meve", states: ["CO"], latitude: 37.23908345, longitude: -108.4624032 },
  { id: "mount-rainier-national-park", name: "Mount Rainier National Park", parkCode: "mora", states: ["WA"], latitude: 46.86075416, longitude: -121.7043885 },
  { id: "national-park-of-american-samoa", name: "National Park of American Samoa", parkCode: "npsa", states: [], latitude: -14.22865935, longitude: -169.8503777 },
  { id: "new-river-gorge-national-park-and-preserve", name: "New River Gorge National Park and Preserve", parkCode: "neri", states: ["WV"], latitude: 37.86878554, longitude: -80.99956002 },
  { id: "north-cascades-national-park", name: "North Cascades National Park", parkCode: "noca", states: ["WA"], latitude: 48.71171756, longitude: -121.2069423 },
  { id: "olympic-national-park", name: "Olympic National Park", parkCode: "olym", states: ["WA"], latitude: 47.80392754, longitude: -123.6663848 },
  { id: "petrified-forest-national-park", name: "Petrified Forest National Park", parkCode: "pefo", states: ["AZ"], latitude: 34.98387664, longitude: -109.7877678 },
  { id: "pinnacles-national-park", name: "Pinnacles National Park", parkCode: "pinn", states: ["CA"], latitude: 36.49029208, longitude: -121.1813607 },
  { id: "redwood-national-park", name: "Redwood National Park", parkCode: "redw", states: ["CA"], latitude: 41.37237268, longitude: -124.0318129 },
  { id: "rocky-mountain-national-park", name: "Rocky Mountain National Park", parkCode: "romo", states: ["CO"], latitude: 40.3556924, longitude: -105.6972879 },
  { id: "saguaro-national-park", name: "Saguaro National Park", parkCode: "sagu", states: ["AZ"], latitude: 32.20909636, longitude: -110.7574974 },
  { id: "sequoia-national-park", name: "Sequoia National Park", parkCode: "seki", states: ["CA"], latitude: 36.71277299, longitude: -118.587429 },
  { id: "shenandoah-national-park", name: "Shenandoah National Park", parkCode: "shen", states: ["VA"], latitude: 38.49236644, longitude: -78.46907715 },
  { id: "theodore-roosevelt-national-park", name: "Theodore Roosevelt National Park", parkCode: "thro", states: ["ND"], latitude: 47.17777274, longitude: -103.4300083 },
  { id: "virgin-islands-national-park", name: "Virgin Islands National Park", parkCode: "viis", states: [], latitude: 18.34279656, longitude: -64.74194451 },
  { id: "voyageurs-national-park", name: "Voyageurs National Park", parkCode: "voya", states: ["MN"], latitude: 48.48370609, longitude: -92.8382913 },
  { id: "white-sands-national-park", name: "White Sands National Park", parkCode: "whsa", states: ["NM"], latitude: 32.77907858, longitude: -106.3333461 },
  { id: "wind-cave-national-park", name: "Wind Cave National Park", parkCode: "wica", states: ["SD"], latitude: 43.58012365, longitude: -103.4394709 },
  { id: "wrangell-st-elias-national-park", name: "Wrangell–St. Elias National Park", parkCode: "wrst", states: ["AK"], latitude: 61.4182147, longitude: -142.6028439 },
  { id: "yellowstone-national-park", name: "Yellowstone National Park", parkCode: "yell", states: ["ID", "MT", "WY"], latitude: 44.59824417, longitude: -110.5471695 },
  { id: "yosemite-national-park", name: "Yosemite National Park", parkCode: "yose", states: ["CA"], latitude: 37.84883288, longitude: -119.5571873 },
  { id: "zion-national-park", name: "Zion National Park", parkCode: "zion", states: ["UT"], latitude: 37.29839254, longitude: -113.0265138 },
] as const;
