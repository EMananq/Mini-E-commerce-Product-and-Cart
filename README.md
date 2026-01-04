# Mini E-Commerce

Simple e-commerce app built with React + Vite.

## Setup
1. `npm install`
2. `npm run dev`

## Notes
I focused more on clean state handling than UI polish.
Cart logic is in a reducer because it was getting hard to manage with useState.
Filters could be optimized further but clarity felt more important here.
If I had more time, I’d add localStorage and debounce the search.

## Features
- Products from dummyjson
- Search/Filter/Sort
- Cart with stock limits
- Persistence
