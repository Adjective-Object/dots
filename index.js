class DotFormDrawing extends FormDrawing {
  __getMaxCircleSize(circle_config) {
    return Math.max(
      Number(circle_config.circle_radius),
      Number(circle_config.ring_radius) +
        Number(circle_config.ring_stroke_width) / 2,
    );
  }

  __getBoundingRect(state) {
    let circlePadding = Math.max(
      this.__getMaxCircleSize(state['0']),
      this.__getMaxCircleSize(state['1']),
    );
    let padding = circlePadding + Number(state.style.padding);
    return {
      x: -padding,
      y: -padding,
      width: state.style.h_grid * state.style.h_space + padding * 2,
      height: state.style.v_grid * state.style.v_space + padding * 2,
    };
  }

  __renderDot(x, y, styleConfig, dotConfig) {
    return `<g transform="translate(${x}, ${y})">
    <circle r="${dotConfig.circle_radius}" fill="${styleConfig.stroke_color}"/>
    <circle r="${dotConfig.ring_radius}"
            fill="transparent"
            stroke="${styleConfig.stroke_color}"
            stroke-width="${dotConfig.ring_stroke_width}"/>
    </g>`;
  }

  __renderDiagram(state) {
    let dots = getBin(state.content.text);
    let dotGroups = gridCoordinates(
      dots.length,
      state.style,
    ).map(([x, y], idx) => {
      let currentDigit = dots[idx]; // "1" or "0"
      return this.__renderDot(x, y, state.style, state[currentDigit]);
    });
    return dotGroups.join('');
  }
}

let drawing = new DotFormDrawing();
document.addEventListener('DOMContentLoaded', () => {
  drawing.init();
});
