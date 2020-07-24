import { select } from 'd3-selection';
import React, { Component } from 'react';

const chartSize = 500;

const fakeData = [
  { skill: 'CSS', value: 55 },
  { skill: 'HTML', value: 80 },
  { skill: 'JS', value: 40 },
  { skill: 'ANGULAR', value: 35 },
];

class BarChart extends Component {
  private node: React.RefObject<SVGSVGElement>;

  constructor(props: any) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
    this.node = React.createRef();
  }

  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const { current } = this.node;

    select(current).selectAll('rect').data(fakeData).enter().append('rect');

    select(current)
      .selectAll('rect')
      .data(fakeData)
      .attr('height', 40)
      .attr('width', (d) => d.value)
      .attr('y', (d, i) => i * 70 + 50)
      .attr('x', 100)
      .attr('class', 'chart');

    select(current).selectAll('text').data(fakeData).enter().append('text');

    select(current)
      .selectAll('text')
      .data(fakeData)
      .attr('x', -1)
      .attr('y', (d, i) => i * 70 + 50 + 22)
      .text((d) => d.skill);
  }

  render() {
    return <svg ref={this.node} width={chartSize} height={chartSize} />;
  }
}

export default BarChart;
