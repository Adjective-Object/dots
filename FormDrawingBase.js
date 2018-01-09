class FormDrawingBase {
  constructor() {}

  init() {
    let svgContainer = document.getElementById("dots-container");
    let svgElement = document.getElementById("dots-svg");
    let saveCanvasButton = document.getElementById("download-link");
    /////////////////////
    // Live Update SVG //
    /////////////////////
    let formState = new FormState()
      .onChange(state => {
        let numBits = state.content.text.length * 8;
        if (numBits > state.style.h_grid * state.style.v_grid) {
          state.style.v_grid = Math.ceil(numBits / state.style.h_grid);
          formState.updateDom(document);
        }
      })
      .onChange(state => {
        // Re-render svg html
        let boundingRect = this.__getBoundingRect(state);
        let rectSVG = this.__renderBackgroundRect(
          boundingRect,
          state.style.background_color
        );
        let diagramSVG = this.__renderDiagram(state);
        svgElement.innerHTML = rectSVG + diagramSVG;
        svgElement.setAttribute("dots:config", JSON.stringify(state));

        // Update viewbox
        svgElement.setAttribute(
          "viewBox",
          `${boundingRect.x},${boundingRect.y},` +
            `${boundingRect.width},${boundingRect.height}`
        );

        // Set the container's background color to get the whole "editing"
        // area the same color
        svgContainer.style.backgroundColor = state.style.background_color;
      })
      .init(document);

    ////////////
    // Resize //
    ////////////
    let resize = () => {
      let boundingRect = svgContainer.getBoundingClientRect();
      svgElement.setAttribute("width", boundingRect.width);
      svgElement.setAttribute("height", boundingRect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    //////////////
    // Download //
    //////////////
    saveCanvasButton.addEventListener("click", () => {
      // Build the output file
      let svgElementClone = svgElement.cloneNode(true);
      svgElementClone.removeAttribute("width");
      svgElementClone.removeAttribute("height");
      console.log(svgElementClone);
      let svg_file = new File([svgElementClone.outerHTML], "canvas.svg");
      let svg_url = URL.createObjectURL(svg_file);
      saveCanvasButton.href = svg_url;

      // Make the download name something else
      let now = new Date();
      saveCanvasButton.download =
        `${now.getFullYear()}-${now.getMonth() +
          1}-${now.getDate()}-${guid()}` + `-canvas.svg`;
    });
  }

  __renderBackgroundRect(boundingRect, color) {
    return (
      `<rect ` +
      `x="${boundingRect.x}" y="${boundingRect.y}" ` +
      `width="${boundingRect.width}" height="${boundingRect.height}" ` +
      `fill="${color}` +
      `"/>`
    );
  }

  __renderDiagram(state) {
    throw new Error("Render not implemented");
  }

  __getBoundingRect(state) {
    throw new Error("getBoundingRect not implemented");
  }
}
