import React from 'react';
import Paper from 'material-ui/lib/paper';

require('./Footer.scss');

const Footer = ({}) =>
  <Paper
    className="footer"
    zIndex={1}>
    <div className="footer-legal"><span>©2016 WILDLIFE LA.</span></div>
  </Paper>;


export default Footer;