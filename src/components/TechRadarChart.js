import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function TechRadarChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    // Очистим предыдущий график
    d3.select(chartRef.current).selectAll('*').remove();

    const width = 600;
    const height = 600;
    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = 100; // радиус центра
    const ringCount = 4; // количество кругов
    const categories = ['Adopt', 'Trial', 'Assess', 'Hold'];
    const colors = {
      Adopt: 'green',
      Trial: 'blue',
      Assess: 'yellow',
      Hold: 'red',
    };

    // Создаём SVG элемент
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Создаём круговые кольца
    const radiusScale = d3.scaleLinear()
      .domain([0, ringCount])
      .range([innerRadius, outerRadius]);

    for (let i = 0; i < ringCount; i++) {
      svg.append('circle')
        .attr('r', radiusScale(i))
        .attr('fill', 'none')
        .attr('stroke', '#ccc');
    }

    // Располагаем точки технологий на диаграмме
    data.forEach((tech, index) => {
      const angle = (index / data.length) * 2 * Math.PI;
      const radius = radiusScale(categories.indexOf(tech.status));

      svg.append('circle')
        .attr('cx', Math.cos(angle) * radius)
        .attr('cy', Math.sin(angle) * radius)
        .attr('r', 5)
        .attr('fill', colors[tech.status]);

      svg.append('text')
        .attr('x', Math.cos(angle) * (radius + 10))
        .attr('y', Math.sin(angle) * (radius + 10))
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(tech.name);
    });
  }, [data]);

  return <svg ref={chartRef}></svg>;
}

export default TechRadarChart;
