# AGENTS.md - Angular Chart Component

## Project Overview

**@open-dcp/angular-chart** is an **Angular wrapper component** for the framework-agnostic `@open-dcp/charts` library (Plotly-based). It provides a reusable `DcChartComponent` that bridges Angular's dependency injection and change detection with the underlying chart service.

## Architecture

### Project Structure
```
angular-chart/
├── projects/open-dcp/angular-chart/src/
│   ├── lib/              # DcChartComponent + sub-components
│   ├── grid.ts           # Grid-related exports
│   ├── stories/          # Storybook stories
│   ├── public-api.ts     # Main entry point
│   └── styles.scss       # Library styles
├── angular.json
└── package.json
```

### Component Hierarchy
- **DcChartComponent** (main wrapper)
  - Accepts `@Input() chartData: ChartData`
  - Exposes internal ChartService via property binding
  - Handles lifecycle: ngOnInit → initialize service, ngOnDestroy → cleanup

## Core Integration Pattern

### Chart Data Flow
```
DcChartComponent
├── @Input() chartData        # Plotly chart config
├── @Input() options          # Chart dimensions, refresh mode
├── ChartService instance     # Internal service (Plotly adapter)
└── Observable$ streams       # Data subscriptions for change detection
```

### Component Implementation
```typescript
import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ChartService } from '@open-dcp/charts';

@Component({
  selector: 'odcp-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DcChartComponent implements OnInit, OnDestroy {
  @Input() chartData: any;           // Plotly data + layout
  @Input() options: any;              // Chart options (responsive, etc.)
  
  chartService: ChartService;
  
  ngOnInit() {
    this.chartService = new ChartService(this.chartData);
  }
  
  ngOnDestroy() {
    // Cleanup: Plotly removes chart from DOM
  }
}
```

## Key Dependencies

### @open-dcp/charts
- **ChartService**: Main service wrapping Plotly
- **PlotlyAdapter**: Converts DCP format to Plotly
- **Constants**: Chart defaults and enumerations
- No reactive observables; imperative data updates

### Angular 17.3
- **@angular/core**: Component lifecycle
- **@angular/common**: CommonModule, AsyncPipe
- **rxjs**: Used in consuming apps, not in component itself

## Developer Workflow

### Build & Development
```bash
npm install
npm run watch              # ng build --watch --configuration development
npm run build              # ng build (production)
npm run storybook          # Storybook dev server
npm test                   # Karma + Jasmine tests
```

### Storybook Story Example
```typescript
import { Meta, StoryObj } from '@storybook/angular';
import { DcChartComponent } from '../lib/chart/chart.component';

const meta: Meta<DcChartComponent> = {
  title: 'Components/Chart',
  component: DcChartComponent,
};

export const BarChart: StoryObj = {
  args: {
    chartData: {
      data: [
        { x: [1, 2, 3], y: [4, 5, 6], type: 'bar' }
      ],
      layout: { title: 'Sample Bar Chart' }
    }
  }
};
```

## Common Integration Scenarios

### 1. **Reactive Chart Updates**
```typescript
// In consuming component
chartData$ = this.gridService.rows$.pipe(
  map(rows => ({
    data: [{ y: rows.map(r => r.value), type: 'scatter' }],
    layout: { title: 'Data Overview' }
  }))
);

// In template
<odcp-chart [chartData]="chartData$ | async"></odcp-chart>
```

### 2. **Chart Resize Handling**
```typescript
// Pass options to handle responsive resizing
<odcp-chart 
  [chartData]="chartData" 
  [options]="{ responsive: true, width: '100%' }">
</odcp-chart>
```

### 3. **Multiple Chart Types**
- Pass `type: 'bar' | 'scatter' | 'line' | 'pie'` in chartData.data[].type
- ChartService routes to PlotlyAdapter which handles rendering

## Testing

### Mocking ChartService
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcChartComponent } from './chart.component';
import { ChartService } from '@open-dcp/charts';

describe('DcChartComponent', () => {
  let component: DcChartComponent;
  let fixture: ComponentFixture<DcChartComponent>;
  let chartServiceSpy: jasmine.SpyObj<ChartService>;

  beforeEach(async () => {
    chartServiceSpy = jasmine.createSpyObj('ChartService', ['render', 'update']);
    
    await TestBed.configureTestingModule({
      imports: [DcChartComponent],
      providers: [
        { provide: ChartService, useValue: chartServiceSpy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(DcChartComponent);
    component = fixture.componentInstance;
  });

  it('should initialize chart on ngOnInit', () => {
    component.ngOnInit();
    expect(component.chartService).toBeDefined();
  });
});
```

## Pitfalls & Solutions

| Issue | Solution |
|-------|----------|
| Chart not rendering | Check chartData format matches Plotly API; verify container div exists |
| RxJS subscription not triggering chart update | DcChartComponent doesn't auto-detect changes; use manual `chartService.update()` or Angular ChangeDetection |
| Memory leak on destroy | Ensure ngOnDestroy cleans up Plotly resources |
| Storybook stories show blank | Verify MSW mocking is configured; check console for data loading errors |

## Cross-Component Communication

### With GridService
```typescript
// Chart consuming grid data
constructor(private gridService: GridService) {
  this.gridService.rows$.subscribe(rows => {
    this.chartData = this.transformRowsToChart(rows);
  });
}
```

### With FormService
```typescript
// Chart filters via form
constructor(private formService: FormService<any>) {
  this.formService.valueChangeSubject.subscribe(() => {
    const filters = this.formService.getFormValues();
    // Re-fetch chart data with new filters
  });
}
```

## References

- **Main component**: `projects/open-dcp/angular-chart/src/lib/chart/chart.component.ts`
- **Core library**: `@open-dcp/charts` (separate package)
- **Plotly docs**: https://plotly.com/javascript/
- **Storybook config**: Root `.storybook/` folder

