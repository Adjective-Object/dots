let drawing = new FormDrawing(new DotDrawingRenderer());
document.addEventListener("DOMContentLoaded", () => {
  drawing.init({
    svgContainer: document.getElementById('dots-container'),
    saveCanvasButton: document.getElementById('download-link'),
  });
});
