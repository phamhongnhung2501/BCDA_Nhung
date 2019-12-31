import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row, Col,
  Input
} from "reactstrap";
import './Db.css'
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from 'moment';
import "./Tables.css";
import 'react-day-picker/lib/style.css';
function valueFormatter(cell, row, rowIndex) {
  console.log(row);

}
const Temperatures = [
  {
    dataField: "time",
    text: "Time",
    sort: true,
    classes: (cell, row, rowIndex, colIndex) => {
      if (rowIndex % 2 === 0) return 'demo-row-even';
      return (
        <span>
          <strong style={{ color: 'red' }}>$ {cell} NTD(Sales!!)</strong>
        </span>
      );
    }
  },
  {
    dataField: "T1",
    text: "T1",
    sort: true
  },
  {
    dataField: "T2",
    text: "T2",
    sort: true
  },
  {
    dataField: "T3",
    text: "T3",
    sort: true
  },
  {
    dataField: "T4",
    text: "T4",
    sort: true
  }
];
const Humidites = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "sensor_2.value",
    text: "H1",
    sort: true
  },
  {
    dataField: "H2",
    text: "H2",
    sort: true
  },
  {
    dataField: "H3",
    text: "H3",
    sort: true
  },
  {
    dataField: "H4",
    text: "H4",
    sort: true
  }
];
const SoilMoistures = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "sensor_3.value",
    text: "SM1",
    sort: true
  },
  {
    dataField: "SM2",
    text: "SM2",
    sort: true
  },
  {
    dataField: "SM3",
    text: "SM3",
    sort: true
  },
  {
    dataField: "SM4",
    text: "SM4",
    sort: true
  }
];
const PHs = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "PH1",
    text: "PH1",
    sort: true
  },
  {
    dataField: "PH2",
    text: "PH2",
    sort: true
  },
  {
    dataField: "PH3",
    text: "PH3",
    sort: true
  },
  {
    dataField: "PH4",
    text: "PH4",
    sort: true
  }
];
const Lights = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "L1",
    text: "L1",
    sort: true
  },
  {
    dataField: "L2",
    text: "L2",
    sort: true
  },
  {
    dataField: "L3",
    text: "L3",
    sort: true
  },
  {
    dataField: "L4",
    text: "L4",
    sort: true
  }
];
class MyExportCSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onExport();
  };

  render() {
    return (
      <div>
        <button className="btn btn-secondary mt-2 float-right" onClick={this.handleClick.bind(this)}>
          Export
        </button>
      </div>
    );
  }
};
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "%",
      isLoaded: false,
      data: []
    };
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleChangeType(event) {
    this.setState({
      type: event.target.value
    })
    this.props.handleChangeType(event.target.value);
  }


  render() {
    const data = this.props.data;
    
    return (
      <Card className="Card--width">
        <ToolkitProvider
          keyField="time"
          data={data}
          columns={
            this.state.type === "%"
              ?
              Humidites
              :
              this.state.type === "℃"
                ?
                Temperatures
                :
                this.state.type === "%%"
                  ?
                  SoilMoistures
                  :
                  this.state.type === "null"
                    ?
                    Lights
                    :
                    PHs

          }

          exportCSV
        >
          {props => (
            <div>
              <CardHeader>
                <div classtime="float-right pull-right">
                  <MyExportCSV {...props.csvProps} />
                </div>
                <CardTitle tag="h5">
                  <Row>
                    <Col xs="6" className="mt-1">
                      <Input type="select" onChange={this.handleChangeType} value={this.state.type}>
                        <option value="%"  className="table__text-size">Độ ẩm không khí</option>
                        <option value="" className="table__text-size">PH</option>
                        <option value="℃"  className="table__text-size">Nhiệt độ</option>
                        <option value="%%" className="table__text-size">Độ ẩm đất</option>
                        <option value="null" className="table__text-size">Ánh sáng</option>
                      </Input>
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody className={this.state.type === "%" ? "tables" : ""}>
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  bordered={false}
                  condensed // responsive for table
                  striped
                  pagination={paginationFactory({
                    sizePerPage: 5,
                    sizePerPageList: [5, 10, 15, 20]
                  })}
                  noDataIndication="Table is Empty"
                  hover
                />
              </CardBody>
            </div>
          )}
        </ToolkitProvider>
      </Card>
    );
  }
}


export default Tables;