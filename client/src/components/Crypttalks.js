import * as React from 'react'
import WidgetBot from '@widgetbot/react-embed'
import { Header, HeaderNav ,NacFooter } from './Layouts';

const Cryptalks = () => (
    <div>
        <Header />
        <HeaderNav />
        <div style={{marginTop: "100px"}}>
            <WidgetBot
                server="633777649872797707"
                channel="633777649872797709"
                shard="https://disweb.deploys.io"
                height="750px"
                width="100%"
            />
        </div>
        
    </div>
  
)

export default Cryptalks