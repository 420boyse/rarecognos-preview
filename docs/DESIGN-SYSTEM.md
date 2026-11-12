# RareCognos marketplace interface

RareCognos combines an art gallery identity with a LitVM testnet NFT marketplace. The homepage prioritizes discovery and creation. Studio previews are labeled separately from live listings; they never imply a price or availability.

## Layout contract

- `src/hero-layout.css` owns page tokens, header alignment, homepage hero, studio grid, and creator invitation.
- `src/styles.css` owns the existing marketplace, wallet menu, creation forms, token details, and drop surfaces. Do not add another hero override here.
- Page width: 1440px. Responsive gutter: 20–56px. Section spacing: 56–100px. Fixed header: 88px on desktop, 104px on mobile. Anchor offsets follow the header token.
- Palette: near-black `#050505`, warm white `#f5f4ef`, cobalt `#3b5bff` for small active/focus accents. Inter for interface text; Instrument Serif for the hero's editorial emphasis.
- Shared action classes: `.primary-action`, `.secondary-action`, `.nft-button`. Controls have a minimum 44px target. Keyboard focus remains visible.

## Homepage

`MarketHero` owns a three-work interactive spotlight with previous/next controls and artwork previews. It does not auto-advance. Entrance and card transitions respect reduced motion. The artwork set comes from the existing studio catalog.

Explore opens active listings, or the studio when the marketplace is confirmed empty or unconfigured. Loading and RPC failures remain distinct from empty results. Wallet connection remains in the persistent header. Creation, ownership, drop, and token views use compact headings and omit the studio/creator promotional sections.

The original draggable fan gallery is part of the Explore experience, followed by the complete studio grid. Keep its inertial drag and horizontal trackpad interaction; vertical touch gestures remain page scrolls. Previous/next buttons and arrow keys provide alternatives to dragging. Reduced motion disables inertial settling. Studio previews remain distinct from listings.

Keep copy concrete. The hero starts directly with “An eye for the rare.”; do not add a generic Web3 eyebrow or decorative status dot above it.

## Future marketplace work

The spotlight currently contains studio previews, not a ranking of on-chain collections. Replace its data source only when real collection discovery is available. Quest and referral routes retain their existing availability notices.

A Sepolia/LitVM NFT bridge is a separate contract and infrastructure project: specify source/destination contracts, supported ERC standards, custody or burn/mint behavior, message verification, and recovery before implementing it. No bridge functionality is implied by this interface update.
