import React, { Component } from 'react';
import LocaleProvider from '../../../lib/locale-provider';
import Button from '../../../lib/button';
import '../../../lib/button/style/css';
import Select from '../../../lib/select';
import '../../../lib/select/style/css';
import Input from '../../../lib/input';
import '../../../lib/input/style/css';
import DatePicker from '../../../lib/date-picker';
import '../../../lib/date-picker/style/css';
import Grid from '../../../components/lib/nano-grid';
import Row from '../../../components/lib/nano-row';
import zhCN from '../../../lib/locale-provider/zh_CN';

import '../../../lib/radio/style/css';
import Radio, { Group as RadioGroup } from '../../../lib/radio';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class App extends Component {
  state = {
    value: 1,
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div>
          <Button marginLeft="m-l-xs" marginRight="m-r-xs" _children="aaa">bbb</Button>
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Input />
          <DatePicker />
          <Grid>
            <Row marginBottom="m-b"/>
            <Row marginBottom="m-b"/>
            <Row marginBottom="m-b"/>
          </Grid>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </RadioGroup>
        </div>
      </LocaleProvider>
    );
  }
}
