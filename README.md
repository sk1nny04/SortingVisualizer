
# Sorting Visualizer

A dynamic and interactive web application that visualizes the process of popular sorting algorithms using animated bars. The visualizer helps users understand how sorting algorithms work by watching them in action with customizable speed and dataset size.

## ✨ Features

- Visualize **Bubble Sort**, **Quick Sort**, **Merge Sort**, and **Selection Sort**
- Customize:
  - Number of data points (10–100)
  - Animation speed (Real-time to 16x faster)
- Interactive controls to:
  - Generate a random dataset
  - Start the sorting animation

## 🧠 Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Styling and animation classes
- **Vanilla JavaScript**: Sorting logic, DOM manipulation, and animation

## 📁 File Structure

```plaintext
├── SortingVisualazier.html   # Main HTML structure and UI controls
├── SortingVisualazier.css    # Styles for layout and animations
└── SortingVisualazier.js     # Sorting algorithms and visualization logic
```

## 🚀 Getting Started

### 1. Clone the repo or download the files
```bash
git clone https://github.com/sk1nny04/sorting-visualizer
```

### 2. Open the HTML file
Just open `SortingVisualazier.html` in your favorite browser.

## 🛠️ How It Works

- Bars are rendered based on the input size.
- When a sorting algorithm is triggered:
  - Elements are compared and swapped visually.
  - Their position and color change to reflect the sorting process.
- Classes like `.selected`, `.pivot`, `.min`, `.sorted` help indicate status during animation.

## 🎨 CSS Class Highlights

- `.bars`: Base class for all bars
- `.selected`: Bars being compared
- `.pivot`: Pivot element in Quick Sort
- `.min`: Current minimum in Selection Sort
- `.sorted`: Elements that are in final sorted position

## 🧪 Future Improvements

- Add more sorting algorithms (e.g., Heap Sort, Insertion Sort)
- Add play/pause functionality
- Enhance UI and mobile responsiveness
- Display step counter and time complexity info

