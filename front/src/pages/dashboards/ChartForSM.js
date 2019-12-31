import React from "react";

import ApexCharts from "react-apexcharts";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
} from "reactstrap";



class ChartForSM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: []
        };

        this.options = {
            stroke: {
                width: 1
            },
            xaxis: {
                type: "datetime"
            },
            colors: ["#0cc2aa", "#fcc100", "#f44455", "#f44455", "#5fc27e", "#5b7dff"]
        };

    }

    componentDidMount() {
        // Trigger resize manually so chart doesn't fall off canvas
        window.dispatchEvent(new Event("resize"));
    }

    render() {
        const data = this.props.data;
        console.log(data);

        // const type = this.props.type;
        const SM1 = data.map(({ time, SM1 }, key) => {
            let x = time;
            let y = SM1;
            return { x, y }
        })
        const SM2 = data.map(({ time, SM2 }, key) => {
            let x = time;
            let y = SM2;
            return { x, y }
        })
        const SM3 = data.map(({ time, SM3 }, key) => {
            let x = time;
            let y = SM3;
            return { x, y }
        })
        const SM4 = data.map(({ time, SM4 }, key) => {
            let x = time;
            let y = SM4;
            return { x, y }
        })
        const SM5 = data.map(({ time, SM5 }, key) => {
            let x = time;
            let y = SM5;
            return { x, y }
        })
        const SM6 = data.map(({ time, SM6 }, key) => {
            let x = time;
            let y = SM6;
            return { x, y }
        })
        const SM7 = data.map(({ time, SM7 }, key) => {
            let x = time;
            let y = SM7;
            return { x, y }
        })
        const SM8 = data.map(({ time, SM8 }, key) => {
            let x = time;
            let y = SM8;
            return { x, y }
        })
        const SM9 = data.map(({ time, SM9}, key) => {
            let x = time;
            let y = SM9;
            return { x, y }
        })
        const SM10 = data.map(({ time, SM10 }, key) => {
            let x = time;
            let y = SM10;
            return { x, y }
        })
        const SM11 = data.map(({ time, SM11 }, key) => {
            let x = time;
            let y = SM11 ;
            return { x, y }
        })
        const SM12 = data.map(({ time, SM12 }, key) => {
            let x = time;
            let y = SM12;
            return { x, y }
        })
        const SM13 = data.map(({ time, SM13 }, key) => {
            let x = time;
            let y = SM13;
            return { x, y }
        })
        const SM14 = data.map(({ time, SM14}, key) => {
            let x = time;
            let y = SM14;
            return { x, y }
        })
        const SM15 = data.map(({ time, SM15 }, key) => {
            let x = time;
            let y = SM15;
            return { x, y }
        })
        const SM16 = data.map(({ time, SM16 }, key) => {
            let x = time;
            let y = SM16;
            return { x, y }
        })
        const SM17 = data.map(({ time, SM17 }, key) => {
            let x = time;
            let y = SM17;
            return { x, y }
        })
        const SM18 = data.map(({ time, SM18}, key) => {
            let x = time;
            let y = SM18;
            return { x, y }
        })
        const SM19 = data.map(({ time, SM19 }, key) => {
            let x = time;
            let y = SM19;
            return { x, y }
        })
        const SM20 = data.map(({ time, SM20 }, key) => {
            let x = time;
            let y = SM20;
            return { x, y }
        })
        const SM21 = data.map(({ time, SM21 }, key) => {
            let x = time;
            let y = SM21;
            return { x, y }
        })
        const SM22 = data.map(({ time, SM22 }, key) => {
            let x = time;
            let y = SM22;
            return { x, y }
        })
        const SM23 = data.map(({ time, SM23 }, key) => {
            let x = time;
            let y = SM23;
            return { x, y }
        })
        const SM24 = data.map(({ time, SM24 }, key) => {
            let x = time;
            let y = SM24;
            return { x, y }
        })
        const SM25 = data.map(({ time, SM25 }, key) => {
            let x = time;
            let y = SM25;
            return { x, y }
        })

        return (
            <Card className="flex-fill">
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0 text-center text-success font-weight-bold !important">THE CHART TRACKS THE SENSOR VALUES IN REAL TIME</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart">
                        <ApexCharts
                            options={this.options}
                            series={
                              
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
                                                    },
                                    {
                                        name: "SM5",
                                        data: SM5
                                    },
                                    {
                                        name: "SM6",
                                        data: SM6
                                    },
                                    {
                                        name: "SM7",
                                        data: SM7
                                    },
                                    {
                                        name: "SM8",
                                        data: SM8
                                    },
                                    {
                                        name: "SM9",
                                        data: SM9
                                    },
                                    {
                                        name: "SM10",
                                        data: SM10
                                    },
                                    {
                                        name: "SM11",
                                        data: SM11
                                    },
                                    {
                                        name: "SM12",
                                        data: SM12
                                    },
                                    {
                                        name: "SM13",
                                        data: SM13
                                    },
                                    {
                                        name: "SM14",
                                        data: SM14
                                    },
                                    {
                                        name: "SM15",
                                        data: SM15
                                    },
                                    {
                                        name: "SM16",
                                        data: SM16
                                    },
                                    {
                                        name: "SM17",
                                        data: SM17
                                    },
                                    {
                                        name: "SM18",
                                        data: SM18
                                    },
                                    {
                                        name: "SM19",
                                        data: SM19
                                    },
                                    {
                                        name: "SM20",
                                        data: SM20
                                    },
                                    {
                                        name: "SM21",
                                        data: SM21
                                    },
                                    {
                                        name: "SM22",
                                        data: SM22
                                    },
                                    {
                                        name: "SM23",
                                        data: SM23
                                    },
                                    {
                                        name: "SM24",
                                        data: SM24
                                    },
                                    {
                                        name: "SM25",
                                        data: SM25
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

export default ChartForSM;
