# Classkick Front End Engineering Take Home Project - Alex Kim

## Intro

Hi Classkick team! It was great talking with Sandip over video, and thank you for taking the time to review my take home assignment. Looking forward to hearing from you soon.

## Setup

```bash
// Built on Node v20.3.1
pnpm install
pnpm dev
```

## Project Structure

I've broken down this project into two folders:
- `/canvas` - Contains main canvas component and associated data logic
- `/addable` - Everything and anything related to adding an element to a canvas
- `/components` - Other components

## State Management

The most important aspect of this project to keep organized for me was how state would flow throughout the frontend. I used a state management library called [KeaJS](https://keajs.org/) which uses Redux under the hood.

I tried to keep store logic localized to the components that would be consuming its values and actions. These are kept in files named `*Logic.ts`:
- `canvasLogic.ts` - The main store that keeps a reference to the canvas as well as various parameters such as selected tool and brush size. It also contains logic for setState type actions that are called to initialize our canvas.
- `addableCanvasLogic.ts` - When we're adding elements such as text, emojis, and images, I draw an absolutely position div over the canvas to allow the user to edit and drag the elements around before baking it into the canvas.
- `mouseLogic.ts` - A globally keyed logic that keeps track of mouse position. This is just used for rendering a custom cursor on certain actions and is purely eye 🍬.

## Api

A barebones mocked api can be found in `/api`. If you open up the developer console, you can see that on page load, data for the specific canvas is fetched. When you click save canvas, you see another log saying that the canvas has been saved. All api methods are debounced by 3 seconds.

## External libraries
Shamelessly using these libraries:
- [KeaJS](https://keajs.org/) - state
- [react-dnd](https://github.com/react-dnd/react-dnd/) - drag-n-drop
