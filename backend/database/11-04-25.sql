-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2025 at 09:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barangay_145`
--

-- --------------------------------------------------------

--
-- Table structure for table `company_settings`
--

CREATE TABLE `company_settings` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `header_color` varchar(50) DEFAULT '#1976d2',
  `footer_text` varchar(255) DEFAULT 'Default Footer Text',
  `footer_color` varchar(50) DEFAULT '#f5f5f5',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_settings`
--

INSERT INTO `company_settings` (`id`, `company_name`, `logo_url`, `header_color`, `footer_text`, `footer_color`, `updated_at`) VALUES
(1, 'Barangay 145', '/uploads/1760339416528.png', '#ff7e38', '143', '#fbc228', '2025-10-13 07:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `financial_assistance`
--

CREATE TABLE `financial_assistance` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `income` decimal(12,2) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `date_issued` date DEFAULT NULL,
  `transaction_number` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `financial_assistance`
--

INSERT INTO `financial_assistance` (`id`, `name`, `age`, `birthdate`, `address`, `income`, `purpose`, `date_issued`, `transaction_number`, `is_active`, `date_created`, `date_updated`) VALUES
(1, 'john doe', 20, '2025-10-23', 'Taga caloocan', 3000.00, 'Electricity', '2025-11-04', 'FA-251104-358', 0, '2025-11-04 08:28:57', '2025-11-04 08:31:54'),
(2, 'John Doe', 20, '2025-10-23', 'Taga caloocan', 4000.00, 'Electricity', '2025-10-23', 'FA-251104-130', 1, '2025-11-04 08:38:14', '2025-11-04 08:38:14'),
(3, 'Kevin', 20, '2025-10-23', 'Taga caloocan', 5000.00, 'Electricity', '2025-10-23', 'FA-251104-757', 1, '2025-11-04 08:39:07', '2025-11-04 08:39:07'),
(4, 'Anselm', 20, '2025-10-23', 'Taga caloocan', 3000.00, 'Electricity', '2025-10-23', 'FA-251104-282', 1, '2025-11-04 08:40:52', '2025-11-04 08:40:52');

-- --------------------------------------------------------

--
-- Table structure for table `leave_table`
--

CREATE TABLE `leave_table` (
  `leave_code` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `number_hours` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page_access`
--

CREATE TABLE `page_access` (
  `id` int(11) NOT NULL,
  `page_privilege` tinyint(4) DEFAULT NULL,
  `page_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page_table`
--

CREATE TABLE `page_table` (
  `id` int(11) NOT NULL,
  `page_description` varchar(255) DEFAULT NULL,
  `page_group` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(500) NOT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `income` decimal(12,2) DEFAULT NULL,
  `date_issued` date DEFAULT curdate(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `name`, `age`, `birthdate`, `address`, `purpose`, `income`, `date_issued`, `created_at`, `updated_at`) VALUES
(1, 'Juan Dela Cruz', 45, '1980-12-26', '216 Magaling St., Barangay 145', 'Electrician / Financial Assistance', 2500.00, '2025-09-17', '2025-10-15 06:26:59', '2025-10-15 06:26:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access_level` varchar(255) DEFAULT 'user',
  `role` enum('user','superadmin','admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `access_level`, `role`, `created_at`) VALUES
(1, 'juan', '$2b$10$8sMEj1nhY.qTR9tXFdhUu.8HdBPJ5oPVJzplVARJeafP8Gya56GOG', 'user', 'user', '2025-09-22 05:34:32'),
(2, 'pedro', '$2b$10$4RxQGBdZEmvOZDBssk/8heZPVoLepnQ0kMFJSaO2HKcTZ6rg1a2My', 'user', 'superadmin', '2025-09-22 05:36:14'),
(3, 'dagol', '$2b$10$ungdpUOKgZjVRfhPeENUV.owOWlIRy9PQy/QU3xJ8o8Fl4T/cVJTe', 'user', 'user', '2025-09-22 06:38:26'),
(4, 'arden', '$2b$10$gLrgp0zPsPBAknKiHS7/peh4uQ8Ea/t4mdFnSiRTwTxHonpg5kuLS', 'user', 'user', '2025-09-25 12:29:37'),
(5, 'arden1', '$2b$10$sFP7po9n1ilV4ovS2V6mT.RKUD4LPVu6qzfOOdnh3votI5cV6wGIi', 'user', 'user', '2025-09-25 12:30:46'),
(6, 'arden2', '$2b$10$b1XhC6JDxrQHwHlkFJZzeev4HTv3jmYSGX59IISiwmc1KP9Nuu19i', 'user', 'user', '2025-09-25 12:31:22'),
(7, 'mc', '$2b$10$3VPkw5DgyDJd.KJSOSbUa.8sZxTawvpM3p0BBAb1.d7PA/uH2CP6K', 'user', 'user', '2025-10-15 05:27:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company_settings`
--
ALTER TABLE `company_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `financial_assistance`
--
ALTER TABLE `financial_assistance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_table`
--
ALTER TABLE `leave_table`
  ADD PRIMARY KEY (`leave_code`);

--
-- Indexes for table `page_access`
--
ALTER TABLE `page_access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `page_id` (`page_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `page_table`
--
ALTER TABLE `page_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company_settings`
--
ALTER TABLE `company_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `financial_assistance`
--
ALTER TABLE `financial_assistance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leave_table`
--
ALTER TABLE `leave_table`
  MODIFY `leave_code` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_access`
--
ALTER TABLE `page_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_table`
--
ALTER TABLE `page_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `page_access`
--
ALTER TABLE `page_access`
  ADD CONSTRAINT `page_access_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `page_table` (`id`),
  ADD CONSTRAINT `page_access_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
