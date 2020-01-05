import * as React from 'react';
import './index.css';
import Datafeed from './api/';
import { widget } from '../../charting_library/charting_library.min';
import CoinDetailAnalyticCards from '../CoinDetailAnalyticCards'
import CoinDetailScales from '../CoinDetailScales'
import { Container, Grid} from '@material-ui/core';


function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {

	static defaultProps = {
		symbol: 'Coinbase:BTC/USD',
		interval: '15',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studies: ['MACD'],
		studies_access: {
			type: "black" | "white",
			tools: [
				{
					name: "MACD",
				},
				{
					name: "Moving Average"
				},
				{
					name: "Relative Strength Index",
				},
				{
					name: "Bollinger Bands",
					grayed: true
				},
				{
					name: "ADR",
					grayed: true
				},
				{
					name: "Accumulation/Distribution",
					grayed: true
				},
				{
					name: "Volume"
				}
			]
		}
	};
	tvWidget = null;
	componentDidMount() {
		const widgetOptions = {
			debug: false,
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies: this.props.studies,
			studies_access: this.props.studies_access,
			studies_overrides: this.props.studiesOverrides,
			overrides: {
				"mainSeriesProperties.showCountdown": true,
				"paneProperties.background": "#131722",
				"paneProperties.vertGridProperties.color": "#363c4e",
				"paneProperties.horzGridProperties.color": "#363c4e",
				"symbolWatermarkProperties.transparency": 90,
				"scalesProperties.textColor" : "#AAA",
				"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
				"indicator_name.plot_name.property_name": "line",
			},
		};

		const tvWidget = new widget(widgetOptions); 
		this.tvWidget = tvWidget;
		this.tvWidget.onChartReady(() => { console.log('Chart has loaded!') });
	}

	render() {
		return (
			<div>
				<Grid xs={12} md={12}
					id={ this.props.containerId }
					className={ 'TVChartContainer' }
					style={{height: '700px'}}
				/>
				<Container>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<CoinDetailAnalyticCards />
						</Grid>
						<Grid item xs={12} md={6}>
							<CoinDetailScales />
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}
}
