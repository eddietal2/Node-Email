export {};
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const html = `
<style>
    body {
        margin:0;
        padding:0;
        word-spacing:normal;
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
          <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" 
          alt="Logo" style="width:100px; max-width:80%;"></a>
          <h1>Survey Results</h1>
          <p style="font-size:1em; color: #999; margin-bottom: 2em;
          border-bottom: 1px solid #e1dfdf;
          padding-bottom: 1em;">July 1st - 5th, 2023</p>
        </tr>
    
        <!-- Responses -->
        <tr>
            <td>
              <div class="spacer"></div>
              <table style="border-collapse: collapse; width: 100%;">
                <tr>
                  <span style="font-size: 1em; color: #999;">SENT <span style="border-radius: 5px; font-size: 0.4em; background: orange; width: 30px; height: 10px; display: inline-block;"></span></span>
                  <span style="margin-left: 1rem; font-size: 1em; color: #999;">RESPONSES <span style="border-radius: 5px; font-size: 0.4em; background: #5D9690; width: 30px; height: 10px; display: inline-block;"></span></span>
                </tr>
              </table>
              
    
                <div class="spacer"></div>
                <div class="resp-chart">
    
                  <!-- Edit Survey Response Chart via Quickchart -->
                  <!-- https://quickchart.io/chart-maker/edit/zm-db8618ef-7ad9-417c-be1d-e4c9bc1507bd -->
                  <img style="width: 100%;" src="https://quickchart.io/chart/render/sf-22bdc347-2445-45ce-8390-7e1f9062d9af
    
                  " alt="" srcset="">
                </div>
    
                <h1 class="section-header"  style="margin: 3em 0 0.5em 0; font-size: 1.2em;">Total</h1>
                <p style="color: #999; margin: 0">Surveys Sent - 100</p>
                <p style="color: #999; margin: 0;">Responses - 77</p>
                <p style="color: orange; font-weight: 800; margin: 0;">Response Rate - 77%</p>
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
                    <td style="padding: 10px;">
                      <article style="font-size: 1.2em; font-weight: bold; color: #AF357C;">Autonomy</article>
                    </td>
                    <td style="padding: 10px;">
                      <article style="text-align: end;">
                        <span style="font-size: 24px;">5</span>
                        <span style="color: green;">&#11014;</span>
                        <span style="font-size: 10px;">+25%</span>
                      </article>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px;">
                      <article style="font-size: 1.2em; font-weight: bold; color: #344A5C;">Growth</article>
                    </td>
                    <td style="padding: 10px;">
                      <article style="text-align: end;">
                        <span style="font-size: 24px;">5</span>
                        <span style="color: green;">&#11014;</span>
                        <span style="font-size: 10px;">+25%</span>
                      </article>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px;">
                      <article style="font-size: 1.2em; font-weight: bold; color: #5D9690;">Impact</article>
                    </td>
                    <td style="padding: 10px;">
                      <article style="text-align: end;">
                        <span style="font-size: 24px;">5</span>
                        <span style="color: green;">&#11014;</span>
                        <span style="font-size: 10px;">+25%</span>
                      </article>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px;">
                      <article style="font-size: 1.2em; font-weight: bold; color: #8D9B23;">Connection</article>
                    </td>
                    <td style="padding: 10px;">
                      <article style="text-align: end;">
                        <span style="font-size: 24px;">5</span>
                        <span style="color: green;">&#11014;</span>
                        <span style="font-size: 10px;">+25%</span>
                      </article>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px;">
                      <article style="font-size: 1.2em; font-weight: bold; color: #F4940C;">Growth</article>
                    </td>
                    <td style="padding: 10px;">
                      <article style="text-align: end;">
                        <span style="font-size: 24px;">5</span>
                        <span style="color: green;">&#11014;</span>
                        <span style="font-size: 10px;">+25%</span>
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
    
        <!-- Scores by Categoy -->
        <tr>
          <td>
            <h1 class="section-header"  style="margin: 3em 0 0.5em 0; font-size: 1.2em;">Score by Category</h1>
            <p style="font-size: 12px;color: #999; margin-bottom: 2em;">For each day of the Week *</p>
            
            <!-- Edit Bar Chart via Quickchart -->
            <!-- https://quickchart.io/chart-maker/edit/zm-cd9604b4-605e-4099-bcf6-ec676b3318ec -->
            <!-- (3,3)
            (3,3)
            (3,5)
            (3,4)
            (3,5) -->
            <!-- Edit Line Chart via Quickchart -->
            <!-- https://quickchart.io/chart-maker/edit/zm-23d2747f-17f4-4d79-b174-2aba72dee0d1 -->
            <div class="line-chart">
              <img style="width: 100%;" 
              src="https://quickchart.io/chart/render/sf-2052c25e-913c-4768-91ed-071b4ebfc249
              ">
            </div>
            <div class="line"></div>
          </td>
        </tr>
    
        <tr>
          <td>
            <h1 class="section-header"  style="margin: 3em 0 0.5em 0; font-size: 1.2em;">Employee Summary</h1>
            <div class="spacer"></div>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style=""><span style="color: green">Hires</span> this <i>Week</i></td>
                <td style="text-align: end; color: green">6</td>
              </tr>
              <tr>
                <td><span style="color: green">Hires</span> this <i>Month</i></td>
                <td style="text-align: end; color: green;">7</td>
              </tr>
              <div class="spacer"></div>
              <tr>
                <td style=""><span style="color: red">Terminations</span> this <i>Week</i></td>
                <td style="text-align: end; color: red">1</td>
              </tr>
              <tr>
                <td style=""><span style="color: red">Terminations</span> this <i>Month</i></td>
                <td style="text-align: end; color: red">2</td>
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

exports.sendMessage = (req: any, res: any) => {
  
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
          from: 'admin@finalbossar.com', // sender address
          to: `eddielacrosse2@gmail.com`, // list of receivers
          subject: `Survey Email (Test)`,
          html: html,
          };
          transporter.sendMail(userMailOptions, function (err: any, info: any) {
          if(err) {
            console.log(err)
            return res.status(400).json(err);
          }
          else {
            console.log(info);
            return res.status(200).json(info)
          }
          });
  
  
}