-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2024 at 01:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minnano`
--

-- --------------------------------------------------------

--
-- Table structure for table `basket_items`
--

CREATE TABLE `basket_items` (
  `basket_item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variation_id` int(11) DEFAULT NULL,
  `discount_price` decimal(10,2) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discountPrice` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL CHECK (`rating` between 0 and 5),
  `image1` text DEFAULT NULL,
  `image2` text DEFAULT NULL,
  `image3` text DEFAULT NULL,
  `image4` text DEFAULT NULL,
  `image5` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discountPrice`, `rating`, `image1`, `image2`, `image3`, `image4`, `image5`) VALUES
(1, 'Bear Buddy Bestfriend Bayot', 'A soft and cuddly bear plush toy, perfect for kids and collectors.', '500.00', '450.00', '4.80', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5'),
(2, 'Unicorn Dream', 'A magical unicorn plush with sparkly horn and rainbow mane.', '700.00', '650.00', '4.90', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5'),
(3, 'Panda Pals', 'Adorable panda plush with bamboo accessory.', '299.99', '100.00', '4.70', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5'),
(4, 'Kitty Cuddles', 'A small kitten plush with a playful pose.', '400.00', '380.00', '4.50', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5'),
(5, 'Bunny Hop', 'Cute bunny plush with floppy ears and soft fur.', '600.00', '580.00', '4.60', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5'),
(6, 'Dragon Puff', 'A fierce but friendly dragon plush with detailed wings.', '299.99', '200.00', '3.80', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5'),
(7, 'Foxy Friend', 'Charming fox plush with a bushy tail and sly expression.', '520.00', '500.00', '4.40', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5'),
(8, 'Elephant Hugs', 'A large elephant plush toy with soft gray fur.', '1200.00', '1100.00', '4.80', 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3', 'https://via.placeholder.com/255?text=Image+4', 'https://via.placeholder.com/255?text=Image+5');

-- --------------------------------------------------------

--
-- Table structure for table `product_tags`
--

CREATE TABLE `product_tags` (
  `product_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_tags`
--

INSERT INTO `product_tags` (`product_id`, `tag_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 5),
(3, 7),
(4, 1),
(4, 4),
(5, 2),
(5, 4),
(6, 6),
(6, 2),
(7, 4),
(7, 7),
(8, 1),
(8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(1, 'soft'),
(2, 'plushy'),
(3, 'cuddly'),
(4, 'cute'),
(5, 'magical'),
(6, 'detailed'),
(7, 'adorable');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variations`
--

CREATE TABLE `variations` (
  `variations_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variation_name` varchar(255) NOT NULL,
  `discount_price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variations`
--

INSERT INTO `variations` (`variations_id`, `product_id`, `variation_name`, `discount_price`, `image`) VALUES
(1, 1, 'Brown Bear Buddy', '451.00', 'https://via.placeholder.com/255?text=Brown+Bear+Buddy'),
(2, 1, 'Pink Bear Buddy', '455.00', 'https://via.placeholder.com/255?text=Pink+Bear+Buddy'),
(3, 2, 'Pink Unicorn Dream', '660.00', 'https://via.placeholder.com/255?text=Pink+Unicorn+Dream'),
(4, 2, 'Blue Unicorn Dream', '653.00', 'https://via.placeholder.com/255?text=Blue+Unicorn+Dream'),
(5, 3, 'Black Panda Pals', '95.00', 'https://via.placeholder.com/255?text=Black+Panda+Pals'),
(6, 3, 'White Panda Pals', '98.00', 'https://via.placeholder.com/255?text=White+Panda+Pals'),
(7, 4, 'Gray Kitty Cuddles', '376.00', 'https://via.placeholder.com/255?text=Gray+Kitty+Cuddles'),
(8, 4, 'White Kitty Cuddles', '374.00', 'https://via.placeholder.com/255?text=White+Kitty+Cuddles'),
(9, 5, 'White Bunny Hop', '575.00', 'https://via.placeholder.com/255?text=White+Bunny+Hop'),
(10, 5, 'Pink Bunny Hop', '582.00', 'https://via.placeholder.com/255?text=Pink+Bunny+Hop'),
(11, 6, 'Green Dragon Puff', '194.00', 'https://via.placeholder.com/255?text=Green+Dragon+Puff'),
(12, 6, 'Red Dragon Puff', '196.00', 'https://via.placeholder.com/255?text=Red+Dragon+Puff'),
(13, 7, 'Orange Foxy Friend', '508.00', 'https://via.placeholder.com/255?text=Orange+Foxy+Friend'),
(14, 7, 'Brown Foxy Friend', '498.00', 'https://via.placeholder.com/255?text=Brown+Foxy+Friend'),
(15, 8, 'Gray Elephant Hugs', '1097.00', 'https://via.placeholder.com/255?text=Gray+Elephant+Hugs'),
(16, 8, 'Pink Elephant Hugs', '1101.00', 'https://via.placeholder.com/255?text=Pink+Elephant+Hugs');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basket_items`
--
ALTER TABLE `basket_items`
  ADD PRIMARY KEY (`basket_item_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variation_id` (`variation_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `variations`
--
ALTER TABLE `variations`
  ADD PRIMARY KEY (`variations_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basket_items`
--
ALTER TABLE `basket_items`
  MODIFY `basket_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `variations`
--
ALTER TABLE `variations`
  MODIFY `variations_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `basket_items`
--
ALTER TABLE `basket_items`
  ADD CONSTRAINT `basket_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `basket_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `basket_items_ibfk_3` FOREIGN KEY (`variation_id`) REFERENCES `variations` (`variations_id`) ON DELETE SET NULL;

--
-- Constraints for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD CONSTRAINT `product_tags_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Constraints for table `variations`
--
ALTER TABLE `variations`
  ADD CONSTRAINT `variations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
