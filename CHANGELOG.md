# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - YYYY-MM-DD

---

## [v1.0.0.0](https://github.com/sudoist/hoppy-coin/releases/tag/v1.0.0.0) - 2024-05-10

## Added

### Assets
- Portals
- Borders
- Announcement board
- Speech bubbles
- Lock/Unlock buttons

### Scenes
- Tutorial
  - Added camera controls
- Title screen
- Check for started ranked game before sending score to API

### Controls
- Tap anywhere on mobile for joystick controls to display


## Changes
- Moved scenes to own directory
- Moved ranked to own directory
- Replaced borders with backgrounds
- Updated ranked games
  - Going to "ranked" button and portals will move to stage selection screen
    - After finishing a game and reaching top 10, then the name input will appear
    - Finishing below top 10 will not send score to API
  - Input keys for name are now clickable
- Fixed ranked scores and portals overlap


## Removed
- Clean up unused files
- Leaderboard scene, to be moved in explore/main menu scene

---

## [v0.2.8.2](https://github.com/sudoist/hoppy-coin/releases/tag/v0.2.8.2) - 2024-04-23

## Added

### Scenes
- Added Loaders
- Added Main Menu
- Added Arcade
- Added Ranked
  - Name input scene
  - Stage selection scene
  - Game scene
- Added Leaderboard

### Assets
- Added logo
- Added music
- Added favicon


## Changes
- Initial background
- Game background changed to transparent
  - To use html background instead
- Navigation in game was moved to scenes instead of pages
- Updated README file
- Reduce assets directory nesting to 1 level max


## Removed
- Libraries used for navigating and styling pages
  - Tailwind CSS
  - jQuery
- Releases for older versions
  - Moved to different branches

---

## [v0.1.0.0](https://github.com/sudoist/hoppy-coin/releases/tag/v0.1.0.0) - 2024-04-19

## Added

### Documentation
- Added a changelog

### Game modes
- Arcade - Casual game with changing platforms but score is not saved
- Ranked - Based on arcade but does not change platforms and saves scores

### Pages
- Rankings - Displays after completing a ranked game
- HTML pages to change game modes and navigation

### Audio
- Sound effects
- Music

### In game
- Mute/Unmute toggle for sounds

### Libraries
- Added Tailwind CSS
- Added jQuery

### Backend
- Added ability to send and get scores from API


## Changes

### Code structure
- Used jQuery to include files
- Broken down functions into modules

---

## [v0.0.0.0] - 2024-03-04

## Added
- Tutorial part 10 as base game