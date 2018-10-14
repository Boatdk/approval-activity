-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 14, 2018 at 07:44 PM
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
  `id` int(10) NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `facaulty` text CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) NOT NULL,
  `tel` text CHARACTER SET utf8 NOT NULL,
  `expiryDate` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `samo` tinyint(1) NOT NULL,
  `sUnion` tinyint(1) NOT NULL,
  `sCouncil` tinyint(1) NOT NULL,
  `sAffair` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `name`, `content`, `facaulty`, `status`, `tel`, `expiryDate`, `created_at`, `updated_at`, `samo`, `sUnion`, `sCouncil`, `sAffair`) VALUES
(1, 'โครงการสันทนาการ', 'รับน้อง สันทนาการให้กับน้องๆ', 'COE', 0, '0827778888', '0000-00-00 00:00:00', '2018-09-29 09:42:38', '2018-09-29 09:42:38', 1, 0, 0, 0),
(2, 'โครงการบ้านพักคนชรา', 'ช่วยเหลือคนชรา', 'COE', 0, '0827412587', '0000-00-00 00:00:00', '2018-10-03 20:12:04', '2018-10-03 20:12:04', 0, 0, 0, 0),
(3, 'โครงการเตรียมความพร้อมเขียนโปรแกรม', 'เป็นการสอน หรือ จัดติวเตรียมความพร้อมให้กับ น้องๆที่เข้ามาใหม่ เพื่อที่จะนำความรู้ไปใช้ในการเรียนจริงก่อนที่จะเปิดภาคเรียน', 'COE', 0, '0852541236', '0000-00-00 00:00:00', '2018-10-04 13:22:27', '2018-10-04 13:22:27', 0, 0, 0, 0),
(4, 'โครงการ BIG cleaning day 2018', 'จะนำนักศึกษาไปทำการเก็บขยะรอบรั้วมหาวิทยาลัยเพื่อให้มหาวิทยาลัยสวยงามมากยิ่งขึ้น', 'COE', 0, '0812587892', '0000-00-00 00:00:00', '2018-10-04 14:47:23', '2018-10-04 14:47:23', 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
