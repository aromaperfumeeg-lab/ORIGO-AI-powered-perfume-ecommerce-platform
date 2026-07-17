# ORIGO Product Detail — Data Gap Report

## Existing, usable data

- Product identity: `id`, names, brand, category, gender/type, concentration and SKU.
- Commerce: product price, old price, publication status and product-level inventory.
- Content: Arabic/English descriptions, primary image, gallery images, structured top/heart/base notes.
- Discovery: fragrance family, seasons, occasions and editorial performance values when supplied.
- Existing systems: authenticated users, cart, wishlist (local), checkout/orders and note-library routes.

## Missing or incomplete data

- Product slug and canonical product URL stored in the database.
- Variant records with their own price, old price, stock, SKU and barcode. `sizes_json` currently stores labels only.
- Product videos and media metadata (type, dimensions, poster and sort order).
- Public review persistence, review media, moderation and helpful/report actions.
- Verified-purchase review linkage. This must be calculated server-side from completed order items.
- Community vote tables for mood, day/night, season, performance, value, gender, age and style.
- Store-configured purchase-benefit wording and return-policy duration.
- Real aggregate rating and rating distribution for every product.
- Recommendation-service persistence and customer-behaviour signals.

## Safe storefront behaviour

- Never synthesize ratings, review counts, stock or community percentages.
- Hide unavailable variant and community controls or show an explicit empty state.
- Use the product price and product-level inventory until variant inventory exists.
- Label supplied performance data as editorial, never community-derived.
- Compute related-product ranking from real notes, family, gender and price only.
- Emit `AggregateRating` structured data only after real public reviews exist.

## Required future migrations

1. `product_variants(product_id, id, size, price, old_price, stock, sku, barcode, status)`.
2. `product_media(product_id, id, type, url, poster, alt_ar, alt_en, sort_order)`.
3. `product_reviews(...)`, `review_media(...)`, `review_votes(...)`, with server-side verified-purchase checks.
4. `product_community_votes(product_id, user_id, dimension, value)` with one vote per dimension/user.
5. Store settings for benefits, tax copy, returns, social links and delivery promises.
