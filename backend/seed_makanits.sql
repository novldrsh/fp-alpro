-- Data contoh MakanITS (9 tempat, menu, review)
-- Tidak mengubah seed.sql milik Rizky. Untuk kembali ke data lama: psql fp_alpro < backend/seed.sql

BEGIN;

DELETE FROM favorites;
DELETE FROM reviews;
DELETE FROM menus;
DELETE FROM restaurants;

INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (1, 'Bakso Arsitektur', 'Kantin Departemen Arsitektur ITS', 'Bakso kuah gurih di kantin Departemen Arsitektur ITS.', 'Bakso', -7.28034, 112.79408, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bakso_khas_Solo.jpg/500px-Bakso_khas_Solo.jpg', '09.00 - 16.00', 10000, 18000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (2, 'Gepuk Geprek CCWS IKOMA', 'Kantin CCWS IKOMA ITS', 'Ayam geprek dengan sambal pedas di kantin CCWS IKOMA.', 'Ayam Geprek', -7.281, 112.7962, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ayam_Gepek_with_original_sauce.jpg/500px-Ayam_Gepek_with_original_sauce.jpg', '09.00 - 17.00', 12000, 20000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (3, 'Sego Jamur Kantin Pusat', 'Kantin Pusat ITS', 'Nasi dengan olahan jamur, murah dan cepat saji.', 'Nasi', -7.28384, 112.79411, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Nasi_Goreng_Jamur_Kuping.jpg/500px-Nasi_Goreng_Jamur_Kuping.jpg', '07.00 - 16.00', 10000, 15000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (4, 'Bakso FTK', 'Kantin Fakultas Teknologi Kelautan ITS', 'Bakso dan mie ayam di kantin FTK ITS.', 'Bakso', -7.28192, 112.79688, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Bakso_Mie_Ayam_Indonesian_Meatball_and_Noodle_Soup.jpg/500px-Bakso_Mie_Ayam_Indonesian_Meatball_and_Noodle_Soup.jpg', '09.00 - 16.00', 10000, 17000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (5, 'Nasi Madura Kantin Pusat', 'Kantin Pusat ITS', 'Nasi bebek dan ayam khas Madura di Kantin Pusat ITS.', 'Nasi', -7.28384, 112.79411, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bebek_Madura_1.jpg/500px-Bebek_Madura_1.jpg', '07.00 - 16.00', 12000, 20000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (6, 'Soto Kantin Matematika', 'Kantin Departemen Matematika ITS', 'Soto ayam dan soto daging di kantin Departemen Matematika.', 'Soto', -7.2825, 112.7933, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/500px-Soto_ayam.JPG', '07.30 - 15.00', 10000, 16000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (7, 'Pecel Perpustakaan Pusat', 'Kantin Perpustakaan Pusat ITS', 'Nasi pecel khas Surabaya, favorit untuk sarapan.', 'Pecel', -7.28162, 112.79547, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Nasi_Pecel_Surabaya.jpg/500px-Nasi_Pecel_Surabaya.jpg', '07.00 - 15.00', 8000, 14000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (8, 'Pisang Goreng Kantin Pusat', 'Kantin Pusat ITS', 'Pisang goreng aneka topping, camilan murah di Kantin Pusat.', 'Gorengan', -7.28384, 112.79411, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pisang_Goreng_di_Car-Free_Day_Jombang_083136.jpg/500px-Pisang_Goreng_di_Car-Free_Day_Jombang_083136.jpg', '08.00 - 16.00', 2000, 7000);
INSERT INTO restaurants (id, name, location, description, category, latitude, longitude, image, jam_buka, harga_min, harga_max) VALUES
  (9, 'Nasi Campur Kantin Informatika', 'Kantin Departemen Teknik Informatika ITS', 'Nasi campur dengan pilihan lauk di kantin Teknik Informatika.', 'Nasi', -7.27958, 112.79753, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Nasi_campur%2C_Ubud%2C_Indonesia.jpg/500px-Nasi_campur%2C_Ubud%2C_Indonesia.jpg', '07.00 - 16.00', 12000, 20000);

INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (1, 1, 'Bakso Urat', 15000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (2, 1, 'Bakso Campur', 17000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (3, 1, 'Bakso Halus', 12000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (4, 1, 'Mie Ayam Bakso', 18000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (5, 1, 'Es Teh', 4000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (6, 2, 'Geprek Original', 15000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (7, 2, 'Geprek Keju', 20000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (8, 2, 'Geprek Sambal Matah', 18000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (9, 2, 'Nasi Putih', 5000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (10, 2, 'Es Jeruk', 5000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (11, 3, 'Sego Jamur Komplit', 13000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (12, 3, 'Sego Jamur Biasa', 10000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (13, 3, 'Sego Jamur Telur', 15000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (14, 3, 'Tempe Goreng', 3000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (15, 4, 'Bakso Telur', 15000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (16, 4, 'Bakso Jumbo', 17000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (17, 4, 'Bakso Biasa', 10000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (18, 4, 'Es Teh', 4000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (19, 5, 'Nasi Bebek Madura', 20000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (20, 5, 'Nasi Ayam Madura', 17000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (21, 5, 'Nasi Campur Madura', 15000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (22, 5, 'Sambal Pencit', 3000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (23, 6, 'Soto Ayam', 13000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (24, 6, 'Soto Campur Lontong', 14000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (25, 6, 'Soto Daging', 16000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (26, 6, 'Kerupuk', 2000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (27, 7, 'Nasi Pecel Telur', 12000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (28, 7, 'Nasi Pecel Biasa', 8000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (29, 7, 'Nasi Pecel Ayam', 14000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (30, 7, 'Peyek', 2000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (31, 8, 'Pisang Goreng Original', 2000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (32, 8, 'Pisang Goreng Coklat', 4000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (33, 8, 'Pisang Goreng Keju', 5000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (34, 8, 'Pisang Goreng Coklat Keju', 6000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (35, 8, 'Pisang Goreng Susu Keju', 7000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (36, 9, 'Nasi Campur Komplit', 20000, 'Best Seller');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (37, 9, 'Nasi Campur Ayam', 15000, 'Rekomendasi');
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (38, 9, 'Nasi Campur Telur', 12000, NULL);
INSERT INTO menus (id, restaurant_id, nama, harga, badge) VALUES (39, 9, 'Es Teh', 4000, NULL);

INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (1, 1, 'Val', 5, 'Kuahnya gurih, baksonya kenyal, porsinya pas.', NULL, '2026-09-18');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (2, 1, 'Rizky', 4, 'Enak, tapi jam makan siang antrinya panjang.', NULL, '2026-09-19');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (3, 2, 'Dika', 4, 'Cabenya banyak, pedasnya nendang. Sayang nasi tidak bisa nambah.', NULL, '2026-09-17');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (4, 2, 'Sari', 5, 'Geprek kejunya melimpah, worth it.', NULL, '2026-09-20');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (5, 3, 'Sari', 5, 'Jamurnya banyak dan masih hangat, harganya murah.', NULL, '2026-09-20');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (6, 3, 'Bagus', 4, 'Cepat disajikan, cocok buat yang buru-buru kelas.', NULL, '2026-09-19');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (7, 4, 'Naufal', 4, 'Baksonya standar tapi kuahnya enak.', NULL, '2026-09-18');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (8, 4, 'Ayu', 4, 'Dekat kelas, harganya masih ramah kantong.', NULL, '2026-09-19');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (9, 5, 'Fajar', 5, 'Bebeknya empuk, sambalnya juara.', NULL, '2026-09-16');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (10, 5, 'Rizky', 4, 'Porsinya besar, tapi agak lama nunggunya.', NULL, '2026-09-18');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (11, 6, 'Dewi', 4, 'Sotonya segar, kuahnya nggak terlalu berminyak.', NULL, '2026-09-17');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (12, 6, 'Andi', 4, 'Enak buat makan siang, kerupuknya renyah.', NULL, '2026-09-19');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (13, 7, 'Bagus', 5, 'Sambel pecelnya juara, cocok buat sarapan sebelum kelas.', NULL, '2026-09-16');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (14, 7, 'Val', 4, 'Murah banget, tapi kadang kehabisan kalau kesiangan.', NULL, '2026-09-20');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (15, 8, 'Intan', 4, 'Pisangnya manis, yang keju paling enak.', NULL, '2026-09-18');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (16, 8, 'Rian', 4, 'Camilan murah, cocok nunggu kelas.', NULL, '2026-09-19');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (17, 9, 'Nadia', 5, 'Lauknya banyak pilihan, kenyang.', NULL, '2026-09-20');
INSERT INTO reviews (id, restaurant_id, reviewer, rating, comment, user_id, created_at) VALUES (18, 9, 'Yoga', 4, 'Deket kelas, rasanya konsisten.', NULL, '2026-09-21');

SELECT setval('restaurants_id_seq', (SELECT COALESCE(MAX(id),1) FROM restaurants));
SELECT setval('menus_id_seq', (SELECT COALESCE(MAX(id),1) FROM menus));
SELECT setval('reviews_id_seq', (SELECT COALESCE(MAX(id),1) FROM reviews));

COMMIT;
