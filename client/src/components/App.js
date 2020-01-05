import React, { useState, useEffect } from 'react';
import { Header, HeaderNav, Footer } from './Layouts';
import { Hidden } from '@material-ui/core';
import axios from 'axios';

export default function App() {
  
    return (
      <div>
        <Hidden smDown>
          <Header />
        </Hidden>
        <HeaderNav />
        <Footer />
      </div>
    );

}
