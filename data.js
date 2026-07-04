const PORTFOLIO_DATA = {
  identity: {
    pseudo: "DE MATTEIS Mylan",
    title1: "DE MATTEIS Mylan",
    title2: "Unreal Engine Gameplay Developer",
    tagline: "I build interactive worlds where players can have fun and switch off for a while."
  },

  about: {
    portrait: "images/DEMATTEIS_Mylan_Applause.png",
    lead: "I'm a gameplay developer specialized in Unreal Engine and Blueprints.",
    paragraph1: "I like designing systems that are clean and modular enough to evolve without breaking, and gameplay that feels smooth and easy to read for the player. I enjoy inventing new mechanics and seeing them come together with the rest of the game.\n\nI'm especially drawn to FPS and co-op games, where strong systems and good moment-to-moment feedback really show.",
    skills: [
      "Unreal Engine",
      "Blueprints",
      "Multiplayer / Networking",
      "AI (State Trees / Behavior Trees)",
      "Game Design",
      "Level Design",
      "Git / Perforce"
    ]
  },

  contact: {
    email: "dematteismylan@icloud.com",
    emailLink: "mailto:dematteismylan@icloud.com",
    linkedin: "linkedin.com/in/mylan-de-matteis",
    linkedinLink: "https://www.linkedin.com/in/mylan-de-matteis/",
    github: "github.com/17mylan",
    githubLink: "https://github.com/17mylan",
    cvFile: "CV_DEMATTEIS_MYLAN.pdf",
    cvLabel: "Download Resume",
    cvViewLabel: "View Resume"
  },

  projects: [
    {
      id: "far-far-west",
      title: "Far Far West",
      year: "2025",
      shortDescription: "A 1-4 player co-op FPS blending gunfights and magic in a weird Wild West overrun by monsters.",
      cover: "images/ffw_titlescreen.jpg",
      coverDetail: "images/ffw_titlescreen.jpg",
      details: {
        role: "Gameplay Developer (Blueprints)",
        team: "Evil Raptor, team of 8",
        publisher: "Fireshine Games",
        duration: "Ongoing. Started as a 3-month internship, now a permanent role.",
        engine: "Unreal Engine 5",
        platform: "PC, Steam (Early Access, Apr 28, 2026)",
        about: "Far Far West is a 1\u20134 player co-op FPS blending gunfights and magic in a weird Wild West overrun by monsters, reanimated skeletons and deadly storms. Players form a crew of bounty-hunting robot cowboys, take on contracts from the Town Sheriff, complete missions, and bring home the loot together.\n\nThe game launched in Early Access on Steam on April 28, 2026, published by Fireshine Games and developed by Evil Raptor.",
        contribution: "I joined the project as an end-of-studies intern and transitioned into a permanent gameplay role on the same team. I work across three main areas: **mission objectives**, the **joker progression system**, and **AI**. Every feature I ship is built and tested to run cleanly in 1\u20134 player co-op.\n\n## Mission objectives & map secrets\n\nI design and implement co-op objectives end to end, with automatic scaling based on player count.\n\n- **Laser Cannon.** Players repair pressurized valve leaks while defending the cannon from enemy waves, then resolve a colored-sequence puzzle to fire it. Cooperative by design, the defense is unmanageable solo and the resolution rewards coordination.\n- **Gas Bomb (memory game).** A central screen displays the sequence of components the team must assemble. Players reproduce the sequence X times under enemy pressure, X scaling with the player count.\n- **Payload.** Find the lever order to activate the payload, then escort and protect it across the map until it reaches the boss spawner and detonates, triggering the boss encounter.\n\nThe main technical challenge is keeping state coherent across all clients (sequences generated server-side, replicated validation, synchronized visual feedback) while keeping the logic readable and tunable for design iteration.\n\nI also design and implement the hidden secrets scattered across the game's maps. Done so far: **Canyon**, **Jungle**, **Desert**, **Area 41**, and **Far Far North**.\n\n## Joker system (weapon & character modifiers)\n\nI'm responsible for creating individual jokers and ensuring they combine cleanly with the rest of the system. Players spend a shared **joker points** budget on rarity-tiered modifiers:\n\n- **Weapon jokers.** Ricochet bullets, explosive rounds, faster reload, and others.\n- **Character jokers.** Movement speed, reduced gravity, and others.\n\nI implemented diminishing returns on stackable effects and a tag-based balancing pass, preserving build diversity without degenerate builds. Balancing of my systems is part of my responsibilities.\n\n## AI: State Trees rework & the Zurker army\n\nI took part in the AI architecture rework that moved the game from a pure Blueprint AI setup to a **State Trees + Blueprint** hybrid, with cleaner separation between state logic and execution. I worked on several enemies and contributed to boss AI on the project.\n\nOne of the enemy factions I own is the **Zurkers**, an alien army that forms the faction following the **Cryptics** (the game's skeleton faction). I code their AI, and whenever an existing behavior feels too weak or not fun enough in practice, I dig into it and design/implement a stronger, more interesting solution.\n\n## Multiplayer (Unreal networking)\n\nAll my features are replicated and tested in co-op. I work across the Unreal networking stack: **RPCs** (Server / Client / Multicast), property replication, **NetCullDistance**, **AlwaysRelevant**, authority handling, and debugging desync issues. This is the area where I have grown the most on this project, and one I keep deepening.\n\n## Live development\n\nI also handle gameplay bug investigation and fixing across an actively developed Early Access build, with a particular focus on desync and replication-related issues.",
        links: [
          { url: "https://store.steampowered.com/app/3124540/Far_Far_West/", platform: "steam", label: "View on Steam" }
        ],
        gallery: [
          "images/ffw_screen_1.jpg",
          "images/ffw_screen_2.jpg",
          "images/ffw_screen_3.jpg",
          "images/ffw_screen_4.jpg",
          "images/ffw_screen_5.jpg",
          "images/ffw_screen_6.jpg",
          "images/ffw_screen_7.jpg",
          "images/ffw_screen_8.jpg"
        ]
      }
    },
    {
      id: "unknowz",
      title: "Unknowz",
      year: "2024 — 2025",
      shortDescription: "Unknowz is a cooperative platformer where two pirates, one alive, the other undead, must combine their unique abilities to solve puzzles, avoid traps, and escape from a skeleton-infested island. Work together... or sink!",
      cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3826300/e00cd65c8dc373efc8e3187f663af1aff88951e6/capsule_616x353.jpg?t=1763145061",
      coverFit: "contain",
      coverDetail: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3826300/e00cd65c8dc373efc8e3187f663af1aff88951e6/capsule_616x353.jpg?t=1763145061",
      coverDetailFit: "contain",
      details: {
        role: "Lead Developer",
        team: "Student team — e-artsup Lyon",
        engine: "Unreal Engine 5",
        platform: "PC",
        duration: "9 months (2024 — 2025)",
        about: "Dive into an explosive pirate world developed in Unreal Engine 5, where two completely opposite pirates, one alive, the other undead, must cooperate to escape an island overrun by hostile skeletons. This cooperative adventure game throws you into a thrilling experience blending puzzles, stealth, and controlled chaos. Team up, combine your strengths, and escape this bony trap… if you dare!\n\nIn this cooperative game, two players take control of Jack, an undead pirate obsessed with black powder, and Ed, a living pirate struggling with self-doubt. Explore an island filled with traps and enemies, solve duo-based puzzles, and overcome explosive situations where coordination and timing are key. Each character has unique mechanics, and only well-oiled teamwork will lead you to survival.",
        contribution: "I was the sole developer on Unknowz. I handled the 3Cs (Camera, Character, Controls), enemy AI, and all gameplay systems. The dynamic camera was one of the most challenging parts to develop, requiring custom logic to adapt to gameplay and level design. From interactions to mechanics, everything was coded and implemented by me. I also ensured optimization and stability from prototype to final build.",
        links: [
          { url: "https://store.steampowered.com/app/3826300/", platform: "steam", label: "View on Steam" }
        ],
        gallery: [
          "images/unknowz_screen_1.jpg",
          "images/unknowz_screen_2.jpg",
          "images/unknowz_screen_3.jpg",
          "images/unknowz_screen_4.jpg",
          "images/unknowz_screen_5.jpg",
          "images/unknowz_screen_6.jpg",
          "images/unknowz_screen_7.jpg",
          "images/unknowz_screen_8.jpg",
          "images/unknowz_screen_9.jpg",
          "images/unknowz_screen_10.jpg"
        ]
      }
    }
  ],

  experience: [
    {
      type: "education",
      title: "e-artsup Lyon",
      link: "https://www.e-artsup.net/campus/ecole-creation-visuelle-lyon/",
      subtitle: "Game Design & Development",
      location: "Lyon, France",
      startYear: 2022,
      endYear: 2025,
      startLabel: "Sept. 2022",
      endLabel: "Jul. 2025",
      description: "Three-year program specialized in video game design and development. Hands-on training in game engines, programming, gameplay design and team-based productions.",
      tags: ["Unreal Engine", "Blueprints", "Game Design", "Level Design", "Sound Design", "Team Projects"]
    },
    {
      type: "work",
      title: "Far Far West",
      link: "https://www.evilraptor.com/",
      subtitle: "Gameplay Developer at Evil Raptor",
      location: "Studio",
      startYear: 2025,
      endYear: null,
      startLabel: "2025",
      endLabel: "Present",
      description: "Joined Evil Raptor as an end-of-studies intern on Far Far West and transitioned into a permanent gameplay role. Working on mission objectives, the joker progression system, the AI rework (State Trees + Blueprint) and the Unreal networking layer, on a 1\u20134 player co-op FPS published by Fireshine Games.",
      tags: ["Unreal Engine", "Blueprints", "Multiplayer", "AI", "Game Design", "Sound Design"]
    }
  ]
};
