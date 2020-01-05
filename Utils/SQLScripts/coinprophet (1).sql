-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2019 at 12:26 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coinprophet`
--
CREATE DATABASE IF NOT EXISTS `coinprophet` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `coinprophet`;

-- --------------------------------------------------------

--
-- Table structure for table `coin_masters`
--

CREATE TABLE `coin_masters` (
  `id` int(11) NOT NULL,
  `rank` int(11) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `symbol` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `category` enum('Coin','Token') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `cryptocompareId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coin_masters`
--

INSERT INTO `coin_masters` (`id`, `rank`, `logo`, `name`, `symbol`, `slug`, `category`, `description`, `cryptocompareId`) VALUES
(1, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', 'Bitcoin', 'BTC', 'bitcoin', 'Coin', 'Bitcoin (BTC) is a consensus network that enables a new payment system and a completely digital currency. Powered by its users, it is a peer to peer payment network that requires no central authority to operate. On October 31st, 2008, an individual or group of individuals operating under the pseudonym \\\"Satoshi Nakamoto\\\" published the Bitcoin Whitepaper and described it as: \\\"a purely peer-to-peer version of electronic cash, which would allow online payments to be sent directly from one party to another without going through a financial institution.\\\"', NULL),
(3, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png', 'Litecoin', 'LTC', 'litecoin', 'Coin', 'Litecoin is a peer-to-peer cryptocurrency created by Charlie Lee. It was created based on the Bitcoin protocol but differs in terms of the hashing algorithm used. Litecoin uses the memory intensive Scrypt proof of work mining algorithm. Scrypt allows consumer-grade hardware such as GPU to mine those coins.', NULL),
(4, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/3.png', 'Namecoin', 'NMC', 'namecoin', 'Coin', 'Namecoin (NMC) is a cryptocurrency. Users are able to generate NMC through the process of mining. Namecoin has a current supply of 14,736,400. The last known price of Namecoin is $0.749867 USD and is up 1.23% over the last 24 hours. It is currently trading on 7 active market(s) with $2,431.62 traded over the last 24 hours. More information can be found at https://www.namecoin.org/.', NULL),
(5, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/4.png', 'Terracoin', 'TRC', 'terracoin', 'Coin', 'Terracoin (TRC) is a cryptocurrency. Users are able to generate TRC through the process of mining. Terracoin has a current supply of 22,935,396.43. The last known price of Terracoin is $0.036321 USD and is up 0.27% over the last 24 hours. It is currently trading on 5 active market(s) with $464.79 traded over the last 24 hours. More information can be found at http://www.terracoin.io/.', NULL),
(6, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/5.png', 'Peercoin', 'PPC', 'peercoin', 'Coin', 'Peercoin (PPC) is a cryptocurrency. Users are able to generate PPC through the process of mining. Peercoin has a current supply of 25,591,607.155. The last known price of Peercoin is $0.383283 USD and is down -2.02% over the last 24 hours. It is currently trading on 17 active market(s) with $101,950.71 traded over the last 24 hours. More information can be found at http://www.peercoin.net.', NULL),
(7, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/6.png', 'Novacoin', 'NVC', 'novacoin', 'Coin', 'Novacoin (NVC) is a cryptocurrency. Users are able to generate NVC through the process of mining. Novacoin has a current supply of 2,335,756.714. The last known price of Novacoin is $0.517177 USD and is down -0.41% over the last 24 hours. It is currently trading on 2 active market(s) with $1,017.16 traded over the last 24 hours. More information can be found at http://novacoin.org.', NULL),
(8, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/7.png', 'Devcoin', 'DVC', 'devcoin', 'Coin', 'Devcoin (DVC) is a cryptocurrency. Users are able to generate DVC through the process of mining. Devcoin has a current supply of 15,167,257,500. The last known price of Devcoin is $0.000023 USD. More information can be found at http://devcoin.org.', NULL),
(9, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/8.png', 'Feathercoin', 'FTC', 'feathercoin', 'Coin', 'Feathercoin (FTC) is a cryptocurrency. Users are able to generate FTC through the process of mining. Feathercoin has a current supply of 248,682,040. The last known price of Feathercoin is $0.015722 USD and is down -3.33% over the last 24 hours. It is currently trading on 7 active market(s) with $2,381.58 traded over the last 24 hours. More information can be found at http://feathercoin.com.', NULL),
(10, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/9.png', 'Mincoin', 'MNC', 'mincoin', 'Coin', 'Mincoin (MNC) is a cryptocurrency. Users are able to generate MNC through the process of mining. Mincoin has a current supply of 5,761,864.888. The last known price of Mincoin is $0.008687 USD and is down -1.01% over the last 24 hours. It is currently trading on 1 active market(s) with $11.26 traded over the last 24 hours. More information can be found at https://www.mincoin.us/.', NULL),
(11, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/10.png', 'Freicoin', 'FRC', 'freicoin', 'Coin', 'Freicoin (FRC) is a cryptocurrency. Users are able to generate FRC through the process of mining. Freicoin has a current supply of 100,000,000 with 55,378,630.447 in circulation. The last known price of Freicoin is $0.009307 USD and is up 1.35% over the last 24 hours. It is currently trading on 1 active market(s) with $173.09 traded over the last 24 hours. More information can be found at http://freico.in.', NULL),
(12, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/11.png', 'CHNCoin', 'CNC', 'chncoin', 'Coin', 'CHNCoin (CNC) is a cryptocurrency. Users are able to generate CNC through the process of mining. CHNCoin has a current supply of 196,587,863.65 with 51,737,862.65 in circulation. The last known price of CHNCoin is $0.001222 USD. More information can be found at http://chncoin.org/.', NULL),
(13, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/12.png', 'BBQCoin', 'BQC', 'bbqcoin', 'Coin', 'BBQCoin (BQC) is a cryptocurrency. Users are able to generate BQC through the process of mining. BBQCoin has a current supply of 50,765,853.56. The last known price of BBQCoin is $0.000458 USD. More information can be found at http://bbqcoin.org/.', NULL),
(14, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/13.png', 'Ixcoin', 'IXC', 'ixcoin', 'Coin', 'Ixcoin (IXC) is a cryptocurrency. Ixcoin has a current supply of 21,086,678.999. The last known price of Ixcoin is $0.012927 USD and is down -23.91% over the last 24 hours. It is currently trading on 2 active market(s) with $3.75 traded over the last 24 hours. More information can be found at https://www.ixcoin.net/.', NULL),
(15, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/14.png', 'BitBar', 'BTB', 'bitbar', 'Coin', 'BitBar (BTB) is a cryptocurrency. Users are able to generate BTB through the process of mining. BitBar has a current supply of 42,453.127. The last known price of BitBar is $2.36 USD and is down -3.82% over the last 24 hours. It is currently trading on 2 active market(s) with $138.49 traded over the last 24 hours. More information can be found at http://bitbar.co/.', NULL),
(16, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/15.png', 'Bytecoin', 'BTE', 'bytecoin-bte', 'Coin', 'Bytecoin (BTE) is a cryptocurrency. Users are able to generate BTE through the process of mining. The last known price of Bytecoin is $0.001382 USD. More information can be found at http://bytecoin.biz.', NULL),
(17, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/16.png', 'WorldCoin', 'WDC', 'worldcoin', 'Coin', 'WorldCoin (WDC) is a cryptocurrency. Users are able to generate WDC through the process of mining. WorldCoin has a current supply of 119,606,940.9. The last known price of WorldCoin is $0.001455 USD and is up 1.36% over the last 24 hours. It is currently trading on 2 active market(s) with $21.58 traded over the last 24 hours. More information can be found at http://www.worldcoin.global/index.html.', NULL),
(18, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/17.png', 'Yacoin', 'YAC', 'yacoin', 'Coin', 'Yacoin (YAC) is a cryptocurrency. Users are able to generate YAC through the process of mining. Yacoin has a current supply of 121,719,152. The last known price of Yacoin is $0.001221 USD. More information can be found at http://www.yacoin.org.', NULL),
(19, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/18.png', 'Digitalcoin', 'DGC', 'digitalcoin', 'Coin', 'Digitalcoin (DGC) is a cryptocurrency. Users are able to generate DGC through the process of mining. Digitalcoin has a current supply of 33,375,093.344. The last known price of Digitalcoin is $0.001653 USD and is down -49.36% over the last 24 hours. It is currently trading on 1 active market(s) with $108.29 traded over the last 24 hours. More information can be found at http://digitalcoin.co.', NULL),
(20, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/19.png', 'Franko', 'FRK', 'franko', 'Coin', 'Franko (FRK) is a cryptocurrency. Users are able to generate FRK through the process of mining. Franko has a current supply of 930,767. The last known price of Franko is $0.123694 USD. More information can be found at http://frankos.org.', NULL),
(21, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/20.png', 'Elacoin', 'ELC', 'elacoin', 'Coin', 'Elacoin (ELC) is a cryptocurrency. Users are able to generate ELC through the process of mining. Elacoin has a current supply of 642,276.25 with 407,774.251 in circulation. The last known price of Elacoin is $0.464247 USD. More information can be found at http://elc.22web.org/.', NULL),
(22, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/21.png', 'Memecoin', 'MEM', 'memecoin', 'Coin', 'Memecoin (MEM) is a cryptocurrency. Users are able to generate MEM through the process of mining. The last known price of Memecoin is $0.000021 USD. More information can be found at http://memecoin.org.', NULL),
(23, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/22.png', 'Luckycoin', 'LKY', 'luckycoin', 'Coin', 'Luckycoin (LKY) is a cryptocurrency. Users are able to generate LKY through the process of mining. Luckycoin has a current supply of 19,326,319.144. The last known price of Luckycoin is $0.000576 USD. More information can be found at http://luckycoinfoundation.org.', NULL),
(24, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/23.png', 'Nibble', 'NBL', 'nibble', 'Coin', 'Nibble (NBL) is a cryptocurrency. Users are able to generate NBL through the process of mining. The last known price of Nibble is $0.000216 USD. More information can be found at https://github.com/getnibble/nibble.', NULL),
(25, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/24.png', 'AmericanCoin', 'AMC', 'americancoin', 'Coin', 'AmericanCoin (AMC) is a cryptocurrency. Users are able to generate AMC through the process of mining. The last known price of AmericanCoin is $0.000082 USD. More information can be found at http://amccoin.com.', NULL),
(26, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/25.png', 'GoldCoin', 'GLC', 'goldcoin', 'Coin', 'GoldCoin (GLC) is a cryptocurrency. Users are able to generate GLC through the process of mining. GoldCoin has a current supply of 41,662,072. The last known price of GoldCoin is $0.061365 USD and is up 3.96% over the last 24 hours. It is currently trading on 5 active market(s) with $6,261.83 traded over the last 24 hours. More information can be found at https://goldcoinweb.com/.', NULL),
(27, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/26.png', 'Junkcoin', 'JKC', 'junkcoin', 'Coin', 'Junkcoin (JKC) is a cryptocurrency. Users are able to generate JKC through the process of mining. Junkcoin has a current supply of 13,961,400. The last known price of Junkcoin is $0.000095 USD. More information can be found at http://jkcoin.com.', NULL),
(28, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/27.png', 'Hypercoin', 'HYC', 'hypercoin', 'Coin', 'Hypercoin (HYC) is a cryptocurrency. Users are able to generate HYC through the process of mining. More information can be found at https://github.com/muddafudda/Hypercoin-fork.', NULL),
(29, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/29.png', 'Bottlecaps', 'CAP', 'bottlecaps', 'Coin', 'Bottlecaps (CAP) is a cryptocurrency. Users are able to generate CAP through the process of mining. Bottlecaps has a current supply of 206,257,686.818. The last known price of Bottlecaps is $0.000514 USD. More information can be found at.', NULL),
(30, NULL, 'https://s2.coinmarketcap.com/static/img/coins/64x64/30.png', 'Noirbits', 'NRB', 'noirbits', 'Coin', 'Noirbits (NRB) is a cryptocurrency. Users are able to generate NRB through the process of mining. Noirbits has a current supply of 2,251,240. The last known price of Noirbits is $0.000168 USD. More information can be found at http://www.noirbits.com.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `url_coin_relations`
--

CREATE TABLE `url_coin_relations` (
  `id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `urlMasterId` int(11) DEFAULT NULL,
  `coinMasterId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `url_coin_relations`
--

INSERT INTO `url_coin_relations` (`id`, `value`, `urlMasterId`, `coinMasterId`) VALUES
(1, 'https://bitcoin.org/', 1, 1),
(2, 'https://bitcoin.org/bitcoin.pdf', 2, 1),
(3, 'https://reddit.com/r/bitcoin', 3, 1),
(4, 'https://bitcointalk.org', 4, 1),
(5, 'https://blockchain.coinmarketcap.com/chain/bitcoin', 7, 1),
(6, 'https://blockchain.info/', 7, 1),
(7, 'https://live.blockcypher.com/btc/', 7, 1),
(8, 'https://blockchair.com/bitcoin', 7, 1),
(9, 'https://explorer.viabtc.com/btc', 7, 1),
(10, 'https://github.com/bitcoin/', 8, 1),
(11, 'https://litecoin.org/', 1, 3),
(12, 'https://twitter.com/LitecoinProject', 9, 3),
(13, 'https://reddit.com/r/litecoin', 3, 3),
(14, 'https://litecointalk.io/', 4, 3),
(15, 'https://litecoin-foundation.org/', 4, 3),
(16, 'https://bitcointalk.org/index.php?topic=47417.0', 5, 3),
(17, 'https://telegram.me/litecoin', 6, 3),
(18, 'https://blockchair.com/litecoin', 7, 3),
(19, 'https://chainz.cryptoid.info/ltc/', 7, 3),
(20, 'http://explorer.litecoin.net/chain/Litecoin', 7, 3),
(21, 'https://ltc.tokenview.com/en', 7, 3),
(22, 'https://explorer.viabtc.com/ltc', 7, 3),
(23, 'https://github.com/litecoin-project/litecoin', 8, 3),
(24, 'https://www.namecoin.org/', 1, 4),
(25, 'https://twitter.com/Namecoin', 9, 4),
(26, 'https://reddit.com/r/namecoin', 3, 4),
(27, 'https://bitcointalk.org/?topic=6017.0', 5, 4),
(28, 'https://telegram.me/namecoin', 6, 4),
(29, 'https://namecha.in/', 7, 4),
(30, 'https://nmc.tokenview.com/', 7, 4),
(31, 'https://github.com/namecoin', 8, 4),
(62, 'http://www.terracoin.io/', 1, 5),
(63, 'https://wiki.terracoin.io/', 2, 5),
(64, 'https://twitter.com/Terracoin_TRC', 9, 5),
(65, 'https://reddit.com/r/terracoin', 3, 5),
(66, 'https://bitcointalk.org/index.php?topic=1364146.0', 5, 5),
(67, 'https://t.me/terracoin', 6, 5),
(68, 'https://mattermost.terracoin.io/', 6, 5),
(69, 'https://insight.terracoin.io/', 7, 5),
(70, 'https://explorer.terracoin.io/chain/Terracoin', 7, 5),
(71, 'https://github.com/terracoin', 8, 5),
(72, 'https://docs.peercoin.net/', 2, 6),
(73, 'https://twitter.com/PeercoinPPC', 9, 6),
(74, 'https://reddit.com/r/peercoin', 3, 6),
(75, 'http://www.peercoin.net', 1, 6),
(76, 'https://talk.peercoin.net', 4, 6),
(77, 'https://bitcointalk.org/index.php?topic=101820.0', 5, 6),
(78, 'https://t.me/peercoin', 6, 6),
(79, 'https://discord.gg/m294ReV', 6, 6),
(80, 'https://chainz.cryptoid.info/ppc/', 7, 6),
(81, 'https://explorer.peercoin.net/', 7, 6),
(82, 'https://www.coinexplorer.net/PPC', 7, 6),
(83, 'https://github.com/peercoin', 8, 6),
(84, 'http://novacoin.org', 1, 7),
(85, 'https://github.com/novacoin-project/novacoin/wiki', 2, 7),
(86, 'https://reddit.com/r/Novacoin', 3, 7),
(87, 'https://bitcointalk.org/index.php?topic=143221.0', 5, 7),
(88, 'https://explorer.novaco.in/', 7, 7),
(89, 'https://github.com/novacoin-project/novacoin', 8, 7),
(94, 'http://node1.devcoin.cloud', 7, 8),
(95, 'https://github.com/devcoin/core', 8, 8),
(100, 'https://forum.feathercoin.com', 4, 9),
(101, 'https://bitcointalk.org/index.php?topic=178286.0', 5, 9),
(102, 'https://telegram.me/feathercoinofficial', 6, 9),
(103, 'http://explorer.feathercoin.com/', 7, 9),
(104, 'https://chainz.cryptoid.info/ftc/', 7, 9),
(105, 'https://fsight.chain.tips/', 7, 9),
(106, 'https://github.com/FeatherCoin/Feathercoin', 8, 9),
(111, 'https://www.mincoinforum.com', 4, 10),
(112, 'https://bitcointalk.org/index.php?topic=165397.0', 5, 10),
(113, 'http://cryptoexplore.com', 7, 10),
(114, 'https://www.mincoinexplorer.com/', 7, 10),
(115, 'https://github.com/mincoin', 8, 10),
(116, 'http://freico.in', 1, 11),
(117, 'http://freico.in/docs/freimarkets.pdf', 2, 11),
(118, 'https://twitter.com/Freicoin', 9, 11),
(119, 'https://freicoinalliance.com/', 4, 11),
(120, 'http://freicoin.info/chain/Freicoin', 7, 11),
(121, 'https://github.com/freicoin/freicoin', 8, 11),
(122, 'http://chncoin.org/', 1, 12),
(123, 'https://chainz.cryptoid.info/cnc/', 7, 12),
(124, 'https://github.com/CHNCoin/CHNCoin', 8, 12),
(127, 'https://www.ixcoin.net/', 1, 14),
(128, 'https://www.scribd.com/document/357320345/Ixc-White-Paper-v3', 2, 14),
(129, 'https://twitter.com/iXcoin_News', 9, 14),
(130, 'https://bitcointalk.org/index.php?topic=36218.0', 5, 14),
(131, 'https://chainz.cryptoid.info/ixc/', 7, 14),
(132, 'https://prohashing.com/explorer/IXcoin/', 7, 14),
(133, 'https://github.com/ixcore/ixcoin', 8, 14),
(134, 'http://bitbar.co/', 1, 15),
(135, 'https://bitbar.co/#xl_xr_page_status', 2, 15),
(136, 'https://twitter.com/spider_btb', 9, 15),
(137, 'https://reddit.com/r/bitbar', 3, 15),
(138, 'https://bitcointalk.org/index.php?topic=196125.0', 5, 15),
(139, 'http://btb.altcoinwarz.com', 7, 15),
(140, 'https://github.com/Bitbarcoin/bitbar', 8, 15),
(141, 'https://discord.gg/VcEAMFX', 6, 15),
(142, 'http://bytecoin.biz', 1, 16),
(143, 'http://bte.cryptocoinexplorer.com', 7, 16),
(144, 'http://www.worldcoin.global/index.html', 1, 17),
(145, 'https://reddit.com/r/worldcoinalliance', 3, 17),
(146, 'https://bitcointalk.org/index.php?topic=204894.0', 5, 17),
(147, 'https://discord.gg/q5fYSVP', 6, 17),
(148, 'https://www.wdcexplorer.com/', 7, 17),
(149, 'https://chainz.cryptoid.info/wdc/', 7, 17),
(150, 'https://github.com/worldcoinproject/worldcoin-v0.8', 8, 17),
(155, 'https://bitcointalk.org/index.php?topic=206577.0', 5, 18),
(156, 'https://coinplorer.com/YAC', 7, 18),
(157, 'https://github.com/yacoin/yacoin/releases', 8, 18),
(158, 'http://digitalcoin.co', 1, 19),
(159, 'https://github.com/lomtax/digitalcoin/blob/master/README.md', 2, 19),
(160, 'https://twitter.com/DigitalcoinDGC', 9, 19),
(161, 'https://reddit.com/r/digitalcoin', 3, 19),
(162, 'https://bitcointalk.org/index.php?topic=209508.0', 5, 19),
(163, 'http://dgc.blockr.io', 7, 19),
(164, 'https://chainz.cryptoid.info/dgc/', 7, 19),
(165, 'https://github.com/lomtax/digitalcoin', 8, 19),
(166, 'http://frankos.org', 1, 20),
(167, 'https://twitter.com/FrankoCurrency', 9, 20),
(168, 'https://bitcointalk.org/index.php?topic=202417.0', 5, 20),
(169, 'https://cryptobe.com/chain/FrankoCoin', 7, 20),
(170, 'https://github.com/franko-org/franko', 8, 20),
(171, 'http://elc.22web.org/', 1, 21),
(172, 'https://bitcointalk.org/index.php?topic=766417.0', 5, 21),
(173, 'http://51.255.13.23:30004', 7, 21),
(174, 'https://github.com/TheRCG/Elacoin', 8, 21),
(175, 'http://memecoin.org', 1, 22),
(176, 'http://luckycoinfoundation.org', 1, 23),
(177, 'http://54.213.97.176:49917/chain/luckycoin', 7, 23),
(178, 'https://github.com/getnibble/nibble', 1, 24),
(179, 'http://amccoin.com', 1, 25),
(180, 'https://goldcoinweb.com/', 1, 26),
(181, 'https://goldcoin.org/documents/GoldCoin_0.7_51percent_defense_october_11_2013.pdf', 2, 26),
(182, 'https://twitter.com/goldcoin', 9, 26),
(183, 'https://reddit.com/r/goldcoin', 3, 26),
(184, 'https://www.goldcointalk.org', 4, 26),
(185, 'https://bitcointalk.org/index.php?topic=317568', 5, 26),
(186, 'https://t.me/goldcoin', 6, 26),
(187, 'https://chainz.cryptoid.info/glc/', 7, 26),
(188, 'https://github.com/goldcoin', 8, 26),
(190, 'http://jkc.cryptocoinexplorer.com', 7, 27),
(191, 'https://github.com/muddafudda/Hypercoin-fork', 1, 28);

-- --------------------------------------------------------

--
-- Table structure for table `url_masters`
--

CREATE TABLE `url_masters` (
  `id` int(11) NOT NULL,
  `urlType` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `url_masters`
--

INSERT INTO `url_masters` (`id`, `urlType`) VALUES
(1, 'website'),
(2, 'technical_doc'),
(3, 'reddit'),
(4, 'message_board'),
(5, 'announcement'),
(6, 'chat'),
(7, 'explorer'),
(8, 'source_code'),
(9, 'twitter');

-- --------------------------------------------------------

--
-- Table structure for table `user_activities`
--

CREATE TABLE `user_activities` (
  `id` int(11) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userAuthenticationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_authentications`
--

CREATE TABLE `user_authentications` (
  `id` int(11) NOT NULL,
  `google_email` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `facebook_email` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `google_avatar_url` varchar(255) DEFAULT NULL,
  `facebook_avatar_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_authentications`
--

INSERT INTO `user_authentications` (`id`, `google_email`, `google_id`, `facebook_email`, `facebook_id`, `google_avatar_url`, `facebook_avatar_url`, `createdAt`, `updatedAt`) VALUES
(2, NULL, '111617599880282229692', NULL, NULL, 'https://lh3.googleusercontent.com/a-/AAuE7mDDGTC99kQQ3jNig1q32m-OK5aSDrd1PETS8Z-e=s50', NULL, '2019-09-28 21:23:51', '2019-09-28 21:23:51'),
(3, NULL, NULL, 'kamlesh.dhondge@gmail.com', '10219831572401491', NULL, 'https://graph.facebook.com/v2.6/10219831572401491/picture?type=large', '2019-09-28 22:18:37', '2019-09-28 22:18:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coin_masters`
--
ALTER TABLE `coin_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `url_coin_relations`
--
ALTER TABLE `url_coin_relations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `urlMasterId` (`urlMasterId`),
  ADD KEY `coinMasterId` (`coinMasterId`);

--
-- Indexes for table `url_masters`
--
ALTER TABLE `url_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAuthenticationId` (`userAuthenticationId`);

--
-- Indexes for table `user_authentications`
--
ALTER TABLE `user_authentications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coin_masters`
--
ALTER TABLE `coin_masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `url_coin_relations`
--
ALTER TABLE `url_coin_relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT for table `url_masters`
--
ALTER TABLE `url_masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_activities`
--
ALTER TABLE `user_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_authentications`
--
ALTER TABLE `user_authentications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `url_coin_relations`
--
ALTER TABLE `url_coin_relations`
  ADD CONSTRAINT `url_coin_relations_ibfk_1` FOREIGN KEY (`urlMasterId`) REFERENCES `url_masters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `url_coin_relations_ibfk_2` FOREIGN KEY (`coinMasterId`) REFERENCES `coin_masters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD CONSTRAINT `user_activities_ibfk_1` FOREIGN KEY (`userAuthenticationId`) REFERENCES `user_authentications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
