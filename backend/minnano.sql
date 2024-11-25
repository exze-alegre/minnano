-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 06:00 AM
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

--
-- Dumping data for table `basket_items`
--

INSERT INTO `basket_items` (`basket_item_id`, `user_id`, `product_id`, `variation_id`, `discount_price`, `quantity`, `added_at`) VALUES
(104, 1, 2, 3, 660.00, 1, '2024-11-24 03:47:45'),
(105, 1, 8, 15, 1097.00, 3, '2024-11-24 06:32:10'),
(106, 1, 1, 1, 451.00, 1, '2024-11-24 07:51:21'),
(107, 1, 3, 5, 95.00, 1, '2024-11-24 21:09:55');

-- --------------------------------------------------------

--
-- Table structure for table `checkout_unused`
--

CREATE TABLE `checkout_unused` (
  `checkout_id` int(11) NOT NULL,
  `basket_item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) NOT NULL,
  `variation_id` int(11) NOT NULL,
  `variation_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `added_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `basket_item_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `selected_variation` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`selected_variation`)),
  `discount_price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `variation_id` int(11) DEFAULT NULL,
  `variation_name` varchar(255) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `basket_item_id`, `price`, `product_id`, `product_name`, `quantity`, `selected_variation`, `discount_price`, `image`, `variation_id`, `variation_name`, `added_at`) VALUES
(12, 1, 104, 700.00, 2, 'Unicorn Dream', 1, '{\"variation_id\":3,\"variation_name\":\"Pink Unicorn Dream\",\"discount_price\":\"660.00\",\"image\":\"https://via.placeholder.com/255?text=Pink+Unicorn+Dream\"}', 660.00, NULL, 3, NULL, '2024-11-24 21:56:56');

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
  `image3` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discountPrice`, `rating`, `image1`, `image2`, `image3`) VALUES
(1, 'Bear Buddy Bestfriend Bayot', 'A soft and cuddly bear plush toy, perfect for kids and collectors.', 500.00, 450.00, 4.80, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3'),
(2, 'Unicorn Dream', 'A magical unicorn plush with sparkly horn and rainbow mane.', 700.00, 650.00, 4.90, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3'),
(3, 'Panda Pals', 'Adorable panda plush with bamboo accessory.', 299.99, 100.00, 4.70, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3'),
(4, 'Kitty Cuddles', 'A small kitten plush with a playful pose.', 400.00, 380.00, 4.50, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3'),
(5, 'Bunny Hop', 'Cute bunny plush with floppy ears and soft fur.', 600.00, 580.00, 4.60, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3'),
(6, 'Dragon Puff', 'A fierce but friendly dragon plush with detailed wings.', 299.99, 200.00, 3.80, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3'),
(7, 'Foxy Friend', 'Charming fox plush with a bushy tail and sly expression.', 520.00, 500.00, 4.40, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3'),
(8, 'Elephant Hugs', 'A large elephant plush toy with soft gray fur.', 1200.00, 1100.00, 4.80, 'https://via.placeholder.com/255?text=Image+1', 'https://via.placeholder.com/255?text=Image+2', 'https://via.placeholder.com/255?text=Image+3');

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
-- Table structure for table `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_addresses`
--

INSERT INTO `shipping_addresses` (`id`, `user_id`, `full_name`, `address`, `contact_number`, `created_at`) VALUES
(1, 1, 'Akina Rexzel Ann Alegre', 'Holy Name University, Janssen Heights, 6300 J.A. C...', '09123456789', '2024-11-24 08:40:41'),
(2, 1, 'Kyle Joshua Yamson', 'Holy Name University, Janssen Heights, 6300 J.A. C...', '09694208008', '2024-11-24 16:26:10');

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

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Kairu', 'projectemail@mail.com', 'minnano123', '2024-11-23 07:22:08');

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
(1, 1, 'Brown Bear Buddy', 451.00, 'https://via.placeholder.com/255?text=Brown+Bear+Buddy'),
(2, 1, 'Pink Bear Buddy', 455.00, 'https://via.placeholder.com/255?text=Pink+Bear+Buddy'),
(3, 2, 'Pink Unicorn Dream', 660.00, 'https://via.placeholder.com/255?text=Pink+Unicorn+Dream'),
(4, 2, 'Blue Unicorn Dream', 653.00, 'https://via.placeholder.com/255?text=Blue+Unicorn+Dream'),
(5, 3, 'Black Panda Pals', 95.00, 'https://via.placeholder.com/255?text=Black+Panda+Pals'),
(6, 3, 'White Panda Pals', 98.00, 'https://via.placeholder.com/255?text=White+Panda+Pals'),
(7, 4, 'Gray Kitty Cuddles', 376.00, 'https://via.placeholder.com/255?text=Gray+Kitty+Cuddles'),
(8, 4, 'White Kitty Cuddles', 374.00, 'https://via.placeholder.com/255?text=White+Kitty+Cuddles'),
(9, 5, 'White Bunny Hop', 575.00, 'https://via.placeholder.com/255?text=White+Bunny+Hop'),
(10, 5, 'Pink Bunny Hop', 582.00, 'https://via.placeholder.com/255?text=Pink+Bunny+Hop'),
(11, 6, 'Green Dragon Puff', 194.00, 'https://via.placeholder.com/255?text=Green+Dragon+Puff'),
(12, 6, 'Red Dragon Puff', 196.00, 'https://via.placeholder.com/255?text=Red+Dragon+Puff'),
(13, 7, 'Orange Foxy Friend', 508.00, 'https://via.placeholder.com/255?text=Orange+Foxy+Friend'),
(14, 7, 'Brown Foxy Friend', 498.00, 'https://via.placeholder.com/255?text=Brown+Foxy+Friend'),
(15, 8, 'Gray Elephant Hugs', 1097.00, 'https://via.placeholder.com/255?text=Gray+Elephant+Hugs'),
(16, 8, 'Pink Elephant Hugs', 1101.00, 'https://via.placeholder.com/255?text=Pink+Elephant+Hugs');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `min_spend` decimal(10,2) DEFAULT 0.00,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `code`, `discount_type`, `discount_value`, `min_spend`, `active`) VALUES
(8, 'DISCOUNT5', 'percentage', 5.00, 0.00, 1),
(9, 'FLAT50', 'fixed', 50.00, 500.00, 1),
(10, 'DISCOUNT15', 'percentage', 15.00, 1000.00, 1),
(11, 'DISCOUNT25', 'percentage', 25.00, 1500.00, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basket_items`
--
ALTER TABLE `basket_items`
  ADD PRIMARY KEY (`basket_item_id`);

--
-- Indexes for table `checkout_unused`
--
ALTER TABLE `checkout_unused`
  ADD PRIMARY KEY (`checkout_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

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
-- Indexes for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basket_items`
--
ALTER TABLE `basket_items`
  MODIFY `basket_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `checkout_unused`
--
ALTER TABLE `checkout_unused`
  MODIFY `checkout_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `variations`
--
ALTER TABLE `variations`
  MODIFY `variations_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

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
