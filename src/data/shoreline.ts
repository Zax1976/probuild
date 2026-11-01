// Lake Erie's south shore from Mentor (Ohio) into Pennsylvania, west to east, as
// [longitude, latitude]. Points are taken from two public datasets: the U.S. Census
// cartographic county boundaries (us-atlas) and the geo-maps 1 km lakes outline.
// The map draws a smooth curve through them, so harbor breakwaters are not shown.
export const shoreline: [number, number][] = [
  [-81.52, 41.615],
  [-81.45, 41.66],
  [-81.39, 41.703],
  [-81.343, 41.73],
  [-81.299, 41.758],
  [-81.255, 41.761],
  [-81.19, 41.786],
  [-81.123, 41.814],
  [-81.079, 41.826],
  [-81.035, 41.845],
  [-81.002, 41.856],
  [-80.954, 41.866],
  [-80.901, 41.872],
  [-80.858, 41.883],
  [-80.815, 41.898],
  [-80.785, 41.91],
  [-80.75, 41.915],
  [-80.69, 41.931],
  [-80.64, 41.945],
  [-80.596, 41.951],
  [-80.552, 41.969],
  [-80.521, 41.978],
  [-80.45, 41.996],
  [-80.36, 42.02],
];

// County and state lines inside the map area. These are survey lines, so straight
// segments are accurate. Each line runs south from the shore (or along a latitude).
export const boundaries = {
  // Lake County | Ashtabula County, continuing south as Geauga | Ashtabula.
  lakeAshtabula: -81.0025,
  // Lake County | Geauga County (east-west line), west of the Ashtabula line.
  lakeGeaugaLat: 41.7155,
  // Ohio | Pennsylvania.
  ohioPennsylvania: -80.5193,
};
