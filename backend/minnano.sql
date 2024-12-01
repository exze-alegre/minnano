-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2024 at 04:18 PM
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
(112, 2, 4, 7, 376.00, 2, '2024-11-29 09:58:00'),
(177, 1, 8, 16, 1101.00, 1, '2024-12-01 06:41:22');

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
  `shipping_address_id` int(11) DEFAULT NULL,
  `basket_item_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `variation_id` int(11) DEFAULT NULL,
  `variation_name` varchar(255) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `shipping` int(11) DEFAULT NULL,
  `total_payment` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `saved` int(11) DEFAULT NULL,
  `order_group_id` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `shipping_address_id`, `basket_item_id`, `price`, `product_id`, `product_name`, `quantity`, `discount_price`, `image`, `variation_id`, `variation_name`, `added_at`, `shipping`, `total_payment`, `payment_method`, `saved`, `order_group_id`, `status_id`) VALUES
(98, 1, 1, 178, 950.00, 11, 'Lion King', 1, 910.00, '/productvariations/brownlion.jpg', 76, 'Brown Lion King', '2024-12-01 13:43:49', 120, 1373.75, 'Cash on Delivery', 296, '18388', 2),
(99, 1, 1, 179, 600.00, 12, 'Zebra Zing', 1, 565.00, '/productvariations/grayzebra.jpg', 78, 'Gray Zebra Zing', '2024-12-01 13:43:49', 120, 1373.75, 'Cash on Delivery', 296, '18388', 2),
(100, 1, 1, 175, 299.99, 3, 'Panda Pals', 1, 95.00, '/productvariations/blackpanda.jpg', 5, 'Black Panda Pals', '2024-12-01 13:44:04', 120, 1133.20, 'Cash on Delivery', 487, '52399', 1),
(101, 1, 1, 176, 1200.00, 8, 'Elephant Hugs', 1, 1097.00, '/productvariations/greyelephant.jpg', 15, 'Gray Elephant Hugs', '2024-12-01 13:44:04', 120, 1133.20, 'Cash on Delivery', 487, '52399', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_statuses`
--

CREATE TABLE `order_statuses` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_statuses`
--

INSERT INTO `order_statuses` (`status_id`, `status_name`, `description`, `created_at`) VALUES
(1, 'On shipping', NULL, '2024-11-30 10:58:34'),
(2, 'Arrived', NULL, '2024-11-30 10:58:34'),
(3, 'Cancelled', NULL, '2024-11-30 10:58:34');

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
  `sold` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discountPrice`, `rating`, `image1`, `image2`, `image3`, `sold`) VALUES
(1, 'Bear Buddy Bestfriend Bayot', 'A soft and cuddly bear plush toy, perfect for kids and collectors.', 500.00, 450.00, 4.80, '/productimages/bear1.jpg', '/productimages/bear2.jpg', '/productimages/bear3.jpg', 564),
(2, 'Unicorn Dream', 'A magical unicorn plush with sparkly horn and rainbow mane.', 700.00, 650.00, 4.90, '/productimages/unicorn1.jpg', '/productimages/unicorn2.jpg', '/productimages/unicorn3.jpg', 392),
(3, 'Panda Pals', 'Adorable panda plush with bamboo accessory.', 299.99, 100.00, 4.70, '/productimages/panda1.jpg', '/productimages/panda2.jpg', '/productimages/panda3.jpg', 570),
(4, 'Kitty Cuddles', 'A small kitten plush with a playful pose.', 400.00, 380.00, 4.50, '/productimages/kitty1.jpg', '/productimages/kitty2.jpg', '/productimages/kitty3.jpg', 470),
(5, 'Bunny Hop', 'Cute bunny plush with floppy ears and soft fur.', 600.00, 580.00, 4.60, '/productimages/bunny1.jpg', '/productimages/bunny2.jpg', '/productimages/bunny3.jpg', 343),
(6, 'Dragon Puff', 'A fierce but friendly dragon plush with detailed wings.', 299.99, 200.00, 3.80, '/productimages/dragon1.jpg', '/productimages/dragon2.jpg', '/productimages/dragon3.jpg', 306),
(7, 'Foxy Friend', 'Charming fox plush with a bushy tail and sly expression.', 520.00, 500.00, 4.40, '/productimages/fox1.jpg', '/productimages/fox2.jpg', '/productimages/fox3.jpg', 502),
(8, 'Elephant Hugs', 'A large elephant plush toy with soft gray fur.', 1200.00, 1100.00, 4.80, '/productimages/elephant1.jpg', '/productimages/elephant2.jpg', '/productimages/elephant3.jpg', 391),
(9, 'Giraffe Giggles', 'A tall, soft giraffe plush with big eyes and a playful smile.', 750.00, 700.00, 4.85, '/productimages/giraffe1.jpg', '/productimages/giraffe2.jpg', '/productimages/giraffe3.jpg', 452),
(10, 'Koala Kuddles', 'A cute and soft koala plush with a eucalyptus leaf.', 500.00, 450.00, 4.70, '/productimages/koala1.jpg', '/productimages/koala2.jpg', '/productimages/koala3.jpg', 483),
(11, 'Lion King', 'A majestic lion plush with a golden mane and fierce eyes.', 950.00, 900.00, 4.80, '/productimages/lion1.jpg', '/productimages/lion2.jpg', '/productimages/lion3.jpg', 460),
(12, 'Zebra Zing', 'A black and white striped zebra plush with a unique design.', 600.00, 550.00, 4.60, '/productimages/zebra1.jpg', '/productimages/zebra2.jpg', '/productimages/zebra3.jpg', 553),
(13, 'Crocodile Crunch', 'A tough but friendly crocodile plush with an engaging grin.', 650.00, 600.00, 4.55, '/productimages/croc1.jpg', '/productimages/croc2.jpg', '/productimages/croc3.jpg', 484),
(14, 'Penguin Pals', 'A pair of adorable penguin plushies with cozy scarves.', 800.00, 750.00, 4.90, '/productimages/pengu1.jpg', '/productimages/pengu2.jpg', '/productimages/pengu3.jpg', 460),
(15, 'Monkey Mischief', 'A playful monkey plush with a cheeky smile.', 700.00, 650.00, 4.70, '/productimages/monke1.jpg', '/productimages/monke2.jpg', '/productimages/monke3.jpg', 549),
(16, 'Teddy Bear Deluxe', 'A premium teddy bear plush with a soft, velvety coat.', 1200.00, 1100.00, 4.95, '/productimages/ted1.jpg', '/productimages/ted2.jpg', '/productimages/ted3.jpg', 462),
(17, 'Rabbit Snuggles', 'A fluffy white rabbit plush with floppy ears.', 500.00, 480.00, 4.60, '/productimages/wabbit1.jpg', '/productimages/wabbit2.jpg', '/productimages/wabbit3.jpg', 366),
(18, 'Fox Fables', 'A soft fox plush with a warm and inviting expression.', 450.00, 420.00, 4.50, '/productimages/Foox1.jpg', '/productimages/Foox2.jpg', '/productimages/Foox3.jpg', 443),
(19, 'Polar Bear Pal', 'A large and cuddly polar bear plush perfect for hugs.', 1000.00, 950.00, 4.80, '/productimages/polar1.jpg', '/productimages/polar2.jpg', '/productimages/polar3.jpg', 519),
(20, 'Sloth Snuggler', 'A relaxing sloth plush with long limbs for extra comfort.', 800.00, 750.00, 4.75, '/productimages/sloth1.jpg', '/productimages/sloth2.jpg', '/productimages/sloth3.jpg', 365);

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
(8, 3),
(1, 1),
(1, 2),
(1, 3),
(1, 6),
(2, 4),
(2, 5),
(2, 7),
(2, 8),
(3, 4),
(3, 5),
(3, 6),
(3, 9),
(4, 3),
(4, 4),
(4, 10),
(4, 6),
(5, 1),
(5, 4),
(5, 7),
(5, 11),
(6, 2),
(6, 3),
(6, 5),
(6, 9),
(7, 3),
(7, 6),
(7, 9),
(7, 12),
(8, 1),
(8, 4),
(8, 7),
(8, 8),
(9, 1),
(9, 5),
(9, 9),
(9, 13),
(10, 4),
(10, 6),
(10, 9),
(10, 10),
(11, 1),
(11, 5),
(11, 12),
(11, 14),
(12, 4),
(12, 5),
(12, 9),
(12, 15),
(13, 2),
(13, 5),
(13, 9),
(13, 16),
(14, 4),
(14, 9),
(14, 11),
(14, 13),
(15, 3),
(15, 4),
(15, 12),
(15, 16),
(16, 1),
(16, 2),
(16, 6),
(16, 17),
(17, 3),
(17, 6),
(17, 9),
(17, 18),
(18, 4),
(18, 6),
(18, 9),
(18, 12),
(19, 1),
(19, 3),
(19, 9),
(19, 13),
(20, 2),
(20, 5),
(20, 6),
(20, 19);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `review_text` varchar(255) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `added_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `product_id`, `username`, `review_text`, `rating`, `added_at`) VALUES
(1, 1, 'XxAl3xXx', 'This bear is so soft and my daughter loves it!', 4.80, '2024-01-15'),
(2, 1, 'lil_sarah22', 'Great plush, well made and very cuddly.', 5.00, '2024-02-20'),
(3, 1, 'm1k3y_d', 'The perfect gift for a little one, very happy with the purchase.', 4.70, '2024-03-05'),
(4, 2, 'UnicornPrincess23', 'Such a magical unicorn, my daughter is obsessed with it!', 5.00, '2024-01-12'),
(5, 2, 'J4ckTh3Fl1p', 'Great quality, the sparkly horn is a nice touch.', 4.90, '2024-02-11'),
(6, 2, 'KariCool28', 'This plush is adorable and the colors are vibrant.', 4.80, '2024-03-21'),
(7, 3, 'johnnyW_123', 'Super cute and soft, my son loves it!', 4.70, '2024-01-25'),
(8, 3, 'emily_4eva', 'Good quality, a great addition to our collection of plush toys.', 4.60, '2024-02-14'),
(9, 3, 'chris_moore21', 'My kids can’t stop hugging this panda, so adorable!', 4.80, '2024-03-03'),
(10, 4, 'Olivia_baby_22', 'A lovely little kitten, very soft and cuddly!', 4.50, '2024-01-18'),
(11, 4, 'Daniel_smith99', 'Perfect size for my toddler, great for hugging.', 4.60, '2024-02-22'),
(12, 4, 'Ella_justme', 'Adorable plush and the price is very reasonable.', 4.40, '2024-03-06'),
(13, 5, 'M4tthew_Wh1te', 'Such a cute bunny, perfect for Easter gifts!', 4.60, '2024-01-30'),
(14, 5, 'hannah_bear01', 'Floppy ears and super soft fur, great quality.', 4.70, '2024-02-01'),
(15, 5, 'Jas0nclarkX', 'This bunny is the best cuddle buddy, my daughter loves it!', 4.80, '2024-03-15'),
(16, 6, 'L1nda_Martz', 'The dragon is fierce looking but super soft to touch!', 3.80, '2024-01-22'),
(17, 6, 'ryan_the_boss', 'Not as soft as expected but still a fun plush for dragon lovers.', 4.00, '2024-02-18'),
(18, 6, '4l1ce_lee', 'A great gift for a dragon fan, but could be a bit fluffier.', 3.70, '2024-03-10'),
(19, 7, 'george_baker007', 'Cute fox with a charming look, my son loves it!', 4.40, '2024-01-12'),
(20, 7, 'Mia_wilson13', 'The tail is really fluffy, my daughter adores it!', 4.60, '2024-03-22'),
(21, 7, 'W1ll1am_lee', 'Nice design and great for playing, but a little small.', 4.30, '2024-02-28'),
(22, 8, 'divine_mistake', 'Huge elephant plush, so soft and cozy! Highly recommend.', 4.90, '2024-01-10'),
(23, 8, 'Supermom35', 'Perfect size for my son, he loves hugging it before bed.', 4.80, '2024-02-14'),
(24, 8, 'katie_the_gamer', 'Soft, cuddly, and big enough for my little one to carry around.', 5.00, '2024-03-01'),
(25, 9, 'g1r4ff3_g1rl', 'Super tall and cute, perfect for my nursery!', 4.90, '2024-01-25'),
(26, 9, 'r3becca_williams', 'This giraffe is so cute and soft, my kids can’t stop playing with it!', 4.80, '2024-03-12'),
(27, 9, 'nick_hunter97', 'A great gift, but a little taller than expected!', 4.70, '2024-02-08'),
(28, 10, 'Lil_Koala_88', 'This koala is so cute, my daughter loves the eucalyptus leaf!', 4.70, '2024-01-15'),
(29, 10, 'Jen_b23', 'Very soft and cuddly, perfect for naptime.', 4.80, '2024-03-18'),
(30, 10, 'T1gerMom', 'Great quality, the perfect addition to my child’s plush collection.', 4.60, '2024-02-23'),
(31, 11, 'L1onKingFan23', 'The mane is so fluffy, my son loves this lion!', 4.90, '2024-03-28'),
(32, 11, 'Jenna_rose17', 'This plush is stunning, very well-made and soft.', 4.80, '2024-02-19'),
(33, 11, 'Bobby_77', 'Nice size and perfect for little hands to carry.', 4.70, '2024-01-10'),
(34, 12, 'z3bra_fanatic', 'Great zebra plush, the stripes are really vivid!', 4.60, '2024-03-01'),
(35, 12, 'livv_pink', 'Soft and cute, just what I was looking for!', 4.70, '2024-02-06'),
(36, 12, 'travis1990', 'Good quality, a little smaller than expected.', 4.50, '2024-01-28'),
(37, 13, 'SwampT1ger', 'The teeth are a fun touch, my son really likes it!', 4.60, '2024-03-23'),
(38, 13, 'Max_72', 'A bit stiff but a good quality plush overall.', 4.40, '2024-02-17'),
(39, 13, 'serena_nicole', 'A great plush for kids who like reptiles, fun and tough looking.', 4.50, '2024-01-12'),
(40, 14, 'Penguin_Power42', 'Such adorable penguins, my twins love them!', 4.90, '2024-03-08'),
(41, 14, 'coolcat_23', 'The scarves are a nice detail, perfect for the winter.', 4.80, '2024-01-25'),
(42, 14, 'bunny_girlxoxo', 'Cute and cuddly, exactly what I was expecting!', 4.70, '2024-02-04'),
(43, 15, 'monkey_lover123', 'This monkey is so playful and fun, perfect for my little one!', 4.70, '2024-03-05'),
(44, 15, 't3ddy_b33r', 'The cheeky smile is perfect, my son loves playing with it!', 4.80, '2024-02-22'),
(45, 15, 'Jack93', 'Cute plush, but the limbs could be a little softer.', 4.60, '2024-01-31'),
(46, 16, 'x0r3teddy', 'This bear is so soft and luxurious, worth every penny!', 4.95, '2024-03-02'),
(47, 16, 'GabbieLovesBears', 'Best teddy I’ve ever bought, so plush and cozy!', 5.00, '2024-02-16'),
(48, 16, 'R0b_c00l', 'Perfect size, the velvet fur feels amazing.', 4.90, '2024-01-08'),
(49, 17, 'rabb1t_momma', 'This bunny is so soft, perfect for cuddles!', 4.60, '2024-03-04'),
(50, 17, 'angie_fluff', 'Cute, fluffy, and great quality, my daughter loves it!', 4.70, '2024-02-25'),
(51, 17, 'LilacSnow', 'A cute little bunny, just the right size for carrying around.', 4.50, '2024-03-19'),
(52, 18, 'F0xyL0ver', 'So soft and cute, my little one loves it!', 4.50, '2024-01-14'),
(53, 18, 'crazy_foxx', 'Great quality, perfect for my collection of fox plushes.', 4.60, '2024-02-11'),
(54, 18, 'Emma_Fox_77', 'A nice plush, but the face could have been more detailed.', 4.40, '2024-03-26'),
(55, 19, 'BearHug_23', 'This polar bear is perfect, huge and cuddly!', 4.80, '2024-02-18'),
(56, 19, 'snowgirl01', 'So fluffy, my little one loves hugging it at night.', 4.70, '2024-01-23'),
(57, 19, 'DanTheMan', 'A little too big for some spaces, but still great quality.', 4.90, '2024-03-07'),
(58, 20, 'sleepy_sloth01', 'This sloth is the most adorable plush, love it!', 5.00, '2024-02-20'),
(59, 20, 'lazy_tiger123', 'Perfect for snuggling, very soft and comfy!', 4.90, '2024-01-30'),
(60, 20, 'CoolGAMER_9', 'Amazing quality, my daughter sleeps with it every night.', 4.80, '2024-03-21');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `shipping_address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_addresses`
--

INSERT INTO `shipping_addresses` (`shipping_address_id`, `user_id`, `full_name`, `address`, `contact_number`, `created_at`) VALUES
(1, 1, 'Akina Rexzel Ann Alegre', 'Holy Name University,\nJanssen Heights, J. A. Clarin Street, Dampas District 6300 Tagbilaran City, Bohol, Philippines', '09123456789', '2024-11-24 08:40:41'),
(2, 1, 'Kyle Joshua Yamson', 'Holy Name University,\nJanssen Heights, J. A. Clarin Street, Dampas District 6300 Tagbilaran City, Bohol, Philippines', '09694208008', '2024-11-24 16:26:10'),
(3, 2, 'Akina Rexzel Ann Alegre', 'Holy Name University,\nJanssen Heights, J. A. Clarin Street, Dampas District 6300 Tagbilaran City, Bohol, Philippines', '09123456789', '2024-11-24 08:40:41'),
(4, 2, 'Kyle Joshua Yamson', 'Holy Name University,\nJanssen Heights, J. A. Clarin Street, Dampas District 6300 Tagbilaran City, Bohol, Philippines', '09694208008', '2024-11-24 16:26:10');

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
(7, 'adorable'),
(8, 'fluffy'),
(9, 'cuddlesome'),
(10, 'huggable'),
(11, 'cozy'),
(12, 'plush'),
(13, 'snuggly'),
(14, 'softhearted'),
(15, 'whimsical'),
(16, 'fuzzy'),
(17, 'friendly'),
(18, 'magical'),
(19, 'playful'),
(20, 'friendly'),
(21, 'dreamy'),
(22, 'vibrant'),
(23, 'charming'),
(24, 'cozy'),
(25, 'comforting'),
(26, 'joyful'),
(27, 'sweet');

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
(1, 'Kairu', 'projectemail@mail.com', 'minnano123', '2024-11-23 07:22:08'),
(2, 'Exze', 'randomemail@gmail.com', '123minnano', '2024-11-25 06:57:14');

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
(1, 1, 'Brown Bear Buddy', 451.00, '/productvariations/brownbear.jpg'),
(2, 1, 'Pink Bear Buddy', 455.00, '/productvariations/pinkbear.jpg'),
(3, 2, 'Pink Unicorn Dream', 660.00, '/productvariations/pinkunicorn.jpg'),
(4, 2, 'Blue Unicorn Dream', 653.00, '/productvariations/blueunicorn.jpg'),
(5, 3, 'Black Panda Pals', 95.00, '/productvariations/blackpanda.jpg'),
(6, 3, 'White Panda Pals', 98.00, '/productvariations/whitepanda.jpg'),
(7, 4, 'Gray Kitty Cuddles', 376.00, '/productvariations/graykitty.jpg'),
(8, 4, 'White Kitty Cuddles', 374.00, '/productvariations/whitekitty.jpg'),
(9, 5, 'White Bunny Hop', 575.00, '/productvariations/whitebunny.jpg'),
(10, 5, 'Pink Bunny Hop', 582.00, '/productvariations/pinkbunny.jpg'),
(11, 6, 'Green Dragon Puff', 194.00, '/productvariations/greendragon.jpg'),
(12, 6, 'Red Dragon Puff', 196.00, '/productvariations/reddragon.jpg'),
(13, 7, 'Orange Foxy Friend', 508.00, '/productvariations/orangefox.jpg'),
(14, 7, 'Brown Foxy Friend', 498.00, '/productvariations/brownfox.jpg'),
(15, 8, 'Gray Elephant Hugs', 1097.00, '/productvariations/greyelephant.jpg'),
(16, 8, 'Pink Elephant Hugs', 1101.00, '/productvariations/pinkelephant.jpg'),
(71, 9, 'Yellow Giraffe Giggles', 705.00, '/productvariations/yellowgiraffe.jpg'),
(72, 9, 'Brown Giraffe Giggles', 710.00, '/productvariations/browngiraffe.jpg'),
(73, 10, 'Gray Koala Kuddles', 455.00, '/productvariations/graykoala.jpg'),
(74, 10, 'Brown Koala Kuddles', 460.00, '/productvariations/brownkoala.jpg'),
(75, 11, 'Gold Lion King', 905.00, '/productvariations/goldlion.jpg'),
(76, 11, 'Brown Lion King', 910.00, '/productvariations/brownlion.jpg'),
(77, 12, 'Black and White Zebra Zing', 555.00, '/productvariations/bwzebra.jpg'),
(78, 12, 'Gray Zebra Zing', 565.00, '/productvariations/grayzebra.jpg'),
(79, 13, 'Green Crocodile Crunch', 605.00, '/productvariations/greencroc.jpg'),
(80, 13, 'Gray Crocodile Crunch', 610.00, '/productvariations/graycroc.jpg'),
(81, 14, 'Black Penguin Pals', 755.00, '/productvariations/blackpengu.jpg'),
(82, 14, 'White Penguin Pals', 765.00, '/productvariations/whitepengu.jpg'),
(83, 15, 'Brown Monkey Mischief', 655.00, '/productvariations/brownmonke.jpg'),
(84, 15, 'Gray Monkey Mischief', 660.00, '/productvariations/graymonke.jpg'),
(85, 16, 'Pink Teddy Bear Deluxe', 1105.00, '/productvariations/pinkted.jpg'),
(86, 16, 'White Teddy Bear Deluxe', 1115.00, '/productvariations/whiteted.jpg'),
(87, 17, 'White Rabbit Snuggles', 485.00, '/productvariations/whitewabbit.jpg'),
(88, 17, 'Gray Rabbit Snuggles', 495.00, '/productvariations/graywabbit.jpg'),
(89, 18, 'Red Fox Fables', 420.00, '/productvariations/redFoox.jpg'),
(90, 18, 'Gray Fox Fables', 430.00, '/productvariations/grayFoox.jpg'),
(91, 19, 'White Polar Bear Pal', 955.00, '/productvariations/whitepolar.jpg'),
(92, 19, 'Gray Polar Bear Pal', 960.00, '/productvariations/graypolar.jpg'),
(93, 20, 'Brown Sloth Snuggler', 755.00, '/productvariations/brownsloth.jpg'),
(94, 20, 'Gray Sloth Snuggler', 765.00, '/productvariations/graysloth.jpg');

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
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_status` (`status_id`);

--
-- Indexes for table `order_statuses`
--
ALTER TABLE `order_statuses`
  ADD PRIMARY KEY (`status_id`);

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
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`shipping_address_id`);

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
  MODIFY `basket_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `checkout_unused`
--
ALTER TABLE `checkout_unused`
  MODIFY `checkout_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `order_statuses`
--
ALTER TABLE `order_statuses`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  MODIFY `shipping_address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `variations`
--
ALTER TABLE `variations`
  MODIFY `variations_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_status` FOREIGN KEY (`status_id`) REFERENCES `order_statuses` (`status_id`);

--
-- Constraints for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD CONSTRAINT `product_tags_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `variations`
--
ALTER TABLE `variations`
  ADD CONSTRAINT `variations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
