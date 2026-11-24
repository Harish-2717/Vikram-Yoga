<?php
/**
 * Seed & Migrate Authentic Gallery Images into Database & public/gallery/
 */
require_once __DIR__ . '/db.php';

header('Content-Type: text/plain; charset=utf-8');

$pdo = getDbConnection();
$rootDir = dirname(__DIR__);
$galleryDir = $rootDir . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'gallery';
$distGalleryDir = $rootDir . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'gallery';

if (!is_dir($galleryDir)) {
    @mkdir($galleryDir, 0777, true);
}
if (is_dir(dirname($distGalleryDir)) && !is_dir($distGalleryDir)) {
    @mkdir($distGalleryDir, 0777, true);
}

function copyToGallery($sourceRel, $targetFilename, $rootDir, $galleryDir, $distGalleryDir) {
    $src = $rootDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $sourceRel);
    if (!file_exists($src)) {
        return null;
    }
    $dest = $galleryDir . DIRECTORY_SEPARATOR . $targetFilename;
    @copy($src, $dest);
    if (is_dir($distGalleryDir)) {
        @copy($src, $distGalleryDir . DIRECTORY_SEPARATOR . $targetFilename);
    }
    return "/gallery/" . $targetFilename;
}

// Map authentic images from static gallery definitions to public/gallery/
$seedItems = [
    // ── 1. Our Centre ───────────────────────────────────────────
    [
        'category' => 'Our Centre',
        'name' => 'Sunset Roof Practice',
        'src' => 'src/assets/New/file_00000000e2f48208b353a09b8451f839.png',
        'target' => 'centre-sunset-roof.png'
    ],
    [
        'category' => 'Our Centre',
        'name' => 'Beach Handstand Pose',
        'src' => 'src/assets/New/file_00000000e22081fa8bafa1253752641e.png',
        'target' => 'centre-beach-handstand.png'
    ],
    [
        'category' => 'Our Centre',
        'name' => 'Sea View Balance',
        'src' => 'src/assets/New/file_000000007e508211bf31b2012c7739be.png',
        'target' => 'centre-sea-view-balance.png'
    ],
    [
        'category' => 'Our Centre',
        'name' => 'Veranda Practice Space',
        'src' => 'src/assets/New/file_0000000027c0820b9a5711022d613771.png',
        'target' => 'centre-veranda-space.png'
    ],
    [
        'category' => 'Our Centre',
        'name' => 'Holistic Wellness Sanctuary',
        'src' => 'src/assets/New/file_00000000dfcc82119d61541189667cd6.png',
        'target' => 'centre-holistic-sanctuary.png'
    ],
    [
        'category' => 'Our Centre',
        'name' => 'Centre View',
        'src' => 'src/assets/New/file_000000001188820791659018f9dd9303.png',
        'target' => 'centre-view.png'
    ],

    // ── 2. Yoga & Wellness ──────────────────────────────────────
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Group Asana Session',
        'src' => 'src/assets/New/IMG_20250516_171414.jpg.jpeg',
        'target' => 'yoga-group-asana.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Breath & Movement Practice',
        'src' => 'src/assets/New/IMG_20250516_171813.jpg.jpeg',
        'target' => 'yoga-breath-movement.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Aligning the Posture',
        'src' => 'src/assets/New/IMG_20250516_171957.jpg.jpeg',
        'target' => 'yoga-posture-alignment.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Morning Vinyasa Flow',
        'src' => 'src/assets/New/IMG_20250517_083145.jpg.jpeg',
        'target' => 'yoga-vinyasa-flow.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Pranayama & Focus',
        'src' => 'src/assets/New/IMG_20250517_084451.jpg.jpeg',
        'target' => 'yoga-pranayama-focus.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Strength & Flexibility',
        'src' => 'src/assets/New/IMG_20250520_082653.jpg.jpeg',
        'target' => 'yoga-strength-flexibility.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Guided Practice',
        'src' => 'src/assets/New/IMG_20250520_083011.jpg.jpeg',
        'target' => 'yoga-guided-practice.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Deep Stretch Session',
        'src' => 'src/assets/New/IMG_20250520_083632.jpg.jpeg',
        'target' => 'yoga-deep-stretch.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Mindful Alignment',
        'src' => 'src/assets/New/IMG_20250520_092421.jpg.jpeg',
        'target' => 'yoga-mindful-alignment.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Intensive Practice',
        'src' => 'src/assets/New/IMG_20250520_124838.jpg.jpeg',
        'target' => 'yoga-intensive-practice.jpeg'
    ],
    [
        'category' => 'Yoga & Wellness',
        'name' => 'Savasana & Relaxation',
        'src' => 'src/assets/New/IMG_20250520_130020.jpg.jpeg',
        'target' => 'yoga-savasana-relaxation.jpeg'
    ],

    // ── 3. Wellness & Therapies ─────────────────────────────────
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Traditional Ayurvedic Massage',
        'src' => 'src/assets/New folder/Ayurvedic massage courses.png',
        'target' => 'therapy-ayurvedic-massage.png'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Ayurvedic Treatment',
        'src' => 'src/assets/images/extra-gallery-1.jpeg',
        'target' => 'therapy-ayurvedic-treatment.jpeg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Acupuncture Therapy',
        'src' => 'src/assets/images/acupuncture.jpeg',
        'target' => 'therapy-acupuncture.jpeg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Reflexology Session',
        'src' => 'src/assets/New folder/Reflexology course.png',
        'target' => 'therapy-reflexology.png'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Cupping Therapy',
        'src' => 'src/assets/images/cupping.jpg',
        'target' => 'therapy-cupping.jpg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Deep Tissue Massage',
        'src' => 'src/assets/New folder/Deep tissue massage courses.png',
        'target' => 'therapy-deep-tissue.png'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Dorn Therapy',
        'src' => 'src/assets/images/dorn-therapy.jpg',
        'target' => 'therapy-dorn.jpg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Shiatsu Massage',
        'src' => 'src/assets/images/shiatsu.jpeg',
        'target' => 'therapy-shiatsu.jpeg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Swedish Massage',
        'src' => 'src/assets/images/swedish-massage.jpeg',
        'target' => 'therapy-swedish.jpeg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Thai Yoga Massage',
        'src' => 'src/assets/New folder/Thai yoga massage courses.png',
        'target' => 'therapy-thai-massage.png'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Natural Herbal Oils',
        'src' => 'src/assets/images/extra-gallery-2.jpeg',
        'target' => 'therapy-herbal-oils.jpeg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Holistic Rest',
        'src' => 'src/assets/images/extra-gallery-3.jpeg',
        'target' => 'therapy-holistic-rest.jpeg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Therapeutic Healing',
        'src' => 'src/assets/images/extra-gallery-5.jpeg',
        'target' => 'therapy-therapeutic-healing.jpeg'
    ],
    [
        'category' => 'Wellness & Therapies',
        'name' => 'Body Balance',
        'src' => 'src/assets/images/extra-gallery-6.jpeg',
        'target' => 'therapy-body-balance.jpeg'
    ],

    // ── 4. Deluxe Non-AC Room ───────────────────────────────────
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Deluxe Non-AC Master View',
        'src' => 'src/assets/New/unnamed (24).webp',
        'target' => 'room-non-ac-master.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Bed & Wardrobe',
        'src' => 'src/assets/New/unnamed.webp',
        'target' => 'room-non-ac-bed-wardrobe.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Seating Area',
        'src' => 'src/assets/New/unnamed (1).webp',
        'target' => 'room-non-ac-seating.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Veranda Walk',
        'src' => 'src/assets/New/unnamed (7).webp',
        'target' => 'room-non-ac-veranda.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Room Corner',
        'src' => 'src/assets/New/unnamed (10).webp',
        'target' => 'room-non-ac-corner.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Washbasin & Mirror',
        'src' => 'src/assets/New/unnamed (28).webp',
        'target' => 'room-non-ac-washbasin.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Window Light',
        'src' => 'src/assets/New/unnamed (20).webp',
        'target' => 'room-non-ac-window.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Bedroom Angle',
        'src' => 'src/assets/New/unnamed (5).webp',
        'target' => 'room-non-ac-angle.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Spacious Layout',
        'src' => 'src/assets/New/unnamed (6).webp',
        'target' => 'room-non-ac-spacious.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Wooden Accents',
        'src' => 'src/assets/New/unnamed (8).webp',
        'target' => 'room-non-ac-wooden.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Tranquil Interior',
        'src' => 'src/assets/New/unnamed (9).webp',
        'target' => 'room-non-ac-tranquil.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Peaceful Sleep',
        'src' => 'src/assets/New/unnamed (11).webp',
        'target' => 'room-non-ac-sleep.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Garden Facing',
        'src' => 'src/assets/New/unnamed (17).webp',
        'target' => 'room-non-ac-garden.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Breeze Veranda',
        'src' => 'src/assets/New/unnamed (18).webp',
        'target' => 'room-non-ac-breeze.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Natural Wood',
        'src' => 'src/assets/New/unnamed (22).webp',
        'target' => 'room-non-ac-natural-wood.webp'
    ],
    [
        'category' => 'Deluxe Non-AC Room',
        'name' => 'Bathroom Interior',
        'src' => 'src/assets/New/unnamed (29).webp',
        'target' => 'room-non-ac-bathroom.webp'
    ],

    // ── 5. Deluxe AC Room ───────────────────────────────────────
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Deluxe AC Master Bedroom',
        'src' => 'src/assets/New/unnamed (12).webp',
        'target' => 'room-ac-master.webp'
    ],
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Room Ambiance',
        'src' => 'src/assets/New/unnamed (13).webp',
        'target' => 'room-ac-ambiance.webp'
    ],
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Ensuite Bathroom',
        'src' => 'src/assets/New/unnamed (14).webp',
        'target' => 'room-ac-bathroom.webp'
    ],
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Cooling & Comfort',
        'src' => 'src/assets/New/unnamed (15).webp',
        'target' => 'room-ac-cooling.webp'
    ],
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Courtyard View',
        'src' => 'src/assets/New/unnamed (21).webp',
        'target' => 'room-ac-courtyard.webp'
    ],
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Relaxation Space',
        'src' => 'src/assets/New/unnamed (23).webp',
        'target' => 'room-ac-relaxation.webp'
    ],
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Modern Amenities',
        'src' => 'src/assets/New/unnamed (25).webp',
        'target' => 'room-ac-modern-amenities.webp'
    ],
    [
        'category' => 'Deluxe AC Room',
        'name' => 'Clean Living',
        'src' => 'src/assets/New/unnamed (26).webp',
        'target' => 'room-ac-clean-living.webp'
    ],

    // ── 6. Certifications & Training ────────────────────────────
    [
        'category' => 'Certifications & Training',
        'name' => '100h Teacher Training Ceremony',
        'src' => 'src/assets/training_100h.png',
        'target' => 'cert-100h-ceremony.png'
    ],
    [
        'category' => 'Certifications & Training',
        'name' => '200h Luxury Training',
        'src' => 'src/assets/training_200h_lux.png',
        'target' => 'cert-200h-lux.png'
    ],
    [
        'category' => 'Certifications & Training',
        'name' => '300h Advanced Training',
        'src' => 'src/assets/training_300h.png',
        'target' => 'cert-300h-advanced.png'
    ],
    [
        'category' => 'Certifications & Training',
        'name' => 'Dr. Chandra Kumar & Teachers',
        'src' => 'src/assets/dr_chandra_kumar.jpg',
        'target' => 'cert-dr-chandra-kumar.jpg'
    ],
    [
        'category' => 'Certifications & Training',
        'name' => 'Classroom Practice Session',
        'src' => 'src/assets/classes.jpg',
        'target' => 'cert-classroom-practice.jpg'
    ],
    [
        'category' => 'Certifications & Training',
        'name' => '200h Standard Training',
        'src' => 'src/assets/training_200h_std.png',
        'target' => 'cert-200h-std.png'
    ],
    [
        'category' => 'Certifications & Training',
        'name' => 'Yoga Master Guidance',
        'src' => 'src/assets/leader.jpeg',
        'target' => 'cert-master-guidance.jpeg'
    ],
    [
        'category' => 'Certifications & Training',
        'name' => 'Founder Guidance & Wisdom',
        'src' => 'src/assets/founder.png',
        'target' => 'cert-founder-guidance.png'
    ],

    // ── 7. Local Experiences & Excursions ───────────────────────
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Varkala Beach',
        'src' => 'src/assets/varkala_beach.png',
        'target' => 'excursion-varkala-beach.png'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Varkala Cliff',
        'src' => 'src/assets/varkala_sunset_sea.jpg',
        'target' => 'excursion-varkala-cliff.jpg'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Janardanaswamy Temple',
        'src' => 'src/assets/temple_1.png',
        'target' => 'excursion-janardana-temple.png'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Kappil Beach',
        'src' => 'src/assets/retreat_banner.png',
        'target' => 'excursion-kappil-beach.png'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Kappil Lake',
        'src' => 'src/assets/hero.jpg',
        'target' => 'excursion-kappil-lake.jpg'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Local Life & Culture',
        'src' => 'src/assets/about.png',
        'target' => 'excursion-local-life.png'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Varkala Coastline',
        'src' => 'src/assets/temple_2.png',
        'target' => 'excursion-coastline.png'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Healing Atmosphere',
        'src' => 'src/assets/healing_atmosphere.png',
        'target' => 'excursion-healing-atmosphere.png'
    ],
    [
        'category' => 'Local Experiences & Excursions',
        'name' => 'Tropical Nature',
        'src' => 'src/assets/cta_dewy_leaf.jpg',
        'target' => 'excursion-tropical-nature.jpg'
    ],
];

echo "Copying authentic assets & inserting/updating in database...\n";

// Remove old generic/unwanted seed entries (gal-1 to gal-19 that had General category)
$pdo->exec("DELETE FROM `gallery_images` WHERE `category` = 'General' OR `category` IS NULL");

$inserted = 0;
$updated = 0;

foreach ($seedItems as $idx => $item) {
    $webPath = copyToGallery($item['src'], $item['target'], $rootDir, $galleryDir, $distGalleryDir);
    if (!$webPath) {
        echo "Warning: Source not found: {$item['src']}\n";
        continue;
    }

    $id = "gal-seed-" . str_pad($idx + 1, 3, '0', STR_PAD_LEFT);

    // Check if exists
    $stmt = $pdo->prepare("SELECT id FROM `gallery_images` WHERE `image` = ? OR `id` = ?");
    $stmt->execute([$webPath, $id]);
    $existing = $stmt->fetch();

    if ($existing) {
        $up = $pdo->prepare("UPDATE `gallery_images` SET `name` = ?, `category` = ?, `image` = ? WHERE `id` = ?");
        $up->execute([$item['name'], $item['category'], $webPath, $existing['id']]);
        $updated++;
    } else {
        $ins = $pdo->prepare("INSERT INTO `gallery_images` (`id`, `name`, `image`, `category`, `created_at`) VALUES (?, ?, ?, ?, NOW())");
        $ins->execute([$id, $item['name'], $webPath, $item['category']]);
        $inserted++;
    }
}

echo "Done! Inserted: $inserted, Updated: $updated\n";
$total = $pdo->query("SELECT COUNT(*) FROM `gallery_images`")->fetchColumn();
echo "Total gallery images now: $total\n";
