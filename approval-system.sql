-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 07, 2019 at 07:56 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `approval-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id_activity` int(11) NOT NULL,
  `org_name` text CHARACTER SET utf8 NOT NULL,
  `book_num` text CHARACTER SET utf8 NOT NULL,
  `act_name` text CHARACTER SET utf8 NOT NULL,
  `dear_to` text CHARACTER SET utf8 NOT NULL,
  `act_place` text CHARACTER SET utf8 NOT NULL,
  `act_money` int(11) NOT NULL,
  `mn_from` text CHARACTER SET utf8 NOT NULL,
  `act_hours` int(11) NOT NULL,
  `tel` text CHARACTER SET utf8 NOT NULL,
  `act_end` date NOT NULL,
  `act_start` date NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id_activity`, `org_name`, `book_num`, `act_name`, `dear_to`, `act_place`, `act_money`, `mn_from`, `act_hours`, `tel`, `act_end`, `act_start`, `updated_at`, `created_at`, `expiryDate`) VALUES
(1, 'สโมสรนักศึกษาคณะวิเทศศึกษา', 'วศ.1', 'กิจกรรมสันทนาการ', 'กิจกรรมสันทนาการ', 'บริเวณโรงอาหารใหม่', 37500, 'สโมสรนักศึกษา', 65, '0843512088', '2018-12-29', '2018-12-27', '2018-12-10 20:16:51', '2018-12-10 20:16:51', '0000-00-00 00:00:00'),
(2, 'ชมรมพระพุทธศาสนา', 'ชร.1/5', 'ทำบุญวันพระ ครั้งที่1', 'รองอธิการบดีวิทยาเขตภูเก็ต', 'วัดกะทู้', 1000, 'ชมรมพระพุทธศาสนา', 4, '0815552588', '2018-12-22', '2018-12-22', '2018-12-10 20:21:53', '2018-12-10 20:21:53', '0000-00-00 00:00:00'),
(3, 'ชมรมถ่ายภาพ', 'ชร.2/5', 'Rookie for photographer', 'รองอธิการบดีวิทยาเขตภูเก็ต', 'เชียงใหม่', 100000, 'ชมรมถ่ายภาพ', 0, '026541234', '2018-12-29', '2019-01-16', '2018-12-10 20:40:13', '2018-12-10 20:40:13', '0000-00-00 00:00:00'),
(4, 'สวัสดี', 'สน.1', 'กิจกรรมสานสัมพันธ์พี่น้อง', 'รองอธิการบดีวิทยาเขตภูเก็ต', 'บริเวณโรงอาหารใหม่', 10000, 'สถาบั5555555น', 3, '0844444446', '0000-00-00', '0000-00-00', '2019-02-27 03:11:13', '2019-02-27 03:11:13', '0000-00-00 00:00:00'),
(5, 'yrd', 'fsdfsf', 'sdfsfsf', 'sfsff', 'fdsfsf', 2222, 'ffff', 2, '12312313123', '2019-02-28', '2019-02-13', '2019-02-27 03:42:17', '2019-02-27 03:42:17', '0000-00-00 00:00:00'),
(6, 'dsadad', 'asdadad', 'asdadad', 'asdasd', 'daddd', 222222, 'ddddd', 555, '1111111111', '2019-02-21', '2019-02-13', '2019-02-27 03:43:49', '2019-02-27 03:43:49', '0000-00-00 00:00:00'),
(7, 'yrd', 'zd', 'dd', 'sfsff', 'fdsfsf', 2222, 'ddddd', 555, '000000000000000', '2019-03-20', '2019-04-13', '2019-02-27 03:44:57', '2019-02-27 03:44:57', '0000-00-00 00:00:00'),
(8, 'wwwwwwwwwww', 'wwwwwwwwwwwww', 'wwwwwwwww', 'wwwwwwwwwww', 'wwwwwwww', 888888888, 'wwwwwwwwwww', 8, '888888888888', '2019-03-21', '2019-03-07', '2019-02-27 03:52:06', '2019-02-27 03:52:06', '0000-00-00 00:00:00'),
(9, 'yrd', 'zd', 'asdadad', 'asdasd', 'wwwwwwww', 2222, 'wwwwwwwwwww', 2, '12312313123', '2019-02-23', '2019-02-02', '2019-02-27 03:54:05', '2019-02-27 03:54:05', '0000-00-00 00:00:00'),
(10, 'dsadad', 'fsdfsf', 'sdfsfsf', 'wwwwwwwwwww', 'wwwwwwww', 2222, 'ddddd', 555, '12312313123', '2019-02-22', '2019-04-12', '2019-02-27 04:00:24', '2019-02-27 04:00:24', '0000-00-00 00:00:00'),
(11, 'dsadad', 'asdadad', 'asdadad', 'asdasd', 'fdsfsf', 2222, 'wwwwwwwwwww', 555, '1111111111', '2019-02-23', '2019-02-23', '2019-02-27 04:03:56', '2019-02-27 04:03:56', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `fileactivity`
--

CREATE TABLE `fileactivity` (
  `id_file` int(11) NOT NULL,
  `filename` text CHARACTER SET utf8 NOT NULL,
  `id_activity` int(11) NOT NULL,
  `path` text CHARACTER SET utf8 NOT NULL,
  `mimetype` text CHARACTER SET utf8 NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fileactivity`
--

INSERT INTO `fileactivity` (`id_file`, `filename`, `id_activity`, `path`, `mimetype`, `created_at`) VALUES
(1, 'k83amyxe5_5hwd3w0bq.png', 0, 'uploadsk83amyxe5_5hwd3w0bq.png', '', '2019-02-27 03:29:49'),
(2, 'qfp6ml2zi_cb4gv9vpt.jpg', 0, 'uploadsqfp6ml2zi_cb4gv9vpt.jpg', '', '2019-02-27 03:52:44'),
(3, '', 10, '', '', '2019-02-27 04:00:24'),
(4, '', 11, '', '', '2019-02-27 04:03:56'),
(5, '281dh60sr_auo9d6ose.jpg', 0, 'uploads281dh60sr_auo9d6ose.jpg', '', '2019-02-27 04:23:40'),
(6, 'zn2kyl1lr_xhh8ak9qh.jpg', 0, 'uploadszn2kyl1lr_xhh8ak9qh.jpg', '', '2019-02-27 04:31:56'),
(7, 'pxyv5aw38_ss8jrimyr.jpg', 1, 'uploadspxyv5aw38_ss8jrimyr.jpg', '', '2019-02-27 04:33:07'),
(8, '55j73gdv0_gtz9k6stp.jpg', 1, 'uploads55j73gdv0_gtz9k6stp.jpg', '', '2019-02-27 14:58:00');

-- --------------------------------------------------------

--
-- Table structure for table `statusactivity`
--

CREATE TABLE `statusactivity` (
  `id` int(11) NOT NULL,
  `id_activity` int(11) NOT NULL,
  `adv` int(10) NOT NULL,
  `stdU` int(10) NOT NULL,
  `council` int(10) NOT NULL,
  `affair` int(10) NOT NULL,
  `director` int(10) NOT NULL,
  `assistance_ch` int(10) NOT NULL,
  `vice_ch` int(10) NOT NULL,
  `result` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statusactivity`
--

INSERT INTO `statusactivity` (`id`, `id_activity`, `adv`, `stdU`, `council`, `affair`, `director`, `assistance_ch`, `vice_ch`, `result`) VALUES
(1, 1, 2, 0, 1, 1, 1, 1, 1, 0),
(2, 2, 2, 0, 0, 0, 0, 0, 0, 0),
(3, 3, 1, 1, 1, 1, 1, 1, 1, 0),
(4, 4, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 5, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 6, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 7, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 8, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 9, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 10, 0, 0, 0, 0, 0, 0, 0, 0),
(11, 11, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `firstname` text CHARACTER SET utf8 NOT NULL,
  `lastname` text CHARACTER SET utf8 NOT NULL,
  `email` text CHARACTER SET utf8 NOT NULL,
  `tel` text NOT NULL,
  `password` text CHARACTER SET utf8 NOT NULL,
  `type` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `firstname`, `lastname`, `email`, `tel`, `password`, `type`) VALUES
(1, 'Panitarn', 'DK', 'momomika.rag@gmail.com', '12312313123', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', 1),
(2, 'Tester1', 'test', 'Test@hotmail.com', '0145621236', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', 0),
(3, 'Boat', 'dk', 'Boatdk@hotmail.com', '1234567890', '8cb2237d0679ca88db6464eac60da96345513964', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id_activity`);

--
-- Indexes for table `fileactivity`
--
ALTER TABLE `fileactivity`
  ADD PRIMARY KEY (`id_file`);

--
-- Indexes for table `statusactivity`
--
ALTER TABLE `statusactivity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id_activity` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `fileactivity`
--
ALTER TABLE `fileactivity`
  MODIFY `id_file` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `statusactivity`
--
ALTER TABLE `statusactivity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
