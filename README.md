# webpack-performance
To date, I have attempted to integrate various tips and tricks into the Webpack build to increase performance including:

+ Splitting the vendors out into a separate bundle
+ cache= true + resolve.unsafeCache
+ happy pack plugin
+ Webpack DLL plugin
+ Common Chunks Plugin
+ cheap-module-eval-source-map

Not all of these are reflected in the code in `BuildTools/webpack.config.babel.js`, but all have been tried. As result, the build’s performance has improved drastically; however, when I change one file, several unrelated files are also rebuild, but I cannot figure out why this happening. Here are further details:


**Changing a file:**

./App/Components/Navigation/NavBar/Index.jsx


**Results in this:**


973ms build modules       
11ms seal
74ms optimize
8ms hashing 
799ms create chunk assets
25ms additional chunk assets
0ms optimize chunk assets 
1ms optimize assets 
96ms emit
Hash: decc2418900a6fd035db
Version: webpack 1.12.14
Time: 2061ms
                                   Asset      Size  Chunks             Chunk Names
                   main.webpackBundle.js   2.68 MB       0  [emitted]  main
    0.638e3814cac259787fc6.hot-update.js   12.3 kB       0  [emitted]  main
hot/638e3814cac259787fc6.hot-update.json  36 bytes          [emitted]  
   [6] ./App/Components/App/index.js 153 bytes {0} [built]
       ... -> factory:50ms building:0ms
  [51] ./App/Components/Layout/index.jsx 3.69 kB {0} [built]
       ... -> factory:6ms building:0ms dependencies:5ms
  [56] ./App/Components/Navigation/index.jsx 6.31 kB {0} [built]
       ... -> [51] 6ms -> factory:3ms building:0ms dependencies:5ms
  [60] ./App/Components/Navigation/NavBar/index.jsx 4.46 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> factory:3ms building:0ms dependencies:3ms
  [63] ./SharedComponents/Controls/Index.js 8.35 kB {0} [built]
       ... -> factory:12ms building:0ms dependencies:3ms
 [104] ./SharedComponents/Controls/Carousel/index.jsx 10.1 kB {0} [built]
       ... -> [63] 12ms -> factory:19ms building:0ms dependencies:4ms
 [107] ./SharedComponents/Controls/Carousel/Dot/index.jsx 3.63 kB {0} [built]
       ... -> [63] 12ms -> [104] 19ms -> factory:3ms building:188ms dependencies:4ms
 [108] ./SharedComponents/Controls/ExpandableListItem/index.jsx 5.03 kB {0} [built]
       ... -> [63] 12ms -> factory:20ms building:0ms dependencies:3ms
 [113] ./SharedComponents/Controls/MaterialIcon/index.jsx 3.45 kB {0} [built]
       ... -> [63] 12ms -> factory:21ms building:205ms dependencies:3ms
 [114] ./SharedComponents/Controls/Logo/index.jsx 2.96 kB {0} [built]
       ... -> [63] 12ms -> factory:22ms building:1ms dependencies:3ms
 [117] ./SharedComponents/Controls/FullScreenLoader/index.jsx 3.75 kB {0} [built]
       ... -> [63] 12ms -> factory:22ms building:0ms dependencies:3ms
 [120] ./SharedComponents/Controls/InitialsAvatar/index.jsx 4.49 kB {0} [built]
       ... -> [63] 12ms -> factory:23ms building:0ms dependencies:3ms
 [124] ./SharedComponents/Controls/UserPill/index.jsx 5.72 kB {0} [built]
       ... -> [63] 12ms -> factory:23ms building:0ms dependencies:4ms
 [127] ./SharedComponents/Controls/Text/index.jsx 4.44 kB {0} [built]
       ... -> [63] 12ms -> factory:24ms building:0ms dependencies:2ms
 [130] ./SharedComponents/Controls/RequiresAttentionDot/index.jsx 3.12 kB {0} [built]
       ... -> [63] 12ms -> factory:24ms building:0ms dependencies:6ms
 [133] ./SharedComponents/Controls/EventHandler/index.jsx 8.18 kB {0} [built]
       ... -> [63] 12ms -> factory:25ms building:288ms dependencies:5ms
 [137] ./App/Components/Navigation/NavBar/Hamburger/index.jsx 3.77 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> [60] 3ms -> factory:2ms building:0ms dependencies:7ms
 [140] ./App/Components/Navigation/NavBar/InboxCount/index.jsx 3.12 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> [60] 3ms -> factory:2ms building:0ms dependencies:6ms
 [143] ./App/Components/Navigation/NavMenuItems/index.jsx 5.72 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> factory:4ms building:0ms dependencies:3ms
 [144] ./App/Components/Navigation/NavMenuItems/MenuItem/index.jsx 4.83 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> [143] 4ms -> factory:2ms building:0ms dependencies:4ms
 [147] ./App/Components/Navigation/NavMenuItems/SecondaryActions/index.jsx 3.77 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> [143] 4ms -> factory:2ms building:0ms dependencies:4ms
 [148] ./App/Components/Navigation/NavMenuItems/SecondaryActions/SecondaryLink/index.jsx 4.91 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> [143] 4ms -> [147] 2ms -> factory:3ms building:1ms dependencies:4ms
 [155] ./App/Components/Navigation/UserDrawer/index.jsx 7.49 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> factory:4ms building:158ms dependencies:6ms
 [156] ./App/Components/Navigation/UserDrawer/SubSystems/index.jsx 4.36 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> [155] 162ms -> factory:4ms building:0ms dependencies:5ms
 [159] ./App/Components/Navigation/UserDrawer/Proxies/index.jsx 6.33 kB {0} [built]
       ... -> [51] 6ms -> [56] 3ms -> [155] 162ms -> factory:5ms building:0ms dependencies:3ms
 [212] ./App/Components/Footer/index.jsx 2.77 kB {0} [built]
       ... -> [51] 6ms -> factory:4ms building:0ms dependencies:2ms
 [215] ./App/Components/SecurityNotice/index.jsx 5.82 kB {0} [built]
       ... -> factory:7ms building:0ms dependencies:6ms
 [233] ./Modules/Inbox/TabsWrapper/index.jsx 5.59 kB {0} [built]
       ... -> factory:9ms building:0ms dependencies:7ms
 [236] ./Modules/Inbox/Summary/index.jsx 8.52 kB {0} [built]
       ... -> factory:11ms building:0ms dependencies:5ms
 [237] ./Modules/Inbox/Summary/Card/index.jsx 8.07 kB {0} [built]
       ... -> [236] 11ms -> factory:3ms building:0ms dependencies:5ms
 [240] ./Modules/Inbox/Summary/Card/BreakdownBar/index.jsx 5.85 kB {0} [built]
       ... -> [236] 11ms -> [237] 3ms -> factory:2ms building:0ms dependencies:4ms
 [243] ./Modules/Inbox/Summary/Card/Legend/index.jsx 7.11 kB {0} [built]
       ... -> [236] 11ms -> [237] 3ms -> factory:3ms building:0ms dependencies:3ms
 [246] ./Modules/Inbox/Summary/Card/CardHeader/index.jsx 4.87 kB {0} [built]
       ... -> [236] 11ms -> [237] 3ms -> factory:3ms building:0ms dependencies:11ms
 [249] ./Modules/Inbox/Summary/Card/SpecialIndicators/index.jsx 4.58 kB {0} [built]
       ... -> [236] 11ms -> [237] 3ms -> factory:4ms building:0ms dependencies:4ms
 [252] ./Modules/Inbox/Summary/Card/OverdueIndicator/index.jsx 4.23 kB {0} [built]
       ... -> [236] 11ms -> [237] 3ms -> factory:4ms building:0ms dependencies:5ms
 [258] ./Modules/Inbox/Announcements/index.jsx 9.08 kB {0} [built]
       ... -> factory:11ms building:0ms dependencies:7ms
 [261] ./Modules/Inbox/Announcements/Announcement/index.jsx 6.44 kB {0} [built]
       ... -> [258] 11ms -> factory:6ms building:0ms dependencies:3ms
 [265] ./App/Components/ReduxDevTools/index.jsx 1.04 kB {0} [built]
       ... -> factory:9ms building:220ms dependencies:0ms
    + 252 hidden modules

Build times range from 1-3 seconds.Note that it is actually taking time to build these files. It should not. Most of the files are completely unrelated and unaffected by the changes made in the above file. This happen when running `webpack --watch` and when running webpack as hot middleware on a node or browsersync server. 

Any ideas on how to make this stop, and instruct webpack to only change the file that actually changed?

