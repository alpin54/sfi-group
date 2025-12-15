const data = {
  menu: [
    {
      slug: 'gadget-accessories',
      name: 'Gadget Accessories',
      subcategories: [
        { name: 'Iphone Case', slug: 'iphone-case' },
        { name: 'Charger', slug: 'charger' },
        { name: 'Screen Protector', slug: 'screen-protector' },
        { name: 'Phone Stand', slug: 'phone-stand' },
        { name: 'USB Cable', slug: 'usb-cable' },
        { name: 'Wireless Charger', slug: 'wireless-charger' },
        { name: 'Phone Mount', slug: 'phone-mount' },
        { name: 'Tempered Glass', slug: 'tempered-glass' },
        { name: 'Phone Ring', slug: 'phone-ring' },
        { name: 'Car Mount', slug: 'car-mount' },
        { name: 'Power Bank', slug: 'power-bank' },
        { name: 'Cable Organizer', slug: 'cable-organizer' },
        { name: 'Phone Lens', slug: 'phone-lens' },
        { name: 'Desk Stand', slug: 'desk-stand' },
        { name: 'Adapter', slug: 'adapter' },
        { name: 'Phone Grip', slug: 'phone-grip' },
        { name: 'Battery Case', slug: 'battery-case' },
        { name: 'Phone Holder', slug: 'phone-holder' },
        { name: 'Charging Dock', slug: 'charging-dock' },
        { name: 'Fast Charger', slug: 'fast-charger' },
        { name: 'Lightning Cable', slug: 'lightning-cable' },
        { name: 'Type-C Cable', slug: 'type-c-cable' },
        { name: 'Pop Socket', slug: 'pop-socket' },
        { name: 'Phone Mirror', slug: 'phone-mirror' }
      ]
    },
    {
      slug: 'it-accessories',
      name: 'IT Accessories',
      subcategories: [
        { name: 'Laptop Sleeve', slug: 'laptop-sleeve' },
        { name: 'USB Hub', slug: 'usb-hub' },
        { name: 'Laptop Stand', slug: 'laptop-stand' },
        { name: 'Keyboard', slug: 'keyboard' },
        { name: 'Mouse', slug: 'mouse' },
        { name: 'Monitor Stand', slug: 'monitor-stand' },
        { name: 'Cooling Pad', slug: 'cooling-pad' },
        { name: 'HDMI Cable', slug: 'hdmi-cable' },
        { name: 'SSD Case', slug: 'ssd-case' },
        { name: 'Laptop Bag', slug: 'laptop-bag' },
        { name: 'External Hard Drive', slug: 'external-hard-drive' },
        { name: 'Webcam', slug: 'webcam' },
        { name: 'Microphone', slug: 'microphone' },
        { name: 'Dock Station', slug: 'dock-station' },
        { name: 'Cable Management', slug: 'cable-management' },
        { name: 'Mouse Pad', slug: 'mouse-pad' },
        { name: 'Monitor Arm', slug: 'monitor-arm' },
        { name: 'Screen Filter', slug: 'screen-filter' },
        { name: 'Laptop Lock', slug: 'laptop-lock' },
        { name: 'Keyboard Cover', slug: 'keyboard-cover' },
        { name: 'USB Flash Drive', slug: 'usb-flash-drive' },
        { name: 'SD Card Reader', slug: 'sd-card-reader' },
        { name: 'Laptop Riser', slug: 'laptop-riser' },
        { name: 'Anti-Glare Film', slug: 'anti-glare-film' }
      ]
    },
    {
      slug: 'audio',
      name: 'Audio',
      subcategories: [
        { name: 'Headphone', slug: 'headphone' },
        { name: 'Earbuds', slug: 'earbuds' },
        { name: 'Speaker', slug: 'speaker' },
        { name: 'Microphone', slug: 'microphone' },
        { name: 'Headset', slug: 'headset' },
        { name: 'Wireless Speaker', slug: 'wireless-speaker' },
        { name: 'Portable Speaker', slug: 'portable-speaker' },
        { name: 'In-Ear Monitor', slug: 'in-ear-monitor' },
        { name: 'Studio Monitor', slug: 'studio-monitor' },
        { name: 'Aux Cable', slug: 'aux-cable' },
        { name: 'XLR Cable', slug: 'xlr-cable' },
        { name: 'Soundbar', slug: 'soundbar' },
        { name: 'Amplifier', slug: 'amplifier' },
        { name: 'Equalizer', slug: 'equalizer' },
        { name: 'Audio Interface', slug: 'audio-interface' },
        { name: 'Mixer', slug: 'mixer' },
        { name: 'Phone Case with Speaker', slug: 'phone-case-with-speaker' },
        { name: 'Earpads', slug: 'earpads' },
        { name: 'Headphone Stand', slug: 'headphone-stand' },
        { name: 'Bluetooth Adapter', slug: 'bluetooth-adapter' },
        { name: 'Audio Cable', slug: 'audio-cable' },
        { name: 'Noise Cancelling', slug: 'noise-cancelling' },
        { name: 'Wireless Earbuds', slug: 'wireless-earbuds' },
        { name: 'Gaming Headset', slug: 'gaming-headset' }
      ]
    },
    {
      slug: 'bags',
      name: 'Bags',
      subcategories: [
        { name: 'Backpack', slug: 'backpack' },
        { name: 'Laptop Bag', slug: 'laptop-bag' },
        { name: 'Messenger Bag', slug: 'messenger-bag' },
        { name: 'Travel Bag', slug: 'travel-bag' },
        { name: 'Shoulder Bag', slug: 'shoulder-bag' },
        { name: 'Crossbody Bag', slug: 'crossbody-bag' },
        { name: 'Duffel Bag', slug: 'duffel-bag' },
        { name: 'Camera Bag', slug: 'camera-bag' },
        { name: 'Gym Bag', slug: 'gym-bag' },
        { name: 'Tote Bag', slug: 'tote-bag' },
        { name: 'School Bag', slug: 'school-bag' },
        { name: 'Business Bag', slug: 'business-bag' },
        { name: 'Weekender Bag', slug: 'weekender-bag' },
        { name: 'Clutch', slug: 'clutch' },
        { name: 'Waist Bag', slug: 'waist-bag' },
        { name: 'Rolling Luggage', slug: 'rolling-luggage' },
        { name: 'Weekday Pack', slug: 'weekday-pack' },
        { name: 'Cable Pouch', slug: 'cable-pouch' },
        { name: 'Document Bag', slug: 'document-bag' },
        { name: 'Sling Bag', slug: 'sling-bag' },
        { name: 'Beach Bag', slug: 'beach-bag' },
        { name: 'Organizer Bag', slug: 'organizer-bag' },
        { name: 'Hiking Backpack', slug: 'hiking-backpack' },
        { name: 'Sports Bag', slug: 'sports-bag' }
      ]
    },
    {
      slug: 'promo',
      name: 'Promo',
      subcategories: []
    },
    {
      slug: 'others',
      name: 'Others',
      subcategories: [
        { name: 'Backpack', slug: 'backpack' },
        { name: 'Desk Organizer', slug: 'desk-organizer' },
        { name: 'Cable Tie', slug: 'cable-tie' },
        { name: 'Storage Box', slug: 'storage-box' },
        { name: 'Phone Holder', slug: 'phone-holder' },
        { name: 'Sticker', slug: 'sticker' },
        { name: 'Cleaning Kit', slug: 'cleaning-kit' },
        { name: 'Protective Film', slug: 'protective-film' },
        { name: 'Stand', slug: 'stand' },
        { name: 'Strap', slug: 'strap' },
        { name: 'Clip', slug: 'clip' },
        { name: 'Hook', slug: 'hook' },
        { name: 'Bracket', slug: 'bracket' },
        { name: 'Adapter Ring', slug: 'adapter-ring' },
        { name: 'Carrying Case', slug: 'carrying-case' },
        { name: 'Lens Cap', slug: 'lens-cap' },
        { name: 'Screen Cleaner', slug: 'screen-cleaner' },
        { name: 'Dust Plug', slug: 'dust-plug' },
        { name: 'Replacement Part', slug: 'replacement-part' },
        { name: 'Warranty Card', slug: 'warranty-card' },
        { name: 'Manual', slug: 'manual' },
        { name: 'Accessory Pack', slug: 'accessory-pack' },
        { name: 'Miscellaneous', slug: 'miscellaneous' },
        { name: 'Bundle Item', slug: 'bundle-item' }
      ]
    }
  ],
  newArrivals: [
    {
      name: 'Wireless Charger Pro',
      slug: 'wireless-charger-pro'
    },
    {
      name: 'USB-C Hub 7 in 1',
      slug: 'usb-c-hub-7-in-1'
    },
    {
      name: 'Mechanical Gaming Keyboard',
      slug: 'mechanical-gaming-keyboard'
    },
    {
      name: 'Portable SSD 1TB',
      slug: 'portable-ssd-1tb'
    },
    {
      name: 'Bluetooth Neckband Speaker',
      slug: 'bluetooth-neckband-speaker'
    }
  ],
  popularProducts: [
    {
      name: 'Noise Cancelling Headphones',
      slug: 'noise-cancelling-headphones'
    },
    {
      name: 'Premium Laptop Backpack',
      slug: 'premium-laptop-backpack'
    },
    {
      name: 'Fast Charging Power Bank 20000mAh',
      slug: 'fast-charging-power-bank-20000mah'
    },
    {
      name: 'Wireless Mouse Pro',
      slug: 'wireless-mouse-pro'
    },
    {
      name: 'Phone Ring Stand',
      slug: 'phone-ring-stand'
    }
  ],
  popularBrands: [
    {
      name: 'TechGear',
      slug: 'techgear'
    },
    {
      name: 'SmartPro',
      slug: 'smartpro'
    },
    {
      name: 'EliteAudio',
      slug: 'eliteaudio'
    },
    {
      name: 'GadgetMax',
      slug: 'gadgetmax'
    },
    {
      name: 'CyberTech',
      slug: 'cybertech'
    }
  ]
};

export default data;
