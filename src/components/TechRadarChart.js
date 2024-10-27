import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

// Определение категорий с цветами и размерами
const categories = {
  Adopt: { color: '#4caf50', size: 10 },
  Trial: { color: '#2196f3', size: 10 },
  Assess: { color: '#ff9800', size: 10 },
  Hold: { color: '#f44336', size: 10 }
};

const ringNames = ['Adopt', 'Trial', 'Assess', 'Hold'];

function TechRadarChart({ data, onOpenDetails }) {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, tech: null });

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Очищаем диаграмму перед новой отрисовкой

    const width = 800; // Ширина диаграммы
    const height = 800; // Высота диаграммы
    const radius = Math.min(width, height) / 2; // Радиус диаграммы

    // Установка атрибутов для SVG
    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height);

    // Добавление группы, центрируем её
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Создание колец и добавление названий
    ringNames.forEach((name, i) => {
      // Создание кольца
      g.append('circle')
        .attr('r', (i + 1) * (radius / ringNames.length))
        .style('fill', 'none')
        .style('stroke', 'gray')
        .style('stroke-width', 0.5);

      // Добавление текста статуса в центр кольца с смещением
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', (i + 1) * (radius / ringNames.length) - 10) // Позиция по вертикали с учетом радиуса
        .attr('font-size', '20px') // Размер шрифта
        .attr('fill', categories[name].color) // Цвет текста по статусу
        .text(name); // Название статуса
    });

    // Распределение точек по категориям
    const pointsPerCategory = Math.ceil(data.length / ringNames.length); // Количество точек в каждой категории
    const angleIncrement = (2 * Math.PI) / pointsPerCategory;

    ringNames.forEach((status, ringIndex) => {
      const filteredData = data.filter(d => d.status === status);
      filteredData.forEach((d, index) => {
        const angle = index * angleIncrement; // Угол для текущей точки
        const distance = (ringIndex + 1) * (radius / ringNames.length) - 20; // Расстояние для текущей категории

        g.append('circle')
          .attr('cx', Math.cos(angle) * distance)
          .attr('cy', Math.sin(angle) * distance)
          .attr('r', categories[status].size) // задаём размер по категории
          .style('fill', categories[status].color)
          .style('stroke', 'black')
          .on('mouseover', (event) => {
            setTooltip({ 
              visible: true, 
              x: event.pageX, 
              y: event.pageY, 
              tech: d 
            });
          })
          .on('mouseout', () => {
            setTooltip(prevTooltip => ({ ...prevTooltip, visible: false }));
          })
          .on('click', () => {
            onOpenDetails(d); // Открытие модального окна при клике
          });

        // Добавление текста с количеством голосов
        g.append('text')
          .attr('x', Math.cos(angle) * distance) // Позиция по оси X
          .attr('y', Math.sin(angle) * distance + 15) // Позиция по оси Y (чуть ниже точки)
          .attr('text-anchor', 'middle')
          .attr('fill', 'black')
          .attr('font-size', '12px') // Размер шрифта для голосов
          .text(d.votes); // Отображаем количество голосов
      });
    });

    // Добавление легенды
    const legend = svg.append('g').attr('transform', `translate(${width - 150}, 50)`);

    legend.selectAll('.legend-item')
      .data(ringNames)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`);

    legend.selectAll('.legend-item')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 20)
      .style('fill', d => categories[d].color);

    legend.selectAll('.legend-item')
      .append('text')
      .attr('x', 30)
      .attr('y', 15)
      .text(d => d);

  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      {tooltip.visible && tooltip.tech && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            background: 'white',
            border: '1px solid gray',
            borderRadius: '5px',
            padding: '10px',
            pointerEvents: 'none',
            zIndex: 1000
          }}
        >
          <strong>{tooltip.tech.name}</strong><br />
          <span>Category: {tooltip.tech.category}</span><br />
          <span>Status: {tooltip.tech.status}</span><br />
          <span>Votes: {tooltip.tech.votes}</span><br />
          <span>Version: {tooltip.tech.version}</span><br />
          <button 
            onClick={() => onOpenDetails(tooltip.tech)} 
            style={{ 
              marginTop: '5px', 
              padding: '5px 10px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '3px', 
              cursor: 'pointer' 
            }}
          >
            Подробнее
          </button>
        </div>
      )}
    </>
  );
}

export default TechRadarChart;
