import _ from 'lodash';
import Row from './row';
import Columns from './columns';
import {aggregator} from './aggregator';

export default class Dataframe {
  /*
    Constructor:
    {
      columns: [
        {name: 'model', type: 'string' },
        {name: 'segment', type: 'string' },
        {name: 'price', type: 'number' },
      ],
      rows: [
        {model: 'crosstrek', segment: 'SUV', price: 21000},
        {model: 'impreza', segment: 'sedan', price: 16000},
        {model: 'outback', segment: 'SUV', price: 25000}
      ]
    }
  */
  constructor(data) {
    const columns = _.get(data, 'columns') || [];
    const rows = _.get(data, 'rows') || [];
    // Consider using immutable.js in this class
    this.columns = new Columns(columns || []);
    this.rows = _.map(rows || [], (row) => new Row(this.columns, row));
    this.value = data;
  }

  get toTuples() {
    return _.map(this.rows, (row) => row.ordered);
  }

  get aggregate() {
    return this.getAggregator();
  }

  getAggregator() {
    return aggregator(this.value.rows);
  }

}
