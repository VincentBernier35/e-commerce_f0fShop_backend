-- Deploy f0fshop:5.seeding_v2 to pg

BEGIN;


INSERT INTO category(id, category_name) VALUES

(1, 'category1' ),
(2, 'category2' ),
(3, 'category3' ),
(4, 'category4' );

INSERT INTO customer(id, family_name, first_name, address, city,  zip_code, phone, email, pwd ) VALUES 
(1, 'Dupond', 'Julie', '1 rue de la paix', 'Paris', 75000, 0620304050, 'hello1@world.fr', 'azerty'),
(2, 'Morin', 'Charlotte', '1 rue de la paix', 'Paris', 75000, 0620304050, 'morin@world.fr', 'azerty'),
(3, 'Dupont', 'Camille', '1 rue de la paix', 'Paris', 75000, 0620304050, 'camille@world.fr', 'azerty'),
(4, 'Bridoux', 'Justine', '1 rue de la paix', 'Paris', 75000, 0620304050, 'justine@world.fr', 'azerty');

INSERT INTO review (id, review, first_name, customer_id) VALUES
(1, 'je recommande ce site qui est à la pointe de la tendance f0f. f0f 4 life !', 'Cloé', 2),
(2, 'super service client', 'Julie', 3),
(3, 'article au top!', 'Charlotte', 4);


INSERT INTO product(id, product_name, price_without_taxes, product_info, product_image, prod_category_name, review_id, category_id) VALUES

(1,'grille pain', 30, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737335/F0F/toaster_j54ogu.png','category1', 2, 1),
(2,'canard en plastique', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737335/F0F/plastic-duck_nb0uw5.png','category1', 3, 1),
(3,'bouchon sauce', 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737335/F0F/sauce-cap_qnv2wn.png','category1', 1, 1),
(4,'chapeau', 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737335/F0F/hat_wfxg5s.png','category1', 2, 1),
(5, 'tabouret', 50, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737331/F0F/stool_vqih8r.png', 'category2',3, 1),
(6,'chargeur allume cigare', 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737333/F0F/cigarette-lighter-charger_ia2qxp.png','category2', 1, 1),
(7, 'masque chirurgical', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737333/F0F/surgical-mask_aoohgn.png','category2', 2, 1),
(8, 'petit briquet', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737330/F0F/small-lighter_izhrmn.png','category3', 3, 2),
(9, 'casquette', 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737333/F0F/cap_svz15a.png','category3', 1, 2),
(10, 'motocross', 1300, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737334/F0F/motocross_fomz1q.png','category3', 2, 2),
(11, 'mclaren', 9999, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737332/F0F/mclaren_vkn46c.png','category4', 3, 2),
(12, 'meuble', 3500, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737332/F0F/furniture_ogiogt.png','category4', 1, 2),
(13, 'casque de velo', 30, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737334/F0F/bicycle-helmet_izuac8.png','category4', 2, 2),
(14, 'velo', 190, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737331/F0F/bike_rkm18f.png','category4', 3, 2),
(15, 'tasse oiseaux', 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737332/F0F/bird-mug_kq4ruj.png','category4', 1, 3),
(16, 'cafetière', 50, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737334/F0F/coffe-maker_djqwsd.png','category4', 2, 3),
(17, 'perçeuse', 50, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737335/F0F/drill_oe7uxl.png','category4', 3, 3),
(18, 'cristaux', 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737333/F0F/cristal_i9goru.png','category4', 1, 3),
(19, 'rolls', 9999, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737332/F0F/rolls_nhetav.png','category4', 2, 4),
(20, 'parrure de lit', 30, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737334/F0F/set-of-bed_rcj1pm.png','category4', 3, 2),
(21, 'canape', 150, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737334/F0F/sofa_yw7vje.png','category4', 1, 3),
(22, 'fauteuil', 100, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737333/F0F/seat_necg4v.png','category3', 2, 3),
(23, 'cuisine', 4500, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737333/F0F/kitchen_tdqxjj.png','category3', 3, 2),
(24, 'draisienne', 80, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737333/F0F/kid-bike_dyhgtg.png','category2', 1, 3),
(25, 'briquet', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737334/F0F/lighter_mfltwn.png','category2', 2, 3),
(26, 'tasse', 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737331/F0F/mug_vzbzhv.png','category2', 3, 3),
(27, 'stylo', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737331/F0F/pen_sngwsg.png','category2', 1, 3),
(28, 'lunette de soleil', 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737334/F0F/sunglasses_lkma1g.png','category2', 2, 3),
(29, 'twingo', 2500, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://res.cloudinary.com/dgw6nef0f/image/upload/v1658737331/F0F/twingo_fibqvg.png','category2', 3, 4);


INSERT INTO shopping_cart(created_at, customer_id, product_id) VALUES
(now(),2 ,3);



COMMIT;
