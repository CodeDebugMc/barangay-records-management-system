-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2025 at 02:41 PM
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
(1, 'BRGY 145', '/uploads/1758794631905.png', '#f07e0f', 'BSIT4B', '#f07e0f', '2025-09-25 12:34:00');

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
(6, 'arden2', '$2b$10$b1XhC6JDxrQHwHlkFJZzeev4HTv3jmYSGX59IISiwmc1KP9Nuu19i', 'user', 'user', '2025-09-25 12:31:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company_settings`
--
ALTER TABLE `company_settings`
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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
