class DrawingRendererBase {
  renderBackgroundRect(boundingRect, color) {
    return (
      `<rect ` +
      `x="${boundingRect.x}" y="${boundingRect.y}" ` +
      `width="${boundingRect.width}" height="${boundingRect.height}" ` +
      `fill="${color}` +
      `"/>`
    );
  }

  renderDiagram(state) {
    throw new Error('Render not implemented');
  }

  getBoundingRect(state) {
    throw new Error('getBoundingRect not implemented');
  }

  __getSvgWithContent(content = '') {
    return (
      '<svg' +
      ' xmlns="http://www.w3.org/2000/svg"' +
      ' xmlns:dots="dots"' +
      ' version="1.1">' +
      content +
      '</svg>'
    );
  }

  getSvgHostHTML() {
    return this.__getSvgWithContent('');
  }

  renderToInnerHTML(state) {
    let boundingRect = this.getBoundingRect(state);
    let rectSVG = this.renderBackgroundRect(
      boundingRect,
      state.style.background_color,
    );
    let diagramSVG = this.renderDiagram(state);
    return rectSVG + diagramSVG;
  }

  renderToOuterHTML(state) {
    return this.__getSvgWithContent(this.renderToInnerHTML(state));
  }
}
