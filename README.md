# ASHIO Weather App

A live weather web app that fetches real-time weather data for any city worldwide using the OpenWeatherMap API.

## How it works

Instead of directly searching by city name, the app uses a two-step API approach. First, the city name is passed to the Geocoding API which returns the exact coordinates (lat/lon). Those coordinates are then passed to the Weather API to get accurate live data. This approach is more precise than a direct city name search.

## Features

- Real-time weather data for any city worldwide
- Three UI states — placeholder on load, weather data after search, error state for invalid cities
- Input validation before API call to avoid unnecessary requests
- Live weather icons served directly from OpenWeatherMap

## Tech Stack

- HTML, CSS, JavaScript
- Axios for API calls
- OpenWeatherMap Geocoding API + Weather API

## Live Demo

[View Live](https://ashish-shahi.github.io/Weather-App/)

## API Reference

- [Geocoding API](https://openweathermap.org/api/geocoding-api)
- [Current Weather API](https://openweathermap.org/current)
