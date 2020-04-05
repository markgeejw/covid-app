export function format_countries(country) {
  if (country === "Congo (Brazzaville)") return "Congo (Republic)";
  else if (country === "Congo (Kinshasa)") return "Congo (Democratic Republic)";
  else if (country === "Korea, South") return "South Korea";
  else if (country === "US") return "United State of America";
  else return country;
}
