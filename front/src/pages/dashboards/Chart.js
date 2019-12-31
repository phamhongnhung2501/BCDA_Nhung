import React from "react";

import ApexCharts from "react-apexcharts";

import {
  Card, CardBody, CardHeader, CardTitle,
  DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, Input,
  Row, Col
} from "reactstrap";
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: new Date(moment().startOf('year').format('L')),
      to: new Date(moment().endOf('year').format('L')),
    };
  }

  handleFromChange(from) {
    this.setState({ from });
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    if (this.state.from !== "") {
      this.props.handerSetDueDateKPI(this.state.from, to);
    }
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    console.log(from,to);
    return (
      <div className="InputFromTo" >
        <UncontrolledDropdown >
          <DropdownToggle caret color="light">
            Phase: {moment(from).format('DD/MM/YYYY')} - {moment(to).format('DD/MM/YYYY')} {' '}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              Start time: {' '}
              <DayPickerInput
                inputProps={{ style: { width: 100 } }}
                value={from}
                placeholder="From"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { after: to },
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 1,
                  onDayClick: () => this.to.getInput().focus(),
                }}
                onDayChange={this.handleFromChange}
              />
            </DropdownItem>
            <DropdownItem header>
              End Time: {' '}
              <DayPickerInput
                ref={el => (this.to = el)}
                inputProps={{ style: { width: 100 } }}
                value={to}
                placeholder="To"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { before: from },
                  modifiers,
                  month: from,
                  fromMonth: from,
                  numberOfMonths: 1,
                }}
                onDayChange={this.handleToChange}
              />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      socket: true,
      type: "realtime",
    };
    this.handerSetDueDateKPI = this.handerSetDueDateKPI.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.options = {
      stroke: {
        width: 3
      },
      xaxis: {
        type: "datetime",
        show: true,
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        },
        tickAmount: 'dataPoints',
      },
      // colors: ["#0cc2aa", "#fcc100", "#f44455", "#f44455", "#5fc27e", "#f3ff05"]
      colors: ["#0cc2aa", "#fcc100", "#f44455", "#BD10E0", "#5fc27e", "#5b7dff", "#c6eb34", "#34ebb7", "#34ebb7", "#36403d", "#f3ff05", "#8e9be8", "#aaabb3", "#66ff66", "#f0ece6"]
    };

  }

  componentDidMount() {
    // Trigger resize manually so chart doesn't fall off canvas
    window.dispatchEvent(new Event("resize"));
  }
  handerSetDueDateKPI(from, to) {
    console.log(from, to);
    this.props.handleSearch(from, to);
  }
  handleChangeType(event) {
    this.setState({
      type: event.target.value
    })
    if (event.target.value === "report") {
      this.props.handleChangeSocket(false);
    }
    else {
      this.props.handleChangeSocket(true);
    }
  }
  render() {
    const data = this.props.data;
    const type = this.props.type;
    const T1 = data.map(({time,T1},key)=>{
      let x = time;
      let y = T1;
      return {x,y} 
    })
    // console.log(T1);
    const T2 = data.map(({time, T2 },key)=>{
      let x = time;
      let y = T2;
      return {x,y} 
    })
    const T3 = data.map(({time, T3 },key)=>{
      let x = time;
      let y = T3;
      return {x,y} 
    })
    const T4 = data.map(({time, T4 },key)=>{
      let x = time;
      let y = T4;
      return {x,y} 
    })
    const H1 = data.map(({time,H1},key)=>{
      let x = time;
      let y = H1;
      return {x,y} 
    })
    const H2 = data.map(({time,H2},key)=>{
      let x = time;
      let y = H2;
      return {x,y} 
    })
    const H3 = data.map(({time, H3 },key)=>{
      let x = time;
      let y = H3;
      return {x,y} 
    })
    const H4 = data.map(({time, H4 },key)=>{
      let x = time;
      let y = H4;
      return {x,y} 
    })
    const SM1 = data.map(({time, SM1 },key)=>{
      let x = time;
      let y = SM1;
      return {x,y} 
    })
    const SM2= data.map(({time, SM2 },key)=>{
      let x = time;
      let y = SM2;
      return {x,y} 
    })
    const SM3 = data.map(({time, SM3 },key)=>{
      let x = time;
      let y = SM3;
      return {x,y} 
    })
    const SM4 = data.map(({time, SM4 },key)=>{
      let x = time;
      let y = SM4;
      return {x,y} 
    })
    const PH1 = data.map(({time,PH1 },key)=>{
      let x = time;
      let y = PH1;
      return {x,y} 
    })
    const PH2 = data.map(({time,PH2 },key)=>{
      let x = time;
      let y = PH2;
      return {x,y} 
    })
    const PH3 = data.map(({time,PH3 },key)=>{
      let x = time;
      let y = PH3;
      return {x,y} 
    })
    const PH4 = data.map(({time,PH4 },key)=>{
      let x = time;
      let y = PH4;
      return {x,y} 
    })
    const L1 = data.map(({time,L1 },key)=>{
      let x = time;
      let y = L1;
      return {x,y} 
    })
    const L2 = data.map(({time,L2 },key)=>{
      let x = time;
      let y = L2;
      return {x,y} 
    })
    const L3 = data.map(({time,L3 },key)=>{
      let x = time;
      let y = L3;
      return {x,y} 
    })
    const L4 = data.map(({time,L4 },key)=>{
      let x = time;
      let y = L4;
      return {x,y} 
    })
    
    return (
      <Card className="flex-fill">
        <CardHeader>
          <Row>
            {
                this.state.type === "realtime"
                  ?
                  <Col>
                    <CardTitle tag="h5" className="mb-0 mt-2 ml-1">Biểu đồ đánh giá</CardTitle>
                  </Col>
                  :
                  <Col>
                    <DateTimePicker className=" d-inline" handerSetDueDateKPI={this.handerSetDueDateKPI} />
                  </Col>
              }
              <Col xs="3">
                <Input type="select" value={this.state.type} onChange={this.handleChangeType} >
                  <option value="realtime">Thời gian thực</option>
                  <option value="report">Báo cáo</option>
                </Input>
              </Col>
          </Row>
        <CardTitle tag="h5" className="mb-0 text-center text-success font-weight-bold !important">Biều Đồ Theo Dõi Cảm Biến Theo Thời Gian Thực</CardTitle>
        
        </CardHeader>
        <CardBody>
          <div className="chart">
            <ApexCharts
              options={this.options}
              series={
                type === "℃" ?
                [
                  {
                    name: "T1",
                    data: T1
                  },
                  {
                    name: "T2",
                    data: T2
                  },
                  {
                    name: "T3",
                    data: T3
                  },
                  {
                    name: "T4",
                    data: T4
                  }
                ]
                : type === "%" ?
                [
                  {
                    name: "H1",
                    data: H1
                  },
                  {
                    name: "H2",
                    data: H2
                  },
                  {
                    name: "H3",
                    data: H3
                  },
                  {
                    name: "H4",
                    data: H4
                  }
                ]
                : type === "null" ?
                [
                  {
                    name: "L1",
                    data: L1
                  },
                  {
                    name: "L2",
                    data: L2
                  },
                  {
                    name: "L3",
                    data: L3
                  },
                  {
                    name: "L4",
                    data: L4
                  }
                ]
                : type === "%%" ?
                [
                  {
                    name: "SM1",
                    data: SM1
                  },
                  {
                    name: "SM2",
                    data: SM2
                  },
                  {
                    name: "SM3",
                    data: SM3
                  },
                  {
                    name: "SM4",
                    data: SM4
                  }
                ]
                :
                [
                  {
                    name: "PH1",
                    data: PH1
                  },
                  {
                    name: "PH2",
                    data: PH2
                  },
                  {
                    name: "PH3",
                    data: PH3
                  },
                  {
                    name: "PH4",
                    data: PH4
                  }
                ]
              }
              type="line"
              height="350"
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Chart;
