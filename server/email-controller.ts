export {};
console.clear();
const nodemailer = require('nodemailer');
const QuickChart = require('quickchart-js');
const dotenv     = require('dotenv').config();

exports.sendMessage = (req: any, res: any) => {
  const logoLink = 'https://i.ibb.co/vzXSjkW/Simplified-HR-Logo-Final.png';
  const surveyDate = req.body.surveyDate;
  
  // Hires & Fires
  let totalHiresThisWeek = req.body.totalHiresThisWeek;
  let totalHiresThisMonth = req.body.totalHiresThisMonth;
  let totalTerminationsThisWeek = req.body.totalTerminationsThisWeek;
  let totalTerminationsThisMonth = req.body.totalTerminationsThisMonth;
  
  // const req.body.testSurvey = [
  //   {
  //     date: "07/01",
  //     sent: 20,
  //     responses: 13,
  //     categoryOneAvgScore: 4.5,
  //     categoryTwoAvgScore: 4.5,
  //     categoryThreeAvgScore: 4.5,
  //     categoryFourAvgScore: 4.5,
  //     categoryFiveAvgScore: 4,
  //   },
  //   {
  //     date: "07/02",
  //     sent: 10,
  //     responses: 5,
  //     categoryOneAvgScore: 4.5,
  //     categoryTwoAvgScore: 4.5,
  //     categoryThreeAvgScore: 4.5,
  //     categoryFourAvgScore: 4.5,
  //     categoryFiveAvgScore: 4,
  //   },
  //   {
  //     date: "07/03",
  //     sent: 30,
  //     responses: 11,
  //     categoryOneAvgScore: 4.5,
  //     categoryTwoAvgScore: 4.5,
  //     categoryThreeAvgScore: 4.5,
  //     categoryFourAvgScore: 4.5,
  //     categoryFiveAvgScore: 4,
  //   },
  //   {
  //     date: "07/04",
  //     sent: 15,
  //     responses: 10,
  //     categoryOneAvgScore: 4.5,
  //     categoryTwoAvgScore: 4.5,
  //     categoryThreeAvgScore: 4.5,
  //     categoryFourAvgScore: 4.5,
  //     categoryFiveAvgScore: 4,
  //   },
  //   {
  //     date: "07/05",
  //     sent: 25,
  //     responses: 20,
  //     categoryOneAvgScore: 4.5,
  //     categoryTwoAvgScore: 4.5,
  //     categoryThreeAvgScore: 4.5,
  //     categoryFourAvgScore: 4.5,
  //     categoryFiveAvgScore: 4,
  //   },
  // ];
  
  // Calculate the total avgScore for categoryOne
  // Survey Responses
  
  
  let totalSent = 0;
  let totalResponses = 0;
  let responseRate = '';
  function calculateSurveyResponses() {
    // Calculate the total for each property separately
    for (let i = 0; i < 5; i++) {
      totalSent += req.body.testSurvey[i].sent;
      totalResponses += req.body.testSurvey[i].responses;
    }
    // Calculate to percentage
    responseRate = ((totalResponses / totalSent) * 100).toString();
  
    // console.log(req.body.testSurvey);
    console.log("Total Sent:", totalSent);
    console.log("Total Responses:", totalResponses);
    console.log("Response Rate: ", responseRate + "%", "\n");
  }
  
  // Score Category
  let avgScoreCategoryOne = 0;
  let avgScoreCategoryTwo = 0;
  let avgScoreCategoryThree = 0;
  let avgScoreCategoryFour = 0;
  let avgScoreCategoryFive = 0;
  
  let avgScoreCategoryOneLastWeek = req.body.avgScoreCategoryOneLastWeek;
  let avgScoreCategoryTwoLastWeek = req.body.avgScoreCategoryTwoLastWeek;
  let avgScoreCategoryThreeLastWeek = req.body.avgScoreCategoryThreeLastWeek;
  let avgScoreCategoryFourLastWeek = req.body.avgScoreCategoryFourLastWeek;
  let avgScoreCategoryFiveLastWeek = req.body.avgScoreCategoryFiveLastWeek;
  function calculateAvgScores() {
    // 
    for (const survey of req.body.testSurvey) {
      avgScoreCategoryOne += (survey.categoryOneAvgScore) / 5;
      avgScoreCategoryTwo += (survey.categoryTwoAvgScore) / 5;
      avgScoreCategoryThree += (survey.categoryThreeAvgScore) / 5;
      avgScoreCategoryFour += (survey.categoryFourAvgScore) / 5;
      avgScoreCategoryFive += (survey.categoryFiveAvgScore) / 5;
    }
  }
  
  // Comparing grom the previous week
  let catOneChange = 0;
  let catTwoChange = 0;
  let catThreeChange = 0;
  let catFourChange = 0;
  let catFiveChange = 0;
  function calculatePercentageChanges() {
    catOneChange = (((avgScoreCategoryOneLastWeek - avgScoreCategoryOne) / avgScoreCategoryOne) * 100);
    catTwoChange = (((avgScoreCategoryTwoLastWeek - avgScoreCategoryTwo) / avgScoreCategoryTwo) * 100)
    catThreeChange = (((avgScoreCategoryThreeLastWeek - avgScoreCategoryThree) / avgScoreCategoryThree) * 100)
    catFourChange = (((avgScoreCategoryFourLastWeek - avgScoreCategoryFour) / avgScoreCategoryFour) * 100)
    catFiveChange = (((avgScoreCategoryFiveLastWeek - avgScoreCategoryFive) / avgScoreCategoryFive) * 100)
  
    console.log("Total avgScore for categoryOne (Autonomy):", avgScoreCategoryOne);
    console.log("Compared to last week", catOneChange)
    console.log("Total avgScore for Last Week (Autonomy):", avgScoreCategoryOneLastWeek, "\n");
  
    console.log("Total avgScore for categoryTwo (Impact):", avgScoreCategoryTwo);
    console.log("Compared to last week", catTwoChange)
    console.log("Total avgScore for Last Week (Impact):", avgScoreCategoryTwoLastWeek, "\n");
  
    console.log("Total avgScore for categoryThree (Growth):", avgScoreCategoryThree);
    console.log("Compared to last week", catThreeChange)
    console.log("Total avgScore for Last Week (Growth):", avgScoreCategoryThreeLastWeek, "\n");
  
    console.log("Total avgScore for categoryFour (Connection):", avgScoreCategoryFour);
    console.log("Compared to last week", catFourChange)
    console.log("Total avgScore for Last Week (Connection):", avgScoreCategoryFourLastWeek, "\n");
  
    console.log("Total avgScore for categoryFive (Growth):", avgScoreCategoryFive);
    console.log("Compared to last week", catFiveChange)
    console.log("Total avgScore for Last Week (Growth):", avgScoreCategoryFiveLastWeek, "\n");
  }

  let surveyChart = new QuickChart();
  function createSurveyChart() {
  
    surveyChart.setWidth(500)
    surveyChart.setHeight(300);
    surveyChart.setVersion('2');
  
    surveyChart.setConfig({
    "type": "horizontalBar",
    "data": {
      "datasets": [
        {
          "label": "Sent",
          "backgroundColor": "#F4940C",
          "borderColor": "rgb(255, 99, 132)",
          "borderWidth": 0,
          "data": [
            req.body.testSurvey[0].sent,
            req.body.testSurvey[1].sent,
            req.body.testSurvey[2].sent,
            req.body.testSurvey[3].sent,
            req.body.testSurvey[4].sent,
          ],
          "fill": false,
          "spanGaps": false,
          "lineTension": 0.4,
          "pointRadius": 3,
          "pointHoverRadius": 3,
          "pointStyle": "circle",
          "borderDash": [
            0,
            0
          ],
          "barPercentage": 0.5,
          "categoryPercentage": 0.8,
          "type": "horizontalBar",
          "hidden": false
        },
        {
          "label": "Responses",
          "backgroundColor": "#5D9690",
          "borderColor": "rgb(54, 162, 235)",
          "data": [
            req.body.testSurvey[0].responses,
            req.body.testSurvey[1].responses,
            req.body.testSurvey[2].responses,
            req.body.testSurvey[3].responses,
            req.body.testSurvey[4].responses,
          ],
          "fill": false,
          "spanGaps": false,
          "lineTension": 0.4,
          "pointRadius": 3,
          "pointHoverRadius": 3,
          "pointStyle": "circle",
          "borderDash": [
            0,
            0
          ],
          "barPercentage": 0.5,
          "categoryPercentage": 0.8,
          "type": "horizontalBar",
          "borderWidth": 0,
          "hidden": false
        }
      ],
      "labels": [
        req.body.testSurvey[0].date,
        req.body.testSurvey[1].date,
        req.body.testSurvey[2].date,
        req.body.testSurvey[3].date,
        req.body.testSurvey[4].date
      ]
    },
    "options": {
      "title": {
        "display": false,
        "text": "Chart.js Horizontal Bar Chart",
        "position": "top",
        "fontSize": 12,
        "fontFamily": "sans-serif",
        "fontColor": "#666666",
        "fontStyle": "bold",
        "padding": 10,
        "lineHeight": 1.2
      },
      "layout": {
        "padding": {},
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0
      },
      "legend": {
        "position": "right",
        "display": false,
        "align": "center",
        "fullWidth": true,
        "reverse": false,
        "labels": {
          "fontSize": 15,
          "fontFamily": "sans-serif",
          "fontColor": "#666666",
          "fontStyle": "normal",
          "padding": 10
        }
      },
      "scales": {
        "xAxes": [
          {
            "id": "X1",
            "display": false,
            "position": "bottom",
            "type": "linear",
            "stacked": false,
            "offset": true,
            "time": {
              "unit": false,
              "stepSize": 1,
              "displayFormats": {
                "millisecond": "h:mm:ss.SSS a",
                "second": "h:mm:ss a",
                "minute": "h:mm a",
                "hour": "hA",
                "day": "MMM D",
                "week": "ll",
                "month": "MMM YYYY",
                "quarter": "[Q]Q - YYYY",
                "year": "YYYY"
              }
            },
            "distribution": "linear",
            "gridLines": {
              "display": false,
              "color": "rgba(0, 0, 0, 0.1)",
              "borderDash": [
                0,
                0
              ],
              "lineWidth": 0,
              "drawBorder": true,
              "drawOnChartArea": true,
              "drawTicks": true,
              "tickMarkLength": 10,
              "zeroLineWidth": 1,
              "zeroLineColor": "rgba(0, 0, 0, 0.25)",
              "zeroLineBorderDash": [
                0,
                0
              ]
            },
            "angleLines": {
              "display": true,
              "color": "rgba(0, 0, 0, 0.1)",
              "borderDash": [
                0,
                0
              ],
              "lineWidth": 1
            },
            "pointLabels": {
              "display": true,
              "fontColor": "#666",
              "fontSize": 10,
              "fontStyle": "normal"
            },
            "ticks": {
              "display": true,
              "fontSize": 12,
              "fontFamily": "sans-serif",
              "fontColor": "#666666",
              "fontStyle": "normal",
              "padding": 0,
              "stepSize": null,
              "minRotation": 0,
              "maxRotation": 50,
              "mirror": false,
              "reverse": false
            },
            "scaleLabel": {
              "display": false,
              "labelString": "Axis label",
              "lineHeight": 1.2,
              "fontColor": "#666666",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "padding": 4
            }
          }
        ],
        "yAxes": [
          {
            "id": "Y1",
            "display": true,
            "position": "left",
            "type": "category",
            "stacked": false,
            "offset": true,
            "time": {
              "unit": false,
              "stepSize": 1,
              "displayFormats": {
                "millisecond": "h:mm:ss.SSS a",
                "second": "h:mm:ss a",
                "minute": "h:mm a",
                "hour": "hA",
                "day": "MMM D",
                "week": "ll",
                "month": "MMM YYYY",
                "quarter": "[Q]Q - YYYY",
                "year": "YYYY"
              }
            },
            "distribution": "linear",
            "gridLines": {
              "display": false,
              "color": "rgba(0, 0, 0, 0.1)",
              "borderDash": [
                0,
                0
              ],
              "lineWidth": 1,
              "drawBorder": false,
              "drawOnChartArea": true,
              "drawTicks": true,
              "tickMarkLength": 29,
              "zeroLineWidth": 0,
              "zeroLineColor": "rgba(0, 0, 0, 0.25)",
              "zeroLineBorderDash": [
                0,
                0
              ]
            },
            "angleLines": {
              "display": true,
              "color": "rgba(0, 0, 0, 0.1)",
              "borderDash": [
                0,
                0
              ],
              "lineWidth": 1
            },
            "pointLabels": {
              "display": true,
              "fontColor": "#666",
              "fontSize": 10,
              "fontStyle": "normal"
            },
            "ticks": {
              "display": true,
              "fontSize": 14,
              "fontFamily": "sans-serif",
              "fontColor": "#666666",
              "fontStyle": "bold",
              "padding": 0,
              "stepSize": null,
              "minRotation": 0,
              "maxRotation": 50,
              "mirror": false,
              "reverse": false
            },
            "scaleLabel": {
              "display": false,
              "labelString": "Axis label",
              "lineHeight": 1.2,
              "fontColor": "#666666",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "padding": 4
            }
          }
        ]
      },
      "plugins": {
        "datalabels": {
          "display": true,
          "align": "end",
          "anchor": "end",
          "backgroundColor": "#fff",
          "borderColor": "#ddd",
          "borderRadius": 96,
          "borderWidth": 1,
          "padding": 8,
          "color": "#777",
          "font": {
            "family": "sans-serif",
            "size": 10,
            "style": "bold"
          }
        },
        "datalabelsZAxis": {
          "enabled": false
        },
        "googleSheets": {},
        "airtable": {},
        "tickFormat": ""
      },
      "elements": {
        "rectangle": {
          "borderWidth": 2
        }
      },
      "responsive": true,
      "cutoutPercentage": 50,
      "rotation": -1.5707963267948966,
      "circumference": 6.283185307179586,
      "startAngle": -1.5707963267948966
    }
    });

  }

  let categoryChart = new QuickChart();
  function createCategoryChart() {
            
    categoryChart.setWidth(500)
    categoryChart.setHeight(300);
    categoryChart.setVersion('2');
      
    categoryChart.setConfig({
  "type": "line",
  "data": {
    "datasets": [
      {
        "fill": false,
        "spanGaps": false,
        "lineTension": 0,
        "pointRadius": 3,
        "pointHoverRadius": 3,
        "pointStyle": "circle",
        "borderDash": [
          0,
          0
        ],
        "barPercentage": 0.9,
        "categoryPercentage": 0.8,
        "data": [
          req.body.testSurvey[0].categoryOneAvgScore,
          req.body.testSurvey[1].categoryOneAvgScore,
          req.body.testSurvey[2].categoryOneAvgScore,
          req.body.testSurvey[3].categoryOneAvgScore,
          req.body.testSurvey[4].categoryOneAvgScore
        ],
        "type": "line",
        "label": "Autonomy",
        "borderColor": "#AF357C",
        "backgroundColor": "#4E79A733",
        "borderWidth": 5,
        "hidden": false
      },
      {
        "fill": false,
        "spanGaps": false,
        "lineTension": 0,
        "pointRadius": 3,
        "pointHoverRadius": 3,
        "pointStyle": "circle",
        "borderDash": [
          0,
          0
        ],
        "barPercentage": 0.9,
        "categoryPercentage": 0.8,
        "data": [
          req.body.testSurvey[0].categoryTwoAvgScore,
          req.body.testSurvey[1].categoryTwoAvgScore,
          req.body.testSurvey[2].categoryTwoAvgScore,
          req.body.testSurvey[3].categoryTwoAvgScore,
          req.body.testSurvey[4].categoryTwoAvgScore
        ],
        "type": "line",
        "label": "Impact",
        "borderColor": "#344A5C",
        "backgroundColor": "#F28E2B33",
        "borderWidth": 5,
        "hidden": false
      },
      {
        "fill": false,
        "spanGaps": false,
        "lineTension": 0,
        "pointRadius": 3,
        "pointHoverRadius": 3,
        "pointStyle": "circle",
        "borderDash": [
          0,
          0
        ],
        "barPercentage": 0.9,
        "categoryPercentage": 0.8,
        "data": [
          req.body.testSurvey[0].categoryThreeAvgScore,
          req.body.testSurvey[1].categoryThreeAvgScore,
          req.body.testSurvey[2].categoryThreeAvgScore,
          req.body.testSurvey[3].categoryThreeAvgScore,
          req.body.testSurvey[4].categoryThreeAvgScore
        ],
        "type": "line",
        "label": "Growth",
        "borderColor": "#5D9690",
        "backgroundColor": "#E1575933",
        "borderWidth": 5,
        "hidden": false
      },
      {
        "fill": false,
        "spanGaps": false,
        "lineTension": 0,
        "pointRadius": 3,
        "pointHoverRadius": 3,
        "pointStyle": "circle",
        "borderDash": [
          0,
          0
        ],
        "barPercentage": 0.9,
        "categoryPercentage": 0.8,
        "data": [
          req.body.testSurvey[0].categoryFourAvgScore,
          req.body.testSurvey[1].categoryFourAvgScore,
          req.body.testSurvey[2].categoryFourAvgScore,
          req.body.testSurvey[3].categoryFourAvgScore,
          req.body.testSurvey[4].categoryFourAvgScore
        ],
        "type": "line",
        "label": "Connection",
        "borderColor": "#8D9B23",
        "backgroundColor": "#76B7B233",
        "borderWidth": 5,
        "hidden": false
      },
      {
        "fill": false,
        "spanGaps": false,
        "lineTension": 0,
        "pointRadius": 3,
        "pointHoverRadius": 3,
        "pointStyle": "circle",
        "borderDash": [
          0,
          0
        ],
        "barPercentage": 0.9,
        "categoryPercentage": 0.8,
        "data": [
          req.body.testSurvey[0].categoryFiveAvgScore,
          req.body.testSurvey[1].categoryFiveAvgScore,
          req.body.testSurvey[2].categoryFiveAvgScore,
          req.body.testSurvey[3].categoryFiveAvgScore,
          req.body.testSurvey[4].categoryFiveAvgScore
        ],
        "type": "line",
        "label": "Growth",
        "borderColor": "#F4940C",
        "backgroundColor": "#59A14F33",
        "borderWidth": 5,
        "hidden": false
      }
    ],
    "labels": [
      req.body.testSurvey[0].date,
      req.body.testSurvey[1].date,
      req.body.testSurvey[2].date,
      req.body.testSurvey[3].date,
      req.body.testSurvey[4].date
    ]
  },
  "options": {
    "title": {
      "display": false,
      "position": "top",
      "fontSize": 12,
      "fontFamily": "sans-serif",
      "fontColor": "#666666",
      "fontStyle": "bold",
      "padding": 10,
      "lineHeight": 1.2,
      "text": "Chart title"
    },
    "layout": {
      "padding": {},
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0
    },
    "legend": {
      "display": false,
      "position": "top",
      "align": "center",
      "fullWidth": false,
      "reverse": false,
      "labels": {
        "fontSize": 12,
        "fontFamily": "sans-serif",
        "fontColor": "#666666",
        "fontStyle": "normal",
        "padding": 10
      }
    },
    "scales": {
      "xAxes": [
        {
          "id": "X1",
          "display": true,
          "position": "bottom",
          "type": "category",
          "stacked": false,
          "offset": true,
          "time": {
            "unit": false,
            "stepSize": 1,
            "displayFormats": {
              "millisecond": "h:mm:ss.SSS a",
              "second": "h:mm:ss a",
              "minute": "h:mm a",
              "hour": "hA",
              "day": "MMM D",
              "week": "ll",
              "month": "MMM YYYY",
              "quarter": "[Q]Q - YYYY",
              "year": "YYYY"
            }
          },
          "distribution": "linear",
          "gridLines": {
            "display": false,
            "color": "rgba(0, 0, 0, 0.1)",
            "borderDash": [
              0,
              0
            ],
            "lineWidth": 1,
            "drawBorder": true,
            "drawOnChartArea": true,
            "drawTicks": true,
            "tickMarkLength": 10,
            "zeroLineWidth": 1,
            "zeroLineColor": "rgba(0, 0, 0, 0.25)",
            "zeroLineBorderDash": [
              0,
              0
            ]
          },
          "angleLines": {
            "display": true,
            "color": "rgba(0, 0, 0, 0.1)",
            "borderDash": [
              0,
              0
            ],
            "lineWidth": 1
          },
          "pointLabels": {
            "display": true,
            "fontColor": "#666",
            "fontSize": 10,
            "fontStyle": "normal"
          },
          "ticks": {
            "display": true,
            "fontSize": 14,
            "fontFamily": "sans-serif",
            "fontColor": "#666666",
            "fontStyle": "bold",
            "padding": 0,
            "stepSize": null,
            "minRotation": 0,
            "maxRotation": 50,
            "mirror": false,
            "reverse": false
          },
          "scaleLabel": {
            "display": false,
            "labelString": "Axis label",
            "lineHeight": 1.2,
            "fontColor": "#666666",
            "fontFamily": "sans-serif",
            "fontSize": 12,
            "fontStyle": "normal",
            "padding": 4
          }
        }
      ],
      "yAxes": [
        {
          "id": "Y1",
          "display": true,
          "position": "left",
          "type": "linear",
          "stacked": false,
          "offset": true,
          "time": {
            "unit": false,
            "stepSize": 1,
            "displayFormats": {
              "millisecond": "h:mm:ss.SSS a",
              "second": "h:mm:ss a",
              "minute": "h:mm a",
              "hour": "hA",
              "day": "MMM D",
              "week": "ll",
              "month": "MMM YYYY",
              "quarter": "[Q]Q - YYYY",
              "year": "YYYY"
            }
          },
          "distribution": "linear",
          "gridLines": {
            "display": false,
            "color": "rgba(0, 0, 0, 0.1)",
            "borderDash": [
              0,
              0
            ],
            "lineWidth": 1,
            "drawBorder": true,
            "drawOnChartArea": true,
            "drawTicks": true,
            "tickMarkLength": 10,
            "zeroLineWidth": 1,
            "zeroLineColor": "rgba(0, 0, 0, 0.25)",
            "zeroLineBorderDash": [
              0,
              0
            ]
          },
          "angleLines": {
            "display": true,
            "color": "rgba(0, 0, 0, 0.1)",
            "borderDash": [
              0,
              0
            ],
            "lineWidth": 1
          },
          "pointLabels": {
            "display": true,
            "fontColor": "#666",
            "fontSize": 10,
            "fontStyle": "normal"
          },
          "ticks": {
            "display": true,
            "fontSize": 20,
            "fontFamily": "sans-serif",
            "fontColor": "#666666",
            "fontStyle": "bold",
            "padding": 0,
            "stepSize": 1,
            "minRotation": 0,
            "maxRotation": 50,
            "mirror": false,
            "reverse": false,
            "min": 0,
            "max": 5
          },
          "scaleLabel": {
            "display": false,
            "labelString": "Axis label",
            "lineHeight": 1.2,
            "fontColor": "#666666",
            "fontFamily": "sans-serif",
            "fontSize": 12,
            "fontStyle": "normal",
            "padding": 4
          }
        }
      ]
    },
    "plugins": {
      "datalabels": {
        "display": false,
        "align": "center",
        "anchor": "center",
        "backgroundColor": "#eee",
        "borderColor": "#ddd",
        "borderRadius": 6,
        "borderWidth": 1,
        "padding": 4,
        "color": "#666666",
        "font": {
          "family": "sans-serif",
          "size": 10,
          "style": "normal"
        }
      },
      "datalabelsZAxis": {
        "enabled": false
      },
      "googleSheets": {},
      "airtable": {},
      "tickFormat": ""
    },
    "cutoutPercentage": 50,
    "rotation": -1.5707963267948966,
    "circumference": 6.283185307179586,
    "startAngle": -1.5707963267948966
  }
    });
  }

  let catOneArrow = '';
  let catTwoArrow = '';
  let catThreeArrow = '';
  let catFourArrow = '';
  let catFiveArrow = '';
  function calculateAvgScorePercentChange() {
  // https://imgbb.com/upload for Image Hosting

  const percentArrows = {
    // Autonomy
    catOneUp: "https://i.ibb.co/KqjgQJr/arrow-purple.png",
    catOneDown: "https://i.ibb.co/tL09123/arrow-purple-down.png",
    // Impact
    catTwoUp: "https://i.ibb.co/Jtrg4L0/arrow-slateblue.png",
    catTwoDown: "https://i.ibb.co/RgwT329/arrow-slateblue-down.png",
    // Growth
    catThreeUp: "https://i.ibb.co/5rhpg6f/arrow-coolgreen.png",
    catThreeDown: "https://i.ibb.co/SBg0txY/arrow-coolgreen-down.png",
    // Connection
    catFourUp: "https://i.ibb.co/xgg9Vn0/arrow-peagreen.png",
    catFourDown: "https://i.ibb.co/2YDD8Gh/arrow-peagreen-down.png",
    // Growth(?)
    catFiveUp: "https://i.ibb.co/H40PWWZ/arrow-orange.png",
    catFiveDown: "https://i.ibb.co/ncxh3tB/arrow-orange-down.png",
  };

    // Autonomy
    if(catOneChange > 0) {
      console.log(catOneChange)
      catOneArrow = percentArrows.catOneUp;
    } else {
      catOneArrow = percentArrows.catOneDown;
    }
    // Impact
    if(catTwoChange >= 0) {
      catTwoArrow = percentArrows.catTwoUp;
    } else {
      catTwoArrow = percentArrows.catTwoDown;
    }
    // Growth
    if(catThreeChange >= 0) {
      catThreeArrow = percentArrows.catThreeUp;
    } else {
      catThreeArrow = percentArrows.catThreeDown;
    }
    // Connection
    if(catFourChange >= 0) {
      catFourArrow = percentArrows.catFourUp;
    } else {
      catFourArrow = percentArrows.catFourDown;
    }
    // Growth(?)
    if(catFiveChange >= 0) {
      catFiveArrow = percentArrows.catFiveUp;
    } else {
      catFiveArrow = percentArrows.catFiveDown;
    }
  }
  calculateSurveyResponses();
  calculateAvgScores();
  calculatePercentageChanges();
  createSurveyChart();
  createCategoryChart();
  calculateAvgScorePercentChange();

  const html = `
    <style>
    @import url('https://fonts.cdnfonts.com/css/tw-cen-mt-std');
        body {
            margin:0;
            padding:0;
            word-spacing:normal;
        }
        h1,h2,h3,h4,h5 {
          font-family: 'Tw Cen MT Std', sans-serif;
        }
        .total-day-resp::-webkit-progress-value {
        background-color: #555;
        }
        .total-day-sub::-webkit-progress-value {
        background-color: green;
        }
        tbody {
            background: #fff;
        }
        td {
            padding:30px;
            background-color:#ffffff;
        }
        .resp-chart {
            /* background: #999;  */
            width: 100%; 
            height: auto; 
            margin: 0.3em auto;
        }
        .line-chart {
            /* background: #999;  */
            width: 100%; 
            height: auto; 
            margin: 0.3em auto;
        }
        table, td, div, h1, p {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .line {
            margin-top: 2em;
            border-bottom: 1px solid #e4e4e4;
        }
        .section-header {
            margin-top: 1.5rem;
            font-family: 'Tw Cen MT Std', sans-serif;
            font-size: 26px;
            line-height: 32px;
            font-weight: bold;
            letter-spacing: -0.02em;
            font-size: 1.3em;
            color: #777;
        }
        
        /* Average Score */
        .avg-score-wrapper {
        display: flex;
        flex-direction: row;
      
        }
        article {
          flex: 1;
        }
        .rotate-image {
          transform: rotate(45deg);
        }
        
        .spacer {
          margin: 1em 0;
        }
        .bottom-of-page-space {
          margin-bottom: 10em;
        }
        @media screen and (max-width: 530px) {
          .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            background-color: #555555;
            text-decoration: none !important;
            font-weight: bold;
          }
          .col-lge {
            max-width: 100% !important;
          }
        }
        @media screen and (min-width: 531px) {
          .col-sml {
            max-width: 27% !important;
          }
          .col-lge {
            max-width: 73% !important;
          }
        }
      </style>
      <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
        <tr>
        <td align="center" style="padding:0; background: #fff;">
          <!--[if mso]>
          <table role="presentation" align="center" style="width:600px;">
          <tr>
          <td>
          <![endif]-->
          
          <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
            
            <tr>
              <img src=${logoLink} 
              alt="Logo" style="width:15.6rem; max-width:80%;"></a>
              <h3 style="font-family: 'Tw Cen MT Std', sans-serif;">Survey Results</h3>
              <p style="font-size:1em; color: #999; margin-bottom: 2em;
              border-bottom: 1px solid #e1dfdf;
              padding-bottom: 1em;">${surveyDate}</p>
            </tr>
        
            <!-- Responses -->
            <tr>
                <td>
                  <div class="spacer"></div>
                  <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                      <span style="font-size: 1em; color: #999;">SENT <span style="border-radius: 5px; font-size: 0.4em; background: #f4940c; width: 30px; height: 10px; display: inline-block;"></span></span>
                      <span style="margin-left: 1rem; font-size: 1em; color: #999;">RESPONSES <span style="border-radius: 5px; font-size: 0.4em; background: #5D9690; width: 30px; height: 10px; display: inline-block;"></span></span>
                    </tr>
                  </table>
                  
        
                    <div class="spacer"></div>
                    <div class="resp-chart">
        
                      <!-- Edit Survey Response Chart via Quickchart -->
                      <img style="width: 100%;" src="${surveyChart.getUrl()}
        
                      " alt="" srcset="">
                    </div>
        
                    <h1 class="section-header"  style="margin: 3em 0 0.5em 0; font-size: 1.2em;">Total</h1>
                    <p style="color: #999; margin: 0">Surveys Sent - ${totalSent}</p>
                    <p style="color: #999; margin: 0;">Responses - ${totalResponses}</p>
                    <p style="color: #f4940c; font-weight: 800; margin: 0;">Response Rate - ${responseRate}</p>
                    <div class="line"></div>
        
                </td>
              <!-- <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-2.png" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
              </td> -->
            </tr>


            
            <!-- Average Score Per Categoy -->
            <tr>
                <td>
                    <h1 class="section-header"  style="margin: 3em 0 0.5em 0; font-size: 1.2em;">Average Score per Category</h1>
                    <p style="font-size: 12px;color: #999; margin-bottom: 2em;">Compared to last week *</p>
                    <div class="spacer"></div>
                    <!-- Unicode Icons -->
                    <!-- https://www.amp-what.com/unicode/search/down%20arrow -->
                    <table style="border-collapse: collapse; width: 100%;">
                      <tr>
                        <td style="padding: 10px; color: #AF357C; font-weight: 600;">
                          <article style="font-size: 1.2em; font-weight: bold; color: #AF357C;">Autonomy</article>
                        </td>
                        <td style="padding: 10px;">
                          <article style="text-align: end;">
                            <span style="font-size: 24px;">${avgScoreCategoryOne.toFixed(1)}</span>
                            <img src=${catOneArrow}/>  
                            <span style="font-size: 10px;">${catOneChange.toFixed(1)}</span>
                          </article>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; color: #344A5C; font-weight: 600;">
                          <article style="font-size: 1.2em; font-weight: bold; color: #344A5C;">Growth</article>
                        </td>
                        <td style="padding: 10px;">
                          <article style="text-align: end;">
                            <span style="font-size: 24px;">${avgScoreCategoryTwo.toFixed(1)}</span>
                            <img src=${catTwoArrow}/>
                            <span style="font-size: 10px;">${catTwoChange.toFixed(1)}</span>
                          </article>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; color: #5D9690; font-weight: 600;">
                          <article style="font-size: 1.2em; font-weight: bold; color: #5D9690;">Impact</article>
                        </td>
                        <td style="padding: 10px;">
                          <article style="text-align: end;">
                            <span style="font-size: 24px;">${avgScoreCategoryThree.toFixed(1)}</span>
                            <img src=${catThreeArrow} />
                            <span style="font-size: 10px;">${catThreeChange.toFixed(1)}</span>
                          </article>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; color: #8D9B23; font-weight: 600;">
                          <article style="font-size: 1.2em; font-weight: bold; color: #8D9B23;">Connection</article>
                        </td>
                        <td style="padding: 10px;">
                          <article style="text-align: end;">
                            <span style="font-size: 24px;">${avgScoreCategoryFour.toFixed(1)}</span>
                            <img src=${catFourArrow} />
                          <span style="font-size: 10px;">${catFourChange.toFixed(1)}</span>
                          </article>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; color: #F4940C; font-weight: 600;">
                          <article style="font-size: 1.2em; font-weight: bold; color: #F4940C;">Growth</article>
                        </td>
                        <td style="padding: 10px;">
                          <article style="text-align: end;">
                            <span style="font-size: 24px;">${avgScoreCategoryFive.toFixed(1)}</span>
                            <img src=${catFiveArrow} />
                            <span style="font-size: 10px;">${catFiveChange.toFixed(1)}</span>
                          </article>
                        </td>
                      </tr>
                    </table>
                    <div class="line"></div>
                </td>
              <!-- <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-2.png" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
              </td> -->
            </tr>
        
            <!-- Scores by Category -->
            <tr>
              <td>
                <h1 class="section-header"  style="margin: 3em 0 0.5em 0; font-size: 1.2em;">Score by Category</h1>
                <p style="font-size: 12px;color: #999; margin-bottom: 2em;">For each day of the Week *</p>
                <div class="line-chart">
                  <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                      <td style="text-align: center; width: 20%; font-size: 0.8em; font-weight: 700;">
                        Autonomy
                        <div style="background: #AF357C; width: 50px; height: 20px; margin: 0 auto; border-radius: 5px;"></div>
                      </td>
                      <td style="text-align: center; width: 20%; font-size: 0.8em; font-weight: 700;">
                        Impact
                        <div style="background: #344A5C; width: 50px; height: 20px; margin: 0 auto; border-radius: 5px;"></div>
                      </td>
                      <td style="text-align: center; width: 20%; font-size: 0.8em; font-weight: 700;">
                        Growth
                        <div style="background: #5D9690; width: 50px; height: 20px; margin: 0 auto; border-radius: 5px;"></div>
                      </td>
                      <td style="text-align: center; width: 20%; font-size: 0.8em; font-weight: 700;">
                        Connection
                        <div style="background: #8D9B23; width: 50px; height: 20px; margin: 0 auto; border-radius: 5px;"></div>
                      </td>
                      <td style="text-align: center; width: 20%; font-size: 0.8em; font-weight: 700;">
                        Growth
                        <div style="background: #F4940C; width: 50px; height: 20px; margin: 0 auto; border-radius: 5px;"></div>
                      </td>
                    </tr>
                  </table>
                  <img style="width: 100%;" 
                  src="${categoryChart.getUrl()}">
                </div>
                <div class="line"></div>
              </td>
            </tr>
        
            <tr>
              <td>
                <h1 class="section-header"  style="margin: 3em 0 0.5em 0; font-size: 1.2em;">Employee Summary</h1>
                <div class="spacer"></div>
                <table style="border-collapse: collapse; width: 100%;  margin-bottom: 1em;">
                  <tr>
                    <td style=""><span style="color: green">Hires</span> this <i>Week</i></td>
                    <td style="text-align: end; color: green">${totalHiresThisWeek}</td>
                  </tr>
                  <tr>
                    <td><span style="color: green">Hires</span> this <i>Month</i></td>
                    <td style="text-align: end; color: green;">${totalHiresThisMonth}</td>
                  </tr>
                  <div class="spacer"></div>
                  <tr>
                    <td style=""><span style="color: red">Terminations</span> this <i>Week</i></td>
                    <td style="text-align: end; color: red">${totalTerminationsThisWeek}</td>
                  </tr>
                  <tr>
                    <td style=""><span style="color: red">Terminations</span> this <i>Month</i></td>
                    <td style="text-align: end; color: red">${totalTerminationsThisMonth}</td>
                  </tr>
                </table>
                <div class="bottom-of-page-space"></div>
              </td>
            </tr>
            
            <!-- <tr>
              <td style="padding:30px;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
                <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="540" alt="" style="width:100%;height:auto;border:none;text-decoration:none;color:#363636;"></a>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background-color:#ffffff;">
                <p style="margin:0;">Duis sit amet accumsan nibh, varius tincidunt lectus. Quisque commodo, nulla ac feugiat cursus, arcu orci condimentum tellus, vel placerat libero sapien et libero. Suspendisse auctor vel orci nec finibus.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
                <p style="margin:0 0 8px 0;"><a href="http://www.facebook.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="http://www.twitter.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                <p style="margin:0;font-size:14px;line-height:20px;">&reg; Someone, Somewhere 2021<br><a class="unsub" href="http://www.example.com/" style="color:#cccccc;text-decoration:underline;">Unsubscribe instantly</a></p>
              </td>
            </tr> -->
          </table>
          <!--[if mso]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
        </tr>
        </table>
      </div>
      `

  // Set transport service which will send the emails
  var transporter =  nodemailer.createTransport({
    service: 'hotmail',
    auth: {
          user: 'admin@finalbossar.com',
          pass: process.env.PASS,
      },
      debug: true, // show debug output
      logger: true // log information in console
    });

    //  configuration for email details
    const userMailOptions = {
      from: 'eddie@finalbossar.com', // sender address
      to: ['eddielacrosse2@gmail.com', 'eddie@finalbossar.com'], // list of receivers
      subject: `Survey Email (Test)`,
      html: html,
    };
    transporter.sendMail(userMailOptions, function (err: any, info: any) {
      if(err) {
        // console.log(err)
        return res.status(400).json(err);
      }
      else {
        // console.log(info);
        return res.status(200).json(info)
      }
    });

  
}