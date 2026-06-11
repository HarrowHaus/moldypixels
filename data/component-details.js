window.MP_COMPONENT_DETAILS = {
  button: {
    name: 'Button',
    category: 'Action',
    status: 'prototype',
    sharedPurpose: 'Buttons trigger actions, submit forms, open overlays, switch modes, or confirm selections. In Moldy Pixels, the Button keeps one shared semantic contract while each kit translates the visual behavior differently.',
    sharedAccessibility: [
      'Use a real <button> for actions and an <a> for navigation.',
      'Preserve visible focus styles in every visual system.',
      'Disabled buttons must not rely on opacity alone.',
      'Pressed/active states must be visible without motion.',
      'Icon-only buttons need an accessible label.'
    ],
    sharedVariants: ['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive'],
    sharedSizes: ['sm', 'md', 'lg', 'icon'],
    kits: {
      saveglass: {
        kitName: 'Saveglass UI',
        routeHome: '../../../saveglass/',
        title: 'Saveglass Button',
        thesis: 'A Saveglass button is a selectable system slot. It should feel like a memory-screen command: labeled, bordered, stateful, and slightly luminous only when active or important.',
        anatomy: ['slot shell', 'metadata-capable label', 'state glow', 'active rail', 'pressed system feedback'],
        do: ['Use glow for active/primary actions only.', 'Pair important actions with metadata labels when needed.', 'Keep the shape compact and system-like.'],
        dont: ['Do not turn every button into a glowing orb.', 'Do not use blur or transparency when legibility matters.', 'Do not make primary and destructive states visually ambiguous.'],
        preview: '<div class="detail-preview-stack"><button class="sg-button primary">Save Slot</button><button class="sg-button outline">Open Registry</button><button class="sg-button ghost">Cancel</button></div>',
        code: '<button class="sg-button primary">Save Slot</button>'
      },
      'machine-candy': {
        kitName: 'Machine Candy UI',
        routeHome: '../../../machine-candy/',
        title: 'Machine Candy Button',
        thesis: 'A Machine Candy button is a molded plastic control. It should look physically pressable: chunky shell, candy color, seam border, and compression on active state.',
        anatomy: ['molded plastic cap', 'dark seam', 'bottom compression shadow', 'appliance color mode', 'tactile label'],
        do: ['Make the pressed state physically obvious.', 'Use color as appliance mode, not random decoration.', 'Keep labels short and chunky.'],
        dont: ['Do not make the button flat pastel SaaS.', 'Do not remove the compression feedback.', 'Do not let cute styling override tap target size.'],
        preview: '<div class="detail-preview-stack"><button class="mc-btn primary">Start</button><button class="mc-btn mint">Mode</button><button class="mc-btn sky">Info</button></div>',
        code: '<button class="mc-btn primary">Start</button>'
      },
      'menu-ink': {
        kitName: 'Menu Ink UI',
        routeHome: '../../../menu-ink/',
        title: 'Menu Ink Button',
        thesis: 'A Menu Ink button is a formal command selection. It should feel like a deliberate menu entry or chapter command: framed, typographic, restrained, and decisive when selected.',
        anatomy: ['ink frame', 'uppercase command label', 'formal selected fill', 'quiet border', 'chapter-level spacing'],
        do: ['Use filled ink states for primary or active commands.', 'Keep action language formal and direct.', 'Prefer rectangular command geometry over pills.'],
        dont: ['Do not add fantasy parchment styling.', 'Do not over-ornament simple actions.', 'Do not use playful bounce or candy colors.'],
        preview: '<div class="detail-preview-stack"><button class="mi-btn primary">Select</button><button class="mi-btn gold">Open Folio</button><button class="mi-btn">Cancel</button></div>',
        code: '<button class="mi-btn primary">Select</button>'
      }
    }
  }
};
