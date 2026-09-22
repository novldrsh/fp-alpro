--
-- PostgreSQL database dump
--

\restrict oekXFWWCXBbx3sOGSnac0bfPPHS4KPrn9ITsv8DAYaE93pla0t1NsYJuSnYrHWW

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (10, 'Bakso Pak Parlin', 'Food Court SP, ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan bakso di Food Court SP ITS.', 'Bakso', -7.2824312, 112.7905236, 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkgjBsiHba5Cb_cW97Bl7XXpeUmKTx-8VuopvMncGIb2dMHZMHLXgmW2U3g_77EyJY-z84jzJOAXslrIhdI5y4ha3UeoYWXd7TzReLeOlH62kgxWmZZCXrYpYTXhlgEhnnWY9kWPg=s680-w680-h510-rw', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (11, 'Warung Pak No', 'Food Court SP, ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan di Food Court SP ITS.', 'Makanan', -7.2824312, 112.7905236, 'https://www.its.ac.id/wp-content/uploads/2025/07/SP1-2.jpg', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (12, 'Waroeng Anggrek', 'Food Court SP, ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan di Food Court SP ITS.', 'Makanan', -7.2824312, 112.7905236, 'https://www.its.ac.id/wp-content/uploads/2025/07/SP1-2.jpg', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (13, 'Mie Ayam Madura', 'Food Court SP, ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan mie ayam di Food Court SP ITS.', 'Mie Ayam', -7.2824312, 112.7905236, 'https://www.its.ac.id/wp-content/uploads/2025/07/SP1-2.jpg', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (14, 'Thunuk', 'Food Court SP, ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tenant minuman di Food Court SP ITS.', 'Minuman', -7.2824312, 112.7905236, 'https://www.its.ac.id/wp-content/uploads/2025/07/SP3-1.jpg', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (15, 'Kedai Clara', 'Orens Food Corner, ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan di Orens Food Corner ITS.', 'Makanan', -7.2801945, 112.7918996, 'https://www.its.ac.id/wp-content/uploads/2025/07/Geomat3-1.jpg', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (16, 'Pak Yan', 'Orens Food Corner, ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan di Orens Food Corner ITS.', 'Makanan', -7.2801945, 112.7918996, 'https://www.its.ac.id/wp-content/uploads/2025/07/Geomat3-1.jpg', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (17, 'Kedai Tiga Putra', 'Kantin Arsitektur ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan di Kantin Arsitektur ITS.', 'Makanan', -7.2803874, 112.7914747, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR26m5w-UsYtUyUNs-qxy6YeNYVwYXVh7dCkSCpRjkZF-EImfGLBlnh0Mfm&s=10', NULL, NULL, NULL);
INSERT INTO public.restaurants (id, name, location, rating, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES (18, 'Bakso Pak Di', 'Kantin Arsitektur ITS, Keputih, Sukolilo, Surabaya', NULL, 'Tempat makan bakso di Kantin Arsitektur ITS.', 'Bakso', -7.2803874, 112.7914747, 'https://www.its.ac.id/wp-content/uploads/2025/07/Arsi5-1.jpg', NULL, NULL, NULL);


--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.menus (id, restaurant_id, nama, harga, badge) VALUES (1, 10, 'Bakso Orisinal', 10000, '');
INSERT INTO public.menus (id, restaurant_id, nama, harga, badge) VALUES (2, 10, 'Es Teh', 5000, 'Best Seller');
INSERT INTO public.menus (id, restaurant_id, nama, harga, badge) VALUES (6, 10, 'Ayam Geprek', 12000, '');
INSERT INTO public.menus (id, restaurant_id, nama, harga, badge) VALUES (7, 10, 'Nasi Tempong', 10000, '');
INSERT INTO public.menus (id, restaurant_id, nama, harga, badge) VALUES (8, 10, 'Mie Ayam', 18000, '');
INSERT INTO public.menus (id, restaurant_id, nama, harga, badge) VALUES (9, 10, 'Es Jeruk', 5000, 'Best Seller');


--
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.menus_id_seq', 9, true);


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 18, true);


--
-- PostgreSQL database dump complete
--

\unrestrict oekXFWWCXBbx3sOGSnac0bfPPHS4KPrn9ITsv8DAYaE93pla0t1NsYJuSnYrHWW

