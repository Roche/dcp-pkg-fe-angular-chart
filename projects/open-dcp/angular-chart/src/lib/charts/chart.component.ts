import { Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartPlaceholderComponent } from './chart-placeholder.component';
import { AxisConfig, ChartConfig, ChartLayout, ChartSeries, ChartService, ChartShape, PlotlyAdapter } from '@open-dcp/charts';
import { ChartTypes, ChartModes } from './Chart';

@Component({
  selector: 'odcp-chart',
  standalone: true,
  imports: [CommonModule, ChartPlaceholderComponent],
  template: `
    <div *ngIf="!showChart">
      <odcp-chart-placeholder></odcp-chart-placeholder>
    </div>
    <div *ngIf="showChart" #chartContainer></div>
  `
})

export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() layout!: ChartLayout;
  @Input() data: ChartSeries[] = [];
  @Input() axes: AxisConfig[] = [];
  @Input() chartId: string = this.generateRandomId();
  @Input() loadingPlaceholder?: any;
  @Input() showModeBar?: boolean | string;
  @Input() shapes?: ChartShape[];

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef<HTMLElement>;

  chartConfig!: ChartConfig;
  adapter: PlotlyAdapter = new PlotlyAdapter();
  chartService: ChartService = new ChartService(this.chartId, this.adapter);

  // Utility function to generate a random unique ID
  generateRandomId(): string {
    return `chart-${Math.random().toString(36).slice(2, 11)}`;
  }

  get showChart(): boolean {
    return !!(this.layout?.width || this.layout?.height);
  }

  updateConfig() {
      this.chartService.setConfig(this.chartConfig);
  };

  mountChart() {
    this.updateConfig();
    this.chartService.mount(this.chartContainer.nativeElement);
  };

  ngOnInit(): void {
    this.chartConfig = {
      data: this.data ? this.data.map(series => ({
        ...series,
        type: series.type || ChartTypes.Scatter,
        mode: series.mode || ChartModes.LinesAndMarkers,
      })) : [],
      layout: {
        width: this.layout?.width,
        height: this.layout?.height,
        margin: this.layout?.margin,
        style: this.layout?.style,
      },
      shapes: this.shapes || [],
      axes: this.axes || [],
      options: {
        displayModeBar: this.showModeBar ?? 'hover',
      }
    };
  }

  ngAfterViewInit(): void {
    this.mountChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chartConfig) {
      return;
    }

    if (changes['showModeBar']) {
      this.chartConfig.options.displayModeBar = changes['showModeBar'].currentValue === true;
      this.updateConfig();
    }
    if (changes['layout']) {
      const newLayout = changes['layout'].currentValue;
      if (!this.chartConfig.layout) {
        this.chartConfig.layout = {};
      }
      this.chartConfig.layout.height = newLayout.height;
      this.chartConfig.layout.width = newLayout.width
      this.updateConfig();
    }
    if (changes['axes']) {
      this.chartConfig.axes = changes['axes'].currentValue;
      this.updateConfig();
    }
    if (changes['data']) {
      const newData = changes['data'].currentValue;
      if (!newData) {
        return;
      }

      this.chartConfig.data = newData;
      this.updateConfig();
    }
  }
}
