import type { Meta, StoryObj } from '@storybook/angular';

import { ChartComponent } from '../../lib/charts/chart.component';
import { ChartOrientation, InteractionMode, LineDashType, SelectMode } from '@open-dcp/charts';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ChartComponent> = {
  title: 'Charts/Basic Chart',
  component: ChartComponent,
  tags: ['autodocs'],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<ChartComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args, context) => ({
    props: {
      ...args
    },
    template: `<odcp-chart [layout]="layout" [data]="data" [axes]="axes"></odcp-chart>`
  }),
  args: {
    layout: {
        width: 500,
        height: 500,
        
    },
    axes: [
        { id: 'x', title: 'My X Axis', position: 'top' },
        { id: 'y2', title: 'My 2Y Axis', position: 'right' },
        { id: 'y', title: 'My Y Axis', position: 'left' },
    ],
    data: [
        {
            x: [1, 2, 3],
            y: [7, 8, 9],
            type: "bar",
            name: "My Bar Series",
            axis: {
                x: "x",
                y: "y2"
            }
        },
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter",
            name: "My Series",
            axis: {
                x: "x",
                y: "y"
            }
        }
    ]
  },
};

export const ChartsWithTickSequence: Story = {
  render: (args, context) => ({
    props: {
      ...args
    },
    template: `<odcp-chart [layout]="layout" [data]="data" [axes]="axes" [events]="events"></odcp-chart>`
  }),
  args: {
    layout: {
      width: 800,
      height: 500,
    },
    axes: [
      { id: 'x', title: 'My X Axis', position: 'top' },
      { id: 'y', title: 'My Y Axis', position: 'left', 
        categoryOrder: ["Extractable Volume - 8 - CoA","Subvisible Particles, Particles ≥ 25 μm per container - 8 - CoA","Bioassay Potency - 8 - CoA","Osmolality - 8 - CoA","pH - 8 - CoA","Purity by IEC, Acidic - 8 - CoA","Purity by IEC, Basic - 8 - CoA","Purity by IEC, Main - 8 - CoA","Purity by SEC, Main - 8 - CoA","Purity by SEC, Sum of HMW Forms - 8 - CoA","Subvisible Particles, Particles ≥ 10 μm per container - 8 - CoA","UV Grav Protein Cont - 8 - CoA","Volume in Container - 8 - CoA"]},
    ],
    data: [
      {
        "x": [0,0,0,0,0,0,0,0,0,0,0,0,0],
        "y": ["Extractable Volume - 8 - CoA","Subvisible Particles, Particles ≥ 25 μm per container - 8 - CoA","Bioassay Potency - 8 - CoA","Osmolality - 8 - CoA","pH - 8 - CoA","Purity by IEC, Acidic - 8 - CoA","Purity by IEC, Basic - 8 - CoA","Purity by IEC, Main - 8 - CoA","Purity by SEC, Main - 8 - CoA","Purity by SEC, Sum of HMW Forms - 8 - CoA","Subvisible Particles, Particles ≥ 10 μm per container - 8 - CoA","UV Grav Protein Cont - 8 - CoA","Volume in Container - 8 - CoA"],
        "type": "bar",
        "name": "HTO",
        "axis": {"x":"x","y":"y"}, 
        "style": {"orientation":"horizontal"}
      },
      {
        "x": [2,1,0,0,0,0,0,0,0,0,0,0,0],
        "y": ["Extractable Volume - 8 - CoA","Subvisible Particles, Particles ≥ 25 μm per container - 8 - CoA","Bioassay Potency - 8 - CoA","Osmolality - 8 - CoA","pH - 8 - CoA","Purity by IEC, Acidic - 8 - CoA","Purity by IEC, Basic - 8 - CoA","Purity by IEC, Main - 8 - CoA","Purity by SEC, Main - 8 - CoA","Purity by SEC, Sum of HMW Forms - 8 - CoA","Subvisible Particles, Particles ≥ 10 μm per container - 8 - CoA","UV Grav Protein Cont - 8 - CoA","Volume in Container - 8 - CoA"],
        "type": "bar",
        "name": "RMH",
        "axis": {"x":"x","y":"y"}, 
        "style": {"orientation":"horizontal"}
      }
    ],
  },
};

export const ForceLegends: Story = {
  render: (args, context) => ({
    props: {
      ...args
    },
    template: `<odcp-chart [layout]="layout" [data]="data" [axes]="axes" [events]="events"></odcp-chart>`
  }),
  args: {
    layout: {
      width: 500,
      height: 500,
      style: {
        forceLegend: true,
        legendPosition: {
          x: 0.5,
          y: -0.2,
          orientation: ChartOrientation.Horizontal,
          xAlign: 'center'
        }
      },
      interactionMode: InteractionMode.Select,
      selectMode: SelectMode.Lasso,
    },
    axes: [
      { id: 'x', title: 'My X Axis', position: 'top' },
      { id: 'y', title: 'My Y Axis', position: 'left' },
    ],
    data: [
      {
        x: [1, 2, 3],
        y: [7, 8, 9],
        type: "bar",
        name: "My Bar Series",
        axis: {
            x: "x",
            y: "y"
        },
        style: {
          marker: {
            color: '#0f0',
          }
        }
      }
    ],
  },
};

export const HorizontalBars: Story = {
  render: (args, context) => ({
    props: {
      ...args
    },
    template: `<odcp-chart [layout]="layout" [data]="data" [axes]="axes"></odcp-chart>`
  }),
  args: {
        layout: {
        width: 500,
        height: 500
    },
    axes: [
        { id: 'x', title: 'My X Axis', position: 'top' },
        { id: 'y', title: 'My Y Axis', position: 'left' },
    ],
    data: [
      { x: [1], y: ["Task"], type: "bar", name: "Product 3", style: {orientation: ChartOrientation.Horizontal} },
      { x: [-1], y: ["Task"], type: "bar", name: "Product 2", style: {orientation: ChartOrientation.Horizontal} },
      { x: [2], y: ["Task"], type: "bar", name: "Product 1", style: {orientation: ChartOrientation.Horizontal} },
      { x: [-2], y: ["Task"], type: "bar", name: "Product 4", style: {orientation: ChartOrientation.Horizontal} },
      { x: [3], y: ["Task"], type: "bar", name: "Product 9", style: {orientation: ChartOrientation.Horizontal} },
      { x: [-3], y: ["Task"], type: "bar", name: "Product 5", style: {orientation: ChartOrientation.Horizontal} },
      { x: [-4], y: ["Task"], type: "bar", name: "Product 8", style: {orientation: ChartOrientation.Horizontal} },
      { x: [-5], y: ["Task"], type: "bar", name: "Product 6", style: {orientation: ChartOrientation.Horizontal} },
      { x: [4], y: ["Task"], type: "bar", name: "Product 7", style: {orientation: ChartOrientation.Horizontal} },
      { x: [5], y: ["Task"], type: "bar", name: "Product 0", style: {orientation: ChartOrientation.Horizontal} },
    ]
  },
};

export const Histogram: Story = {
  render: (args, context) => ({
    props: {
      ...args
    },
    template: `<odcp-chart [layout]="layout" [data]="data" [axes]="axes"></odcp-chart>`
  }),
  args: {
    layout: {
      width: 500,
      height: 500
    },
    axes: [
        { id: 'x', title: 'My X Axis', position: 'top' },
    ],
    data: [
      { x: [
          88.92196173729467,87.24170773627317,78.78492240271761,
          82.34431591459752,73.16540371774016,88.48579442058029,
          83.08856235495236,82.7735391318675,78.3374868325598,
          77.1479371083658,81.86718163167461,85.32650342459162,
          86.65547998000658,82.49636878375726,88.12122108327283
        ],
        type: "histogram", name: "SiteID 3 Bioreactor 006"}
    ]
  },
};

export const HistogramWithShapes: Story = {
  render: (args, context) => ({
    props: {
      ...args
    },
    template: `<odcp-chart [layout]="layout" [data]="data" [axes]="axes" [shapes]="shapes"></odcp-chart>`
  }),
  args: {
    layout: {
      width: 500,
      height: 500
    },
    axes: [
      { id: 'x', title: 'My X Axis', position: 'top' },
    ],
    data: [
      { x: [
          88.92196173729467,87.24170773627317,78.78492240271761,
          82.34431591459752,73.16540371774016,88.48579442058029,
          83.08856235495236,82.7735391318675,78.3374868325598,
          77.1479371083658,81.86718163167461,85.32650342459162,
          86.65547998000658,82.49636878375726,88.12122108327283
        ],
        type: "histogram", name: "SiteID 3 Bioreactor 006"}
    ],
    shapes: [
      {
        x: 75,
        type: 'vline',
        line: {
            color: 'red',
            width: 1,
            dash: LineDashType.Dash,
        },
      }
    ]
  },
};
