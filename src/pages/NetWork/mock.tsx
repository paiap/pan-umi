/*
 * @creater: panan
 * @message: mock
 * @since: 2024-08-29 17:00:35
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-09-10 11:24:49
 * @文件相对于项目的路径: /pan-umi/src/pages/NetWork/mock.tsx
 */

export const mockData = {
    "nodes": [
        {
            "type": "normalHost",
            "id": "1",
            "properties": {
                "name": "H100-1"
            },
            "style": {
                "x": -648.53515625,
                "y": -86.3203125,
            },
            "data": {},
            "states": []
        },
        {
            "type": "errorHost",
            "id": "2",
            "properties": {
                "name": "H100-2"
            },
            "style": {
                "zIndex": 454,
                "x": -262.03515625,
                "y": -85.2109375,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "warnningHost",
            "id": "3",
            "properties": {
                "name": "H100-3"
            },
            "style": {
                "zIndex": 450,
                "x": 594.6171875,
                "y": -90.5859375,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalSwitch",
            "id": "5",
            "combo": "compute",
            "properties": {
                "name": "SW1-400G"
            },
            "style": {
                "zIndex": 233,
                "x": -653.36328125,
                "y": -405.41796875,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalSwitch",
            "id": "6",
            "combo": "compute",
            "properties": {
                "name": "SW2-400G"
            },
            "style": {
                "zIndex": 236,
                "x": -197.44921875,
                "y": -405.52734375,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "warnningSwitch",
            "id": "7",
            "combo": "compute",
            "properties": {
                "name": "SW3-400G"
            },
            "style": {
                "zIndex": 235,
                "x": 256.73828125,
                "y": -413.91015625,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "errorSwitch",
            "id": "8",
            "combo": "compute",
            "properties": {
                "name": "SW4-400G"
            },
            "style": {
                "zIndex": 234,
                "x": 666.5234375,
                "y": -410.109375,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalSwitch",
            "id": "9",
            "combo": "storage",
            "properties": {
                "name": "SW5"
            },
            "style": {
                "zIndex": 448,
                "x": 608,
                "y": 269.484375,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalSwitch",
            "id": "10",
            "combo": "paas",
            "properties": {
                "name": "SW6"
            },
            "style": {
                "zIndex": 332,
                "x": -661.6953125,
                "y": 274.8203125,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalSwitch",
            "id": "11",
            "combo": "management",
            "properties": {
                "name": "SW6"
            },
            "style": {
                "zIndex": 449,
                "x": 271.58203125,
                "y": 276.015625,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalSwitch",
            "id": "12",
            "combo": "management",
            "properties": {
                "name": "SW7"
            },
            "style": {
                "zIndex": 446,
                "x": -200.39453125,
                "y": 286.56640625,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalHost",
            "id": "13",
            "properties": {
                "name": "H100-4"
            },
            "style": {
                "zIndex": 451,
                "x": 369.6484375,
                "y": -89.7265625,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalHost",
            "id": "14",
            "properties": {
                "name": "H100-5"
            },
            "style": {
                "zIndex": 460,
                "x": -457.609375,
                "y": -86.625,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalHost",
            "id": "15",
            "properties": {
                "name": "H100-6"
            },
            "style": {
                "zIndex": 453,
                "x": -59.1875,
                "y": -86.0703125,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalHost",
            "id": "16",
            "properties": {
                "name": "H100-7"
            },
            "style": {
                "zIndex": 452,
                "x": 168.109375,
                "y": -86.3125,
                "z": 0
            },
            "data": {},
            "states": []
        },
        {
            "type": "normalHost",
            "id": "17",
            "properties": {
                "name": "H100-8"
            },
            "style": {
                "zIndex": 457,
                "x": 700.078125,
                "y": -85.23046875,
                "z": 0
            },
            "data": {},
            "states": []
        }
    ],
    "edges": [
        {
            "id": "e1",
            "status": "normal",
            "source": "1",
            "target": "5",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "5",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e2",
            "status": "warnning",
            "source": "1",
            "target": "5",
            "properties": {
                "switchName": "SW2-400G",
                "netType": "compute",
                "ifname": "FourHundredGigE1/0/5",
                "actualbandwidth": "400Gb/s",
                "serverName": "csva2ait-k8snode-72-43",
                "hca": "ens112",
                "type": "normal",
                "gpu": "4",
                "server": {
                    "InDiscard": "0",
                    "OutDiscard": "0",
                    "InErrors": "0",
                    "OutErrors": "0",
                    "InDisPS": "0 p/s",
                    "OutDisPS": "0 p/s",
                    "InErrPS": "0 p/s",
                    "OutErrPS": "0 p/s",
                    "portStatus": "UP",
                    "optStatus": "UP",
                    "optRXPower": "2.56dBm",
                    "optTXPower": "2.56dBm",
                    "optTemp": "35℃",
                    "optVol": "35v",
                    "optBias": "8.91mA"
                },
                "switch": {
                    "InBytes": "1024",
                    "OutBytes": "1024",
                    "InPkts": "4096090",
                    "OutPkts": "4096090",
                    "InDiscard": "0",
                    "OutDiscard": "0",
                    "InErrors": "0",
                    "OutErrors": "0",
                    "InBPS": "178Gb/s",
                    "OutBPS": "178Gb/s",
                    "InPPS": "0 p/s",
                    "OutPPS": "0 p/s",
                    "InDisPS": "0 p/s",
                    "OutDisPS": "0 p/s",
                    "InErrPS": "0 p/s",
                    "OutErrPS": "0 p/s",
                    "portStatus": "UP",
                    "optStatus": "UP",
                    "optRXPower": "2.56dBm",
                    "optTXPower": "2.56dBm",
                    "optTemp": "35℃",
                    "optVol": "35v",
                    "optBias": "8.91mA"
                },
                "abnormal": []
            },
            "style": {
                "sourceNode": "1",
                "targetNode": "5",
                "curveOffset": -30
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e3",
            "status": "error",
            "source": "1",
            "target": "5",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "5",
                "curveOffset": 30
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e4",
            "status": "normal",
            "source": "1",
            "target": "6",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "6",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e5",
            "status": "normal",
            "source": "1",
            "target": "6",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "6",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e6",
            "status": "normal",
            "source": "1",
            "target": "7",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "7",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e7",
            "status": "normal",
            "source": "1",
            "target": "7",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "7",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e8",
            "status": "normal",
            "source": "1",
            "target": "8",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "8",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e9",
            "status": "normal",
            "source": "1",
            "target": "8",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "8",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e10",
            "status": "normal",
            "source": "2",
            "target": "5",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "5",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e11",
            "status": "error",
            "source": "2",
            "target": "5",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "5",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e12",
            "status": "normal",
            "source": "2",
            "target": "6",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "6",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e13",
            "status": "normal",
            "source": "2",
            "target": "6",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "6",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e14",
            "status": "normal",
            "source": "2",
            "target": "7",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "7",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e15",
            "status": "normal",
            "source": "2",
            "target": "7",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "7",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e16",
            "status": "normal",
            "source": "2",
            "target": "8",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "8",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e17",
            "status": "normal",
            "source": "2",
            "target": "8",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "8",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e18",
            "status": "normal",
            "source": "3",
            "target": "5",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "5",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e19",
            "status": "error",
            "source": "3",
            "target": "5",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "5",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e20",
            "status": "normal",
            "source": "3",
            "target": "6",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "6",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e21",
            "status": "normal",
            "source": "3",
            "target": "6",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "6",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e22",
            "status": "normal",
            "source": "3",
            "target": "7",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "7",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e23",
            "status": "normal",
            "source": "3",
            "target": "7",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "7",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e24",
            "status": "normal",
            "source": "3",
            "target": "8",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "8",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e25",
            "status": "normal",
            "source": "3",
            "target": "8",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "8",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e26",
            "status": "normal",
            "source": "1",
            "target": "9",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "9",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e27",
            "status": "normal",
            "source": "2",
            "target": "9",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "9",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e28",
            "status": "error",
            "source": "3",
            "target": "9",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "9",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e30",
            "status": "normal",
            "source": "1",
            "target": "10",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "10",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e31",
            "status": "normal",
            "source": "2",
            "target": "10",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "10",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e32",
            "status": "normal",
            "source": "3",
            "target": "10",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "10",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e34",
            "status": "normal",
            "source": "11",
            "target": "12",
            "properties": {},
            "style": {
                "sourceNode": "11",
                "targetNode": "12",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e35",
            "status": "normal",
            "source": "12",
            "target": "11",
            "properties": {},
            "style": {
                "sourceNode": "12",
                "targetNode": "11",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e36",
            "status": "normal",
            "source": "10",
            "target": "11",
            "properties": {},
            "style": {
                "sourceNode": "10",
                "targetNode": "11",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e37",
            "status": "normal",
            "source": "10",
            "target": "12",
            "properties": {},
            "style": {
                "sourceNode": "10",
                "targetNode": "12",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e38",
            "status": "normal",
            "source": "1",
            "target": "11",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "11",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e39",
            "status": "normal",
            "source": "2",
            "target": "11",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "11",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e40",
            "status": "normal",
            "source": "3",
            "target": "11",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "11",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e42",
            "status": "normal",
            "source": "1",
            "target": "12",
            "properties": {},
            "style": {
                "sourceNode": "1",
                "targetNode": "12",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e43",
            "status": "normal",
            "source": "2",
            "target": "12",
            "properties": {},
            "style": {
                "sourceNode": "2",
                "targetNode": "12",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e44",
            "status": "normal",
            "source": "3",
            "target": "12",
            "properties": {},
            "style": {
                "sourceNode": "3",
                "targetNode": "12",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e46",
            "status": "normal",
            "source": "5",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "5",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e47",
            "status": "normal",
            "source": "6",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "6",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e48",
            "status": "normal",
            "source": "7",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "7",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e49",
            "status": "normal",
            "source": "8",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "8",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e50",
            "status": "normal",
            "source": "9",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "9",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e51",
            "status": "normal",
            "source": "10",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "10",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e52",
            "status": "normal",
            "source": "11",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "11",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e53",
            "status": "normal",
            "source": "12",
            "target": "13",
            "properties": {},
            "style": {
                "sourceNode": "12",
                "targetNode": "13",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e55",
            "status": "normal",
            "source": "5",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "5",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e56",
            "status": "normal",
            "source": "6",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "6",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e57",
            "status": "normal",
            "source": "7",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "7",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e58",
            "status": "normal",
            "source": "8",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "8",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e59",
            "status": "normal",
            "source": "9",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "9",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e60",
            "status": "normal",
            "source": "10",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "10",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e61",
            "status": "normal",
            "source": "11",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "11",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e62",
            "status": "normal",
            "source": "12",
            "target": "14",
            "properties": {},
            "style": {
                "sourceNode": "12",
                "targetNode": "14",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e64",
            "status": "normal",
            "source": "5",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "5",
                "targetNode": "15",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e65",
            "status": "normal",
            "source": "6",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "6",
                "targetNode": "15",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e66",
            "status": "normal",
            "source": "7",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "7",
                "targetNode": "15",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e67",
            "status": "normal",
            "source": "8",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "8",
                "targetNode": "15",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e68",
            "status": "normal",
            "source": "9",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "9",
                "targetNode": "15",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e69",
            "status": "normal",
            "source": "10",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "10",
                "targetNode": "15",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e70",
            "status": "normal",
            "source": "11",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "11",
                "targetNode": "15",
                "curveOffset": 15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e71",
            "status": "normal",
            "source": "11",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "11",
                "targetNode": "15",
                "curveOffset": -15
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e73",
            "status": "normal",
            "source": "12",
            "target": "15",
            "properties": {},
            "style": {
                "sourceNode": "12",
                "targetNode": "15",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e75",
            "status": "normal",
            "source": "5",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "5",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e76",
            "status": "normal",
            "source": "6",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "6",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e77",
            "status": "normal",
            "source": "7",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "7",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e78",
            "status": "normal",
            "source": "8",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "8",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e79",
            "status": "normal",
            "source": "9",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "9",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e80",
            "status": "normal",
            "source": "10",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "10",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e81",
            "status": "normal",
            "source": "11",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "11",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        },
        {
            "id": "e82",
            "status": "normal",
            "source": "12",
            "target": "16",
            "properties": {},
            "style": {
                "sourceNode": "12",
                "targetNode": "16",
                "curveOffset": 0
            },
            "data": {},
            "type": "quadratic",
            "states": []
        }
    ],
    "combos": [
        {
            "id": "storage",
            "data": {
                "label": "存储网络"
            },
            "style": {
                "x": 608.5,
                "y": 278.484375
            },
            "states": [
                "active"
            ]
        },
        {
            "id": "paas",
            "data": {
                "label": "数据/PAAS网络"
            },
            "style": {
                "x": -661.1953125,
                "y": 283.8203125
            },
            "states": []
        },
        {
            "id": "management",
            "data": {
                "label": "带外管理网络"
            },
            "style": {
                "x": 36.5126953125,
                "y": 290.291015625,
                "zIndex": 351,
                "z": 0
            },
            "states": []
        },
        {
            "id": "compute",
            "data": {
                "label": "计算机网络"
            },
            "style": {
                "x": 8.0556640625,
                "y": -400.6640625,
                "zIndex": 194,
                "z": 0
            },
            "states": []
        }
    ]
}


export const mock = {
    "nodes": [
        {
            "type": "normalHost",
            "id": "csva2ait-k8snode-72-43",
            "properties": {
                "name": "csva2ait-k8snode-72-43"
            },
            "style": {}
        },
        {
            "type": "normalSwitch",
            "id": "SW1-400G",
            "properties": {
                "name": "SW1-400G"
            },
            "style": {
                "x": -648.53515625,
                "y": -86.3203125
            },
            "combo": "compute"
        },
        {
            "type": "normalSwitch",
            "id": "SW2-400G",
            "properties": {
                "name": "SW2-400G"
            },
            "style": {
                "x": 648.53515625,
                "y": 86.3203125
            },
            "combo": "compute"
        },
        {
            "type": "normalHost",
            "id": "csva2ait-k8snode-72-44",
            "properties": {
                "name": "csva2ait-k8snode-72-44"
            },
            "style": {}
        },
        {
            "type": "normalSwitch",
            "id": "SW3-10G",
            "properties": {
                "name": "SW3-10G"
            },
            "style": {},
            "combo": "paas"
        }
    ],
    "edges": [
        {
            "id": "FourHundredGigE1/0/5:SW1-400G:csva2ait-k8snode-72-43:ens108",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu0",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens108"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/5"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/6:SW1-400G:csva2ait-k8snode-72-43:ens109",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu1",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens109"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/6"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/7:SW1-400G:csva2ait-k8snode-72-43:ens110",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu2",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens110"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/7"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/8:SW1-400G:csva2ait-k8snode-72-43:ens111",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu3",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens111"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/8"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/5:SW2-400G:csva2ait-k8snode-72-43:ens112",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu4",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens112"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/5"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/6:SW2-400G:csva2ait-k8snode-72-43:ens113",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu5",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens113"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/6"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/7:SW2-400G:csva2ait-k8snode-72-43:ens114",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu6",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens114"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/7"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/8:SW2-400G:csva2ait-k8snode-72-43:ens115",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu7",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens115"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/8"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/18:SW2-400G:csva2ait-k8snode-72-43:ens12",
            "status": "normal",
            "source": "csva2ait-k8snode-72-43",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "-",
                "netType": "storage",
                "source": {
                    "name": "csva2ait-k8snode-72-43",
                    "portName": "ens12"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/18"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/1:SW1-400G:csva2ait-k8snode-72-44:ens108",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu0",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens108"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/1"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/2:SW1-400G:csva2ait-k8snode-72-44:ens109",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu1",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens109"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/2"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/3:SW1-400G:csva2ait-k8snode-72-44:ens110",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu2",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens110"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/3"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/4:SW1-400G:csva2ait-k8snode-72-44:ens111",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW1-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu3",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens111"
                },
                "target": {
                    "name": "SW1-400G",
                    "portName": "FourHundredGigE1/0/4"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/1:SW2-400G:csva2ait-k8snode-72-44:ens112",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu4",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens112"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/1"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/2:SW2-400G:csva2ait-k8snode-72-44:ens113",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu5",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens113"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/2"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/3:SW2-400G:csva2ait-k8snode-72-44:ens114",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu6",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens114"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/3"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/4:SW2-400G:csva2ait-k8snode-72-44:ens115",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "gpu7",
                "netType": "compute",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens115"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/4"
                }
            }
        },
        {
            "id": "FourHundredGigE1/0/17:SW2-400G:csva2ait-k8snode-72-44:ens12",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW2-400G",
            "bandwidth": "",
            "properties": {
                "gpu": "-",
                "netType": "storage",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens12"
                },
                "target": {
                    "name": "SW2-400G",
                    "portName": "FourHundredGigE1/0/17"
                }
            }
        },
        {
            "id": "SW3-10G:Ten-GigabitEthernet1/0/1:csva2ait-k8snode-72-44:ens20f0",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW3-10G",
            "bandwidth": "",
            "properties": {
                "gpu": "-",
                "netType": "paas",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens20f0"
                },
                "target": {
                    "name": "SW3-10G",
                    "portName": "Ten-GigabitEthernet1/0/1"
                }
            }
        },
        {
            "id": "SW3-10G:Ten-GigabitEthernet1/0/2:csva2ait-k8snode-72-44:ens20f1",
            "status": "normal",
            "source": "csva2ait-k8snode-72-44",
            "target": "SW3-10G",
            "bandwidth": "",
            "properties": {
                "gpu": "-",
                "netType": "paas",
                "source": {
                    "name": "csva2ait-k8snode-72-44",
                    "portName": "ens20f1"
                },
                "target": {
                    "name": "SW3-10G",
                    "portName": "Ten-GigabitEthernet1/0/2"
                }
            }
        }
    ],
    "combos": [
        {
            "id": "compute",
            "data": {
                "label": "compute"
            }
        },
        {
            "id": "storage",
            "data": {
                "label": "storage"
            }
        },
        {
            "id": "paas",
            "data": {
                "label": "paas"
            }
        },
        {
            "id": "out-band",
            "data": {
                "label": "out-band"
            }
        }
    ]
}