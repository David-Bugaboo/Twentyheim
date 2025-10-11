import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import WarbandIndex from "../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  QuoteBox,
  QuoteAttribution,
} from "../components/PageComponents";
import { styled } from "@mui/material/styles";
import slugify from "slugify";

const EventCard = styled(Box)(({ theme }) => ({
  marginTop: "2rem",
  padding: "1.5rem",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)
  `,
  border: "2px solid rgba(139, 115, 85, 0.4)",
  borderRadius: "4px",
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(212, 175, 55, 0.15)
  `,
  [theme.breakpoints.down("sm")]: {
    marginTop: "1.5rem",
    padding: "1.25rem 1rem",
  },
}));

const EventHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid rgba(139, 115, 85, 0.3)",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "flex-start",
  },
}));

const DiceRange = styled(Box)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#d4af37",
  padding: "0.5rem 1rem",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(139, 115, 85, 0.4)",
  borderRadius: "4px",
  minWidth: "80px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: "0.4rem 0.75rem",
    minWidth: "70px",
  },
}));

const EventTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#d4af37",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const EventDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

const explorationEvents = [
  {
    range: "01-05",
    title: "Shanked in a Dark Alley",
    description: `[Event - Ambush]

The flickering shadows of a ruined alleyway suddenly burst to life as hooded figures emerge from the darkness. Your explorer barely has time to draw steel before they strike.

Roll a d20:
• 1-15: The ambush is brutal. Make an injury roll for this fighter.
• 16-20: Your warrior fights like a cornered wolf, cutting through the thugs. The fighter survives and gains 100 XP from the harrowing experience.`,
  },
  {
    range: "06-10",
    title: "Return Empty-Handed",
    description: `[Event - Nothing Found]

Hours of searching through rubble and ruins yield nothing but dust and disappointment. The cursed city guards its secrets well today. Perhaps tomorrow fortune will smile differently.

This result has no effect.`,
  },
  {
    range: "11-15",
    title: "Wyrdstone Glimmer",
    description: `[Event - Discovery]

A faint green glow catches your eye from beneath a collapsed beam. Wyrdstone! The corrupted crystal pulses with malevolent energy as you carefully extract it from the debris.

Roll once on the Treasure Tables.`,
  },
  {
    range: "16-17",
    title: "Derelict Inn",
    description: `[Location - Inn]

Through the broken walls, you discover a mostly intact tavern. The sign still creaks in the wind: "The Hanged Man." Inside, the common room could serve as defensible shelter, and the cellars still hold forgotten casks of ale.

The warband may move to this Location. If not moved, the warband is treated as occupying this base until the end of the next game.`,
  },
  {
    range: "18-19",
    title: "Abandoned Shrine",
    description: `[Location - Temple]

Amidst the devastation stands a small temple to Sigmar, its holy symbols still faintly glowing with divine protection. The sanctified ground offers refuge from the restless dead and the whispers of Chaos.

The warband may move to this Location. If not moved, the warband is treated as occupying this base until the end of the next game.`,
  },
  {
    range: "20-21",
    title: "Garden of Morr",
    description: `[Location - Crypt]

The cemetery's iron gates stand open, revealing rows of ancient crypts and mausoleums. In Mordheim, even the dead must rest somewhere — and the living may find shelter among them, if they dare.

The warband may move to this Location. If not moved, the warband is treated as occupying this base until the end of the next game.`,
  },
  {
    range: "22-23",
    title: "Crumbling Observatory",
    description: `[Location - Tower]

The tower stretches toward the corrupted sky, its top floors collapsed but its base intact. Ancient star charts and arcane instruments litter the floor — a scholar's sanctuary turned fortress.

The warband may move to this Location. If not moved, the warband is treated as occupying this base until the end of the next game.`,
  },
  {
    range: "24-25",
    title: "Forgotten Brewery",
    description: `[Location - Brewery]

The smell of old ale and hops still lingers in this abandoned brewery. Massive copper vats and storage cellars provide both shelter and supplies. The rats seem fatter here — a good sign.

The warband may move to this Location. If not moved, the warband is treated as occupying this base until the end of the next game.`,
  },
  {
    range: "26-27",
    title: "Alchemist's Laboratory",
    description: `[Location - Laboratory]

Glass vials, strange apparatus, and mysterious stains cover every surface. This alchemist's workshop survived the comet's impact remarkably well — perhaps too well. The air itself seems to shimmer with residual magic.

The warband may move to this Location. If not moved, the warband is treated as occupying this base until the end of the next game.`,
  },
  {
    range: "28-29",
    title: "Dwarf Troll Slayer",
    description: `[Hired Sword - Dwarf Slayer]

In a tavern cellar turned black market, a tattooed Dwarf sits alone, his massive axe resting against the table. His orange mohawk and death-seeking eyes mark him as a Slayer — a warrior with nothing left to lose.

• Mercenaries, Witch Hunters: May hire for 100gc + upkeep
• Dwarves: May hire for 75gc + upkeep
• All others: The Slayer challenges you to combat. Make a Fight check (TN 15)
  - Success: Defeat the slayer in honorable combat, granting him his glorious death. Gain 50 XP.
  - Failure: The Slayer's fury is overwhelming. Roll injury roll for your explorer.`,
  },
  {
    range: "30-31",
    title: "Elf Ranger",
    description: `[Hired Sword - Elf Ranger]

An Asrai warrior emerges from the shadows, bow drawn and arrow nocked. Their eyes are ancient and wary, measuring your worth with a single glance. Few elves dare enter Mordheim — this one must be desperate or mad.

• Mercenaries, Witch Hunters: May hire for 120gc + 10% upkeep
• Dwarf Treasure Hunters: May hire for 120gc + 20% upkeep (grudging acceptance)
• Undead, Skaven, Orcs, Lizardmen, Cult of the Possessed: The elf attacks on sight. Make a Fight check (TN 15)
  - Success: Cut down the elf in combat. Gain 50 XP.
  - Failure: The ranger's arrows find their mark. Roll injury roll.
• All others: May pay 20gc for the elf's knowledge of terrain and tactics. Your warband starts the next game with +1 Move during the first turn.`,
  },
  {
    range: "32-33",
    title: "Freelance Mercenary",
    description: `[Hired Sword - Mercenary Knight]

A lone warrior in battered plate armour steps from the ruins, sword in hand. No banner, no lord — just a fighter seeking gold and glory in the City of the Damned.

• Mercenaries, Witch Hunters, Dwarf Treasure Hunters: May hire for 150gc + 10% upkeep
• Skaven, Vampire Courts, Orcs, Cult of the Possessed: The mercenary recognizes evil when he sees it. Make a Fight check (TN 16)
  - Success: Overcome the veteran warrior. Gain 70 XP.
  - Failure: His blade finds flesh. Roll injury roll.
• All others: May hire the freelancer as a combat instructor. Learn any Horsemanship advancement from Spellcaster Magazine #1 for half price.`,
  },
  {
    range: "34-35",
    title: "Halfling Scout",
    description: `[Hired Sword - Halfling]

Between the ruined houses, a small figure watches from the shadows. The halfling's sharp eyes miss nothing, and his light step could prove invaluable in the treacherous streets.

• Any warband except Skaven, Undead, Possessed, Orcs: May hire for 100gc + 10% upkeep
• Skaven, Undead, Possessed, Orcs: The halfling flees in terror. Make a Fight check (TN 13) to catch him
  - Success: The chase ends in blood. Gain 30 XP.
  - Failure: Your warrior stumbles during the pursuit. Roll injury roll.`,
  },
  {
    range: "36-37",
    title: "Ogre Bodyguard",
    description: `[Hired Sword - Ogre]

A massive shape blocks the narrow street — eight feet of muscle and hunger. The ogre's tiny eyes gleam with mercenary cunning. He'll fight for anyone who can feed him and pay him. Not necessarily in that order.

• Any warband except Skaven: May hire for 125gc + 10% upkeep
• Skaven: The ogre is hungry, and you look like food. Make a Fight check (TN 17)
  - Success: Drive off the brute through sheer determination. Gain 80 XP.
  - Failure: The ogre's club strikes true. Roll injury roll.`,
  },
  {
    range: "38-39",
    title: "Rogue Warlock",
    description: `[Hired Sword - Warlock]

Dark robes shift in the shadows as a spellcaster approaches. Arcane symbols glow faintly on his staff, and the stench of brimstone follows in his wake. His services are available — for a price.

• Any warband except Witch Hunters, Sisters of Sigmar: May hire for 100gc + 10% upkeep
• Witch Hunters, Sisters of Sigmar: The servants of Sigmar cannot abide witchcraft. Make a Will check (TN 15) to resist attacking
  - Success: Suppress your righteous fury. Gain 50 XP for the act of restraint.
  - Failure: The warlock curses your entire warband before vanishing. All figures start the next game under the effect of the Curse spell (ends after first turn).`,
  },
  {
    range: "40-41",
    title: "Arabian Merchant",
    description: `[Hired Sword - Merchant]

Silks and exotic perfumes announce the merchant's presence before you see him. His caravan of rare goods and stranger services has somehow survived the chaos of Mordheim. Gold opens many doors, he explains with a smile.

• Mercenaries, Dwarfs, Witch Hunters, Sisters of Sigmar, Lizardmen: May hire for 100gc + 10% upkeep
• Others: The merchant eyes you with suspicion. Make a Will check (TN 15)
  - Success: Convince him of your honorable intentions. Gain 50 XP.
  - Failure: The merchant's guards rob you in the confusion. Lose 50gc.`,
  },
  {
    range: "42-43",
    title: "Beast Hunter",
    description: `[Hired Sword - Hunter]

Furs, trophies, and the smell of the wild mark this ranger as a professional monster slayer. Scars cover his arms, and his eyes hold the calm of one who has faced death and walked away.

• Any warband except Skaven, Undead, Orcs, Possessed: May hire for 125gc + 10% upkeep
• Skaven, Undead, Orcs, Possessed: The hunter sees you as prey. Make a Fight check (TN 15)
  - Success: Turn the hunter into the hunted. Gain 50 XP.
  - Failure: Word spreads of your warband's presence. All figures gain Bounty(their hiring cost) during the next game.`,
  },
  {
    range: "44-45",
    title: "Highwayman",
    description: `[Hired Sword - Brigand]

"Your coin or your life," comes the voice from the shadows. A cloaked figure steps forward, blade gleaming. In Mordheim, even the criminals need allies — or victims.

• Any warband except Sisters of Sigmar, Witch Hunters: May hire for 100gc + 10% upkeep
• Sisters of Sigmar, Witch Hunters: Cannot abide brigandage. Make a Fight check (TN 15)
  - Success: Justice is swift. Gain 50 XP and loot 50gc from the body.
  - Failure: The brigand's blade strikes true. Roll injury roll and lose one random piece of equipment.`,
  },
  {
    range: "46-47",
    title: "Imperial Assassin",
    description: `[Hired Sword - Assassin]

You never saw him approach. One moment the ruins were empty, the next moment a black-clad figure stands before you, twin daggers glinting. "I hear you pay well for discretion," he whispers.

• Any warband except Witch Hunters, Sisters of Sigmar, Orcs, Skaven: May hire for 80gc + 10% upkeep
• Others: The assassin takes offense at your nature. Make a Fight check (TN 15)
  - Success: Survive the lethal assault. Gain 50 XP.
  - Failure: Poisoned blades leave their mark. Roll injury roll and start the next game Poisoned.`,
  },
  {
    range: "48-49",
    title: "Roadwarden",
    description: `[Hired Sword - Warden]

A patrolman's uniform, torn and blood-stained, marks this survivor as one of Mordheim's former defenders. He still carries his badge and his duty, though both seem meaningless now in the ruined city.

• Witch Hunters, Sisters of Sigmar, Dwarfs, Human Mercenaries, Lizardmen: May hire for 120gc + 20gc upkeep
• Others: The warden still remembers his duty to hunt criminals. Make a Fight check (TN 15)
  - Success: Defeat the lawman. Gain 50 XP.
  - Failure: The warden marks you as wanted. Roll injury roll and gain Bounty(100) during the next game.`,
  },
  {
    range: "50-51",
    title: "Tilean Marksman",
    description: `[Hired Sword - Marksman]

The crack of a crossbow bolt splintering stone announces the marksman's presence. A Tilean mercenary with a professional's eye and a fortune-seeker's heart. His services don't come cheap, but his aim never misses.

• Any warband except Skaven, Orcs, Undead: May hire for 150gc + 10% upkeep
• Skaven, Orcs, Undead: The marksman considers you target practice. Make a Fight check (TN 15)
  - Success: Close the distance before he reloads. Gain 50 XP.
  - Failure: Crossbow bolts pierce armour and flesh. Roll injury roll and start the next game at half health.`,
  },
  {
    range: "52-53",
    title: "Aenur, Sword of Twilight",
    description: `[Dramatis Personae - Elf Swordmaster]

A sharp rap at your encampment's gate breaks the evening silence. Standing in the shadows is a figure of legend — Aenur, the Elf who single-handedly slaughtered Karl Zimmeran's entire Possessed warband and cleansed the Rat Hole of Beastmen. 

Tall even for an Elf, he stands wrapped in a finely woven cloak, ithilmar armour gleaming beneath. The greatsword on his back is said to possess arcane properties. None struck by it have lived to tell the tale. His pale face betrays no emotion as he offers his services.

Rumors swirl about his origins — some say he's a Swordmaster from the fabled kingdoms of Ulthuan, others claim he's a Wood Elf prince in exile. Aenur himself says nothing of his past, and the wise do not question him. What he seeks in Mordheim's cursed ruins remains his secret alone.

• Any warband except Skaven, Undead, Possessed: Make a Will check (TN 13) to meet his inscrutable gaze and negotiate
  - Success: Aenur's silent nod seals the arrangement. May hire for 150gc (no upkeep)
  - Failure: The Elf's piercing eyes find you unworthy. He departs without a word. No penalty.

• Skaven, Undead, Cult of the Possessed: Aenur's hand moves to his sword hilt. The slayer of Karl Zimmeran's warband stands before you, and his hatred of corruption is absolute. He attacks without warning or mercy.
  - Automatic Fight check (TN 19) — there is no negotiation, only survival
  - Success: Through desperate skill or blind luck, you drive back the legendary warrior. Gain 150 XP and earn a permanent enemy — Aenur will hunt your warband. In every future game, there is a 1-in-20 chance he appears as a neutral enemy figure hunting your leader.
  - Failure: The greatsword's arcane blade cuts through armour like parchment. Roll injury roll twice and take both results.`,
  },
  {
    range: "54-55",
    title: "Bertha Bestraufrung",
    description: `[Dramatis Personae - High Matriarch of Sigmar]

The clang of warhammer on steel echoes through the ruins. In a dawn-lit courtyard, a warrior woman practices her forms with relentless precision. Long golden plaits whip as she moves, and her fierce blue eyes could freeze a Goblin at twenty paces.

This is Bertha Bestraufrung, High Matriarch and Abedissa of Sigmar's Rock. Pure Unberogen blood runs in her veins, and her voice commands such authority that strong men tremble before her. Clad in Gromril armour and bearing twin great warhammers, she is the living embodiment of Sigmar's wrath and mercy.

Named successor by the dying Matriarch Cassandra herself, Bertha leads by example — strict discipline, unwavering devotion, and martial perfection. Sometimes she reflects on lost innocence, but such thoughts are buried beneath iron-hard resolve and endless preparation for battle.

• Sisters of Sigmar: Make a Will check (TN 12) to prove your faith worthy before the High Matriarch
  - Success: Bertha recognizes your devotion to Sigmar's cause. May hire for 175gc (no upkeep)
  - Failure: She finds your warband's discipline lacking. Spend the next game proving yourselves — no penalty, but cannot hire her until after your next victory.

• Mercenaries, Witch Hunters, Dwarfs, Lizardmen: The righteous warrior respects honorable fighters. Make a Will check (TN 14) to gain her grudging respect
  - Success: She acknowledges your cause as just, but cannot abandon her Sisters. Gain her blessing: +1 Will to all figures in your next game.
  - Failure: She turns away in disappointment. No penalty.

• Skaven, Undead, Vampire Courts, Cult of the Possessed: Abomination stands before the High Matriarch of Sigmar. Her warhammers rise, and her voice rings with divine fury. There will be no words, only judgment.
  - Automatic Fight check (TN 18) — Sigmar's wrath cannot be reasoned with
  - Success: Somehow survive the holy onslaught. Gain 130 XP, but Bertha's wrath follows you — your warband is marked. For the next three games, any Sisters of Sigmar enemies gain +1 to Fight and Damage when fighting your warband.
  - Failure: The Gromril warhammers shatter bone and spirit alike. Roll injury roll twice and take both results.`,
  },
  {
    range: "56-57",
    title: "Johann The Knife",
    description: `[Dramatis Personae - Master Assassin]

In the filthy corner of a half-collapsed tavern, a man in dark, unwashed leather counts gold coins with practiced ease. His purse is heavy and conspicuous — only a fool would try to steal from Johann the Knife. Many have tried. All died quickly.

His long, scarred face and lank, greasy hair mark a life lived in shadows. Various lethal daggers hang from his belt, each one a masterwork stolen from wealthy opponents he dispatched in vicious duels. The mean glint in his eyes speaks of cold calculation: no traces, all very neat and tidy.

Johann knows Mordheim like the back of his hand. Quick as lightning with a blade, he can slip in and out of anywhere unseen — or fight his way out of anywhere if discovered. Word travels fast in the underworld. Speak his name too loudly, and he'll find you. Whether that's good or bad depends on what you're offering.

He takes his payment in gold... or in Crimson Shade, the drug to which he's thoroughly addicted.

• Any warband except Skaven, Undead, Possessed: Make a Will check (TN 12) to make your proposition without showing fear
  - Success: Johann's cold eyes appraise you. "Gold or Shade. Your choice." May hire for 70gc + 30gc upkeep OR 1 dose of Crimson Shade + 1 dose per game. Paying him in Crimson Shade is 20% cheaper, but his Will stat will be 0 for each game where his upkeep is paid in Shade.. 
  - Failure: Your nervousness amuses him, but business is business. May still hire at the same rate — no penalty. The explorer feels humiliated and loses 30XP.

• Sisters of Sigmar, Witch Hunters: Your righteous reputation precedes you. Johann respects professional killers, even holy ones. Make a Will check (TN 13) to suppress your moral objections
  - Success: Swallow your pride and hire a murderer for the greater good. May hire for 70gc + 30gc upkeep. Your Hero/Champion have -1 Will in games where he is employed.
  - Failure: You cannot abide dealing with an assassin. Johann shrugs and melts into the shadows. Gain 30 XP for maintaining your principles.

• Skaven, Undead, Vampire Courts, Cult of the Possessed: Johann's contracts are clear — he doesn't work for monsters, and he's killed enough of your kind to earn their bounties three times over. He attacks the moment he recognizes what you are.
  - Automatic Fight check (TN 17) — the master assassin strikes first
  - Success: Turn the tables on the legendary killer. Gain 110 XP and loot 100gp he dropped before melding into the shadows.
  - Failure: Lightning-fast daggers find every gap in your armour. Roll thrice in the injury table  — You cannot make black market rolls for the next 3 games (Johann's network remembers).`,
  },
  {
    range: "58-59",
    title: "Veskit, High Executioner of Clan Eshin",
    description: `[Dramatis Personae - Skaven Assassin-Construct]

"It killed us all! Couldn't stop it... weapons broke against its body... black like a shadow, moving so fast... cutting men to shreds... Marcus tried oil, set it ablaze, but it kept coming, still burning... that eye... that red eye always watching..." — Last words of Fritz Huber at the Inn of the Red Moon

A chittering mechanical laugh echoes from the darkness. Then you see it: a shadow that moves wrong, too fast, too fluid. Veskit — more machine than ratman now. Once a talented Clan Eshin assassin, he was nearly killed rescuing a Clan Skryre Warlock from rival skaven. The Warlock Engineers rebuilt him as payment: technological and magical implants replacing flesh, turning him into a walking arsenal.

His unblinking red eye misses nothing. His thirst for killing has become uncontrollable. The Nightmaster of Clan Eshin sent him to Mordheim to deter the man-things from the city that "rightfully belongs to Skaven." Those he hunts in these streets never return to the Gargoyle Gate.

Weapons break against his mechanical body. Fire cannot stop him. He is relentless. He is merciless. He is death in the dark.

• Skaven: The legendary executioner acknowledges fellow Skaven with cold evaluation. Make a Will check (TN 13) to negotiate without showing weakness
  - Success: Veskit's mechanical voice hisses acceptance. "Man-things will die-perish." May hire for 80gc + 35gc upkeep
  - Failure: He questions your clan's worthiness. Must prove yourself — no hire until you win your next battle.

• Witch Hunters, Sisters of Sigmar: An abomination that blends technology, dark magic, and ratman corruption. It must be destroyed in Sigmar's name. Make a Fight check (TN 18) — this will be the hardest battle of your life
  - Success: Through faith and fury, you drive back the mechanical horror. Gain 150 XP. Veskit retreats but remembers. In every future game, there's a 1-in-20 chance he appears hunting your leader specifically.
  - Failure: Warpstone-edged blades move faster than sight. Weapons shatter against his mechanical frame. Roll injury roll three times and take all three results. Your explorer treat every skaven figure as having the Fear trait.

• Mercenaries, Dwarfs, Orcs, Lizardmen: Man-things and lesser races. Veskit considers you target practice for his implanted weapons. Make a Fight check (TN 16)
  - Success: Survive the onslaught through sheer determination. Gain 90 XP.
  - Failure: The assassin-construct's arsenal tears you apart. Roll injury roll twice and take both results. Your explorer starts the next game at half health. Word spreads among Skaven — your warband is marked as weak. Skaven enemies gain +1 Fight against you for the next two games.

• Undead, Vampire Courts, Cult of the Possessed: Veskit's mechanical implants detect undead and Chaos taint. His mission is clear: eliminate all threats to Skaven supremacy. Automatic attack, no negotiation. Make a Fight check (TN 17)
  - Success: Turn the hunter into hunted. Gain 120 XP and recover a warpstone implant worth 75gc.
  - Failure: Mechanical precision meets supernatural evil. Roll injury roll three times and take the worst two results. Your explorer is Out of Action for the next game. All Skaven enemies know your warband's location — they deployment zone is 4" larger in your next game against skaven.`,
  },
  {
    range: "60-61",
    title: "Countess Marianna Chevaux",
    description: `[Dramatis Personae - Half-Vampire Assassin]

In the shadows of a ruined palazzo, a woman moves with predatory grace. Pale skin, dark eyes that gleam with unnatural hunger — Countess Marianna Chevaux. Once a master thief and assassin, she stole the Noctu gem from the ancient Vampiress Serutat's crypt in Araby, only to be cursed with vampirism as punishment.

Neither fully alive nor truly undead, Marianna is a half-vampire — damned but not destroyed. She fled to Mordheim seeking anonymity, but her true purpose is darker: she hunts the city's vampires, torturing them for information about Serutat's whereabouts. The Vampiress has come to the Empire seeking revenge and the return of the Noctu. Marianna walks a razor's edge between hunter and hunted.

The black gem at her throat pulses with shadow-magic. She has learned its secret — a word of power that cloaks the bearer in living darkness. But Serutat's minions stalk the ruins, seeking their mistress's prize.

• Mercenaries, Cult of the Possessed, Skaven, Orcs: Make a Will check (TN 13) to earn the assassin's trust
  - Success: Marianna accepts your offer, seeing potential allies against Serutat. May hire for 150gc + 75gc upkeep
  - Failure: She vanishes into the shadows. You were being tested. No penalty.

• Witch Hunters, Sisters of Sigmar: Your explorer's holy aura triggers Marianna's predatory instincts. She attacks to silence the threat. Make a Will check (TN 17) to resist her vampiric presence, then Fight check (TN 16)
  - Success on both: Drive back the half-vampire and survive her wrath. Gain 140 XP.
  - Failure on Will: Dominated by her hypnotic gaze. Your explorer reveals your warband's location. In your next game, Serutat's vampire spawn appear as neutral enemies (1d3 Dregs with Vampire spawn trait) hunting for Marianna.
  - Failure on Fight: Her fangs pierce your neck. Roll injury roll and gain permanent Vampire Bite injury (-1 Health, -2 Will vs Vampires). Your explorer starts next game at half health.

• Vampire Courts, Undead: You serve Serutat's kind — Marianna's mortal enemies. She strikes from the shadows without warning. Make a Fight check (TN 17)
  - Success: Survive the assassination attempt. Gain 120 XP and claim a clue: you learn Marianna possesses the Noctu gem (this information may be valuable...).
  - Failure: The half-vampire's blades are laced with her own tainted blood. Roll injury roll twice and take both results. For the next game, Marianna actively hunts your warband — she appears as a neutral enemy figure at the start of the game, targeting your Hero with supernatural precision.`,
  },
  {
    range: "62-63",
    title: "Hrothnar, The Vessel Champion",
    description: `[Dramatis Personae - Possessed Champion]

The warrior stands in the shadow of a collapsed temple, his armour scorched and dented from countless battles. Dark runes writhe across his skin, pulsing with malevolent light. This is Hrothnar — once a champion of the Empire, now a living vessel for daemonic power.

The transformation began years ago when Hrothnar sought power to save his dying warband. A daemon offered strength beyond mortal limits, and in desperation, he accepted. The entity did not possess him fully — instead, it sealed itself within his flesh, waiting. Now Hrothnar walks a razor's edge between mortal and daemon, his own will barely keeping the creature contained.

But the seal weakens with each battle. When his body breaks, the daemon surges forth in terrible glory, healing his wounds and granting horrific power. Hrothnar has learned to control these moments, becoming more monster than man. Yet he still clings to fragments of his former self, seeking those who might understand — or those strong enough to end his cursed existence.

• Cult of the Possessed and Beastmen Raiders: You recognize a kindred spirit — one who embraces the power of Chaos. Make a Will check (TN 13) to forge an alliance
  - Success: Hrothnar's eyes flicker with dark approval. "You understand the price of power." May hire for 300gc + 20% upkeep. He brings his terrible might to your warband willingly.
  - Failure: The daemon within him senses weakness. Hrothnar attacks to test your worth. Make a Fight check (TN 15) or your explorer starts the next game at half health.

• Witch Hunters, Sisters of Sigmar, Sea Guard of Ulthuan, Wood Elves and Lizardmen: An abomination stands before you — a living vessel of Chaos that must be purged. Make a Fight check (TN 17) to strike him down
  - Success: Your righteous fury drives Hrothnar back! But as he falls, the Shattered Seal breaks — the daemon erupts forth in full glory, wreathed in dark power. You must flee. Gain 100 XP for facing such horror.
  - Failure: Hrothnar's martial prowess overwhelms you. Your explorer takes an injury roll. If they survive, they are marked by the daemon's touch: -1 Will during the next game.

• Undead and Vampire Courts: The daemon within Hrothnar recognizes the undead as enemies of Chaos. It surges against the seal, forcing confrontation. Make a Will check (TN 16) to escape
  - Success: You slip away before the daemon can fully manifest. Gain 80 XP for your cunning retreat.
  - Failure: The Shattered Seal breaks! Hrothnar transforms into something monstrous: Automatic Damage, Elemental Resistance, Immune to Critical Hits, Magic Attacks, Melt Weapon. Your explorer barely escapes with their life — they start the next game at half health and must roll on the injury table.

• All Other Warbands: Hrothnar offers a choice — hire him or leave in peace. Make a Will check (TN 14) to withstand the daemon's aura and negotiate
  - Success: You sense the danger but also the opportunity. May hire Hrothnar for 300gc + 40% upkeep. His power could turn the tide of battle.
  - Failure: The corruption emanating from him is too much. You flee without penalty, haunted by what you've seen.

Note: Hrothnar has the Demon trait and can choose 2 Daemonic Attributes at the start of each game. If reduced to 0 health, his Shattered Seal activates: he gains 10 health and Automatic Damage, Elemental Resistance (5), Immune to Critical Hits, Immune to Poison, Magic Attacks, Melt Weapon, and Resistant to Missile Weapons for the rest of the battle.`,
  },
  {
    range: "64-65",
    title: "Rotigus, the Rainfather",
    description: `[Dramatis Personae - Greater Demon of Nurgle]

The air thickens with the stench of decay. Flies swarm in impossible numbers, their droning buzz drowning out all other sound. Through the pestilential fog shambles a massive, bloated figure — Rotigus, the Rainfather, Greater Demon of Nurgle.

Where he walks, the very stones weep with corruption. His cyclopean eye surveys the ruins with ancient malevolence, his massive form dripping with foul ichor. This is no mindless beast, but an intelligence older than empires, a fragment of Nurgle's own putrid divinity made manifest.

The Garden of Nurgle calls to him here, in this city of the damned. The concentrated wyrdstone and desperate souls provide fertile ground for his master's work. But Rotigus does not serve freely — even demons have their price.

• Cult of the Possessed and Beastmen Raiders ONLY: The daemon recognizes kindred spirits corrupted by Chaos. Make a Will check (TN 16) to bind the Greater Demon. You may sacrifice a specialist soldier to gain +2 in this roll.
  - Success: Through dark rituals and blood sacrifice, you forge a pact with the Rainfather. May summon Rotigus as Dramatis Personae (Cost: 2 specialist soldiers as sacrifice + 2 specialist soldiers per game as upkeep). His presence is a blessing... and a curse.
  - Failure: Your will is insufficient. The daemon's laughter echoes like thunder as pestilential winds wash over you. Your explorer starts the next game poisoned. Gain 50 XP for surviving the encounter.

• Undead, Vampire Courts: The unliving are anathema to the Lord of Decay. Rotigus attacks immediately, seeking to drag your essence into Nurgle's Garden. Make a Will check (TN 18) to escape the daemon's wrath
  - Success: You flee before the Greater Demon's terrible power. Your explorer is shaken but alive. Gain 80 XP for surviving an encounter with true daemonic might.
  - Failure: The Winds of Putrescence overwhelm you. Your explorer starts the next game at half health and poisoned.

• All Other Warbands: Rotigus cares nothing for mortal affairs. Make a Will check (TN 14) to resist the Winds of Putrescence as you hastily retreat
  - Success: You escape the daemon's presence before the pestilent aura can take hold. The memory of his cyclopean gaze will haunt your dreams. Gain 60 XP.
  - Failure: The putrescent winds catch you before you can flee. Your explorer suffers 4 points of damage and becomes poisoned. The sickness will pass, but the scars remain.

Note: Rotigus has the following traits: Demon, Immune to Control Demon, Immune to Critical Hits, Immune to Mind Control, Magic Attacks, Spell Reflection. His Winds of Putrescence force Will Rolls (TN14) on all figures activating within 6", dealing 4 damage and poisoning on failure (Undead, Constructs, and Demons are immune).`,
  },
  {
    range: "66-67",
    title: "Abandoned Armory",
    description: `[Discovery - Equipment Cache]

Behind a collapsed wall, you discover a merchant's warehouse still sealed from the inside. Racks of weapons and armour stand covered in dust but intact — whoever locked this place died before they could return.

Make a Will check (TN 11) to safely navigate the trapped entrance.
• Success: Roll 1d3 times on the Magic Weapon/Armour tables. Your warband may purchase these items at 50% normal cost.
• Failure: You trigger a crossbow trap. Your explorer rolls on the injury table. If they survive, gain only 1 roll on the tables at normal price.`,
  },
  {
    range: "68-69",
    title: "Friendly Informant",
    description: `[Event - Information]

A hooded figure approaches cautiously. "I know things," they whisper. "Things about your enemies. For a price." Their information proves valuable — maps, patrol routes, weaknesses.

Pay 25gc and make a Will check (TN 12) to verify the information isn't a trap.
• Success: In your next game, you may redeploy up to 3 figures after seeing enemy deployment.
• Failure (or cannot pay): The "informant" was a spy. Your enemies know your plans. The enemy warband deploying zone is  2"bigger  in your next game. Lose the 25gc if paid.`,
  },
  {
    range: "70-71",
    title: "Prodigy Recruit",
    description: `[Event - Training]

Among your warband's soldiers, one shows exceptional promise. A veteran warrior offers to tutor this prodigy in advanced combat techniques — but the training is brutal.

Pay 20gc and choose one Henchman (soldier). Make a Will check (TN 11).
• Success: The training takes. The soldier immediately gains enough XP to level up and may take their advancement now.
• Failure (or cannot pay): The training is too harsh. The soldier gains 50 XP but starts the next game at half heath from the brutal regimen. If you couldn't pay, the veteran takes one random equipment piece as compensation.`,
  },
  {
    range: "72-73",
    title: "Black Market Contact",
    description: `[Event - Merchant]

In a hidden cellar, black marketeers spread their illicit wares. Rare items, forbidden goods, and stranger things besides. Your gold is welcome here.

Roll an extra time on the treasure table when using the Black Market rules. Additionally, roll with +2 bonus on all Black Market rolls until the next game.`,
  },
  {
    range: "74-75",
    title: "Apothecary's Stash",
    description: `[Discovery - Healing]

Among shattered vials and broken shelves, you find an intact chest of healing supplies. But some vials are cracked, leaking unknown substances. A test is required.

Make a Will check (TN 10) to identify safe potions from dangerous ones.
• Success: Gain 1d3 Healing Potions. Additionally, all injury rolls from the last game may be rerolled once (take second result).
• Failure: You accidentally consume a tainted potion while testing. Your explorer rolls on the Injury table damage and loses 20 XP (valuable time lost recovering). Gain only 1 Healing Potion.`,
  },
  {
    range: "76-77",
    title: "Training Grounds",
    description: `[Location - Training]

An old fighting pit, its sand still raked and ready. Training dummies stand in rows. This place could hone your warriors' skills — but someone still guards it.

Pay 30gc for access and make a Fight check (TN 12) to prove your warriors worthy of training here.
• Success: Choose one Henchman in your warband. They gain 50XP.
• Failure (or cannot pay): The training master rejects your warband as unworthy. The chosen henchment loses 30XP.`,
  },
  {
    range: "78-79",
    title: "Merchant Caravan",
    description: `[Event - Trade]

A merchant caravan has made camp in a fortified ruin. They're willing to trade, and their prices are fair — for Mordheim. But you must prove you're not raiders in disguise.

Make a Will check (TN 10) to establish peaceful trade relations.
• Success: Sell any treasures or equipment at +20% normal value. Additionally, you may purchase the items you rolled on your black market rolls at -10%.
• Failure: The merchants are suspicious and won't trade with you. They close their wagons. Your explorer loses 30 XP from the wasted journey. Additionally, lose access to Black Market rolls until after the next game.`,
  },
  {
    range: "80-81",
    title: "Veteran Warrior",
    description: `[Event - Training]

An old soldier, scarred and wise, offers to share his hard-won knowledge. "I've survived thirty years of war. Let me show you how." But his lessons are harsh, and not all students can endure them.

Pay 30gc and choose one Hero or Champion. Make a Fight check (TN 14).
• Success: They may immediately learn one power of your choice from their available power list. This does not count as their normal advancement.
• Failure (or cannot pay): The training breaks the student's body. The chosen Hero/Champion gains 50XP, but rolls on the Injury table, and do not learn any power.`,
  },
  {
    range: "82-83",
    title: "Ancient Shrine Blessing",
    description: `[Event - Divine Blessing]

You stumble upon an untouched shrine. The air shimmers with residual holy power. Those who pray here find unexpected strength. But Sigmar's blessing does not come to all equally.

• Witch Hunters, Sisters of Sigmar: Make a Will check (TN 8). Success: All figures in your warband gain +1 Will for the nextgames. Failure: Gain +1 Will during the first turn of the next game only. Your explorer loses 20 XP (Sigmar judges you unworthy of greater blessing).
• Mercenaries, Dwarfs, Lizardmen: Make a Will check (TN 11). Success: All figures gain +1 Will for the next game. Failure: Only your leader gains +1 Will. Lose 30 XP.(Sigmar judges you unworthy of greater blessing)
• Undead, Skaven, Cult of the Possessed, Orcs: The holy energy burns you. Make a Will check (TN 13) to resist. Success: Endure the pain for 50gc worth of blessed items that can be sold. Failure: Your explorer rolls on the Injury table and start the next game under the effects of a curse spell. The effect ends after the first turn of the game.
`,
  },
  {
    range: "84-85",
    title: "Wizard's Library",
    description: `[Discovery - Grimoire]

Dust-covered shelves hold ancient tomes. Most are worthless, but one catches your eye — a grimoire pulsing with arcane power. But arcane wards still protect it.

Make a Will check (TN 13) to safely claim the grimoire.
• Success: Roll once on the Grimoire table.
• Failure: The wards lash out. Your explorer rolls on the Injury table. If your warband has a spellcaster, they also roll on the Injury table from the magical backlash. However, the explorer is still able to find a single scroll. Roll once on the scrolls table.`,
  },
  {
    range: "86-87",
    title: "Lucky Find",
    description: `[Discovery - Treasure]

Your foot kicks something in the rubble. A nobleman's strongbox, still locked. Intricate mechanisms gleam within the lock — one wrong move and the contents might be destroyed.

Make a Fight check (TN 11) to force the lock without damaging the contents.
• Success: roll on theb treasure table immediately.
• Failure: The lock mechanism triggers, igniting alchemical fire inside. The coins melt together. Gain only 1d20gc. Your explorer loses 30 XP.`,
  },
  {
    range: "88-89",
    title: "Master Craftsman",
    description: `[Event - Upgrade]

In a hidden workshop, an old craftsman still plies his trade. "I can make your equipment... better," he offers. His hands are steady despite his age. "But my services don't come free, and not all work succeeds."

Pay 50gc and choose one weapon or armour equiped by the explorer. Make a Will check (TN 12).
• Success: The craftsman's work is flawless. The item gains +1 to damage (weapon) or +1 to armour value (armour) permanently. This stacks with other bonuses. This weapon cannot be made better by the craftsmen again.
• Failure (or cannot pay): The craftsman's hands slip. The item is lost.`,
  },
  {
    range: "90-91",
    title: "Warband-Specific Elite Find",
    description: `[Discovery - Elite Recruit]

An exceptional warrior seeks to join your cause — but first, you must prove your warband worthy of their skills.

Pay 40gc and make a Will check (TN 12) to convince them to join.

Success - Gain elite recruit based on warband:
• Vampire Courts: One Dreg with +2 to all stats permanently (Elite Thrall)
• Skaven: One Black Skaven at half cost able to use one Trick of the Trade (Frostgrave Folio).
• Witch Hunters: One Witch Hunter at half cost able to use one Trick of the Trade (Frostgrave Folio).
• Cult of the Possessed: One Mutant with one free random Major Demonic Trait, at the normal price.
• Orcs: One Orc Nob at half cost with +1 Fight
• Sisters of Sigmar: One Sister Superior at half cost able to use one Trick of the Trade (Frostgrave Folio).
• Dwarfs: One Dwarf Clansman with +1 to two stats of your choice,
• Mercenaries: One Man-at-Arms with and +1 to any stat of your choice and able to use one Trick of the Trade (Frostgrave Folio).
• Lizardmen: One Saurus Brave with +1 Fight and +2 Health

Failure (or cannot pay):
The warrior finds your warband unimpressive and spreads word of your weakness. The Explorer Lose 50 XP. If you couldn't pay the fee, also lose 30gc (word spreads that you're poor — merchants raise prices on you).`,
  },
  {
    range: "92-93",
    title: "Wyrdstone Vein",
    description: `[Discovery - Major Find]

The green glow is unmistakable. You've found a pocket of wyrdstone still embedded in the ruins — more than you've ever seen in one place. But the corrupted energy is overwhelming.

Make a Will check (TN 13) to resist the wyrdstone's corrupting influence while extracting it.
• Success: Roll 3 times on the Treasure table.
• Failure: Roll 3 times on the Trasure table, but the Explorer gains a random mutation from the Grave Mutations supplement. This mutation may be healed with an Miraculous Cure spell..`,
  },
  {
    range: "94-95",
    title: "Secret Alliance",
    description: `[Event - Alliance]

Representatives from another warband approach under flag of truce. They offer temporary alliance and share valuable intelligence — but alliances in Mordheim are fragile things.

Pay 50gc (good faith payment) and make a Will check (TN 11) to secure the alliance.
• Success: Gain 100gc in shared resources (net +50gc) and +2 Initiative rolls during the next game due to shared intel.
• Failure (or cannot pay): The alliance falls through. If you paid the 50gc, it's lost to bad faith negotiations. Your explorer loses 40 XP from the diplomatic failure. Word spreads of your untrustworthiness — You cannot make Black Market rolls until after the next game.`,
  },
  {
    range: "96-97",
    title: "Master's Legacy",
    description: `[Discovery - Artifact]

Hidden in a secret compartment, you find an artifact of tremendous power. Its previous owner won't need it anymore.

Roll 1d20:
1-5: Roll once on the Magic Weapon/Armour table.
6-10: Roll once on the Magic Items table.
11-19: Roll once on the Grimoires table.
20: Roll three times on any of these tables, in any combination.`,
  },
  {
    range: "98-99",
    title: "Hero's Epiphany",
    description: `[Event - Advancement]

In the quiet of the ruins, your explorer reflects on recent battles. Lessons learned through blood and survival crystallize into new understanding.

The explorer immediately gains enough XP to reach their next level (if not already at maximum). They may take their advancement immediately. Additionally, the hero gains +1 in one stat permanently.`,
  },
  {
    range: "00",
    title: "Legendary Discovery",
    description: `[Discovery - Ultimate Fortune]

You've found something extraordinary — the kind of discovery that legends are made of. Choose one of the following:

• The Treasure Hoard: Gain 500gc immediately plus 5 rolls on the Treasure table.
• The Ancient Grimoire: Gain a Grimoire containing 3 spells of your choice from any school. The Spellcaster learn the three spells in a single advancement.
• The Warband Blessing: All figures in your warband permanently gain +1 to any stat of your choice (applied individually)
• The Sacred Relic: Gain a powerful artifact that grants your leader +3 to Will, immunity to Fear, and the ability to activate one power per game without rolling (automatic success).
• The Book of Transcendence: A spellcaster may learn the True Seeing spell from this Spellbook when making an advancement.
• Phylactery: A Necromancer may learn the Lichdom spell.
• The Perfect Recruit: Recruit any Dramatis Personae that can be hired by your warband for free (no hire fee, half upkeep). They join willingly without any checks required.

Additionally, your warband's reputation soars. Gain +5 to all Black Market rolls for the rest of the campaign.
`,
  },
];

function ExplorationPage() {
  const navigate = useNavigate();

  const events = explorationEvents.map((event) => ({
    id: slugify(event.title, { lower: true }),
    label: `${event.range}: ${event.title}`,
    type: "Event",
  }));

  const sections = [
    {
      id: "exploration-rules",
      label: "Exploration Rules",
      type: "Rules",
    },
    ...events,
  ];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Exploring Mordheim" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "Every street holds secrets, every ruin a treasure or a trap. Those
            brave—or foolish—enough to venture alone into the darkness might
            find fortune beyond imagining... or a grave with no marker."
            <QuoteAttribution>
              — Tales of the Damned City, Anonymous
            </QuoteAttribution>
          </QuoteBox>

          <div id="exploration-rules">
            <ParchmentText sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <strong style={{ color: "#d4af37", fontSize: "1.6rem" }}>
                Exploration Rules
              </strong>
              <p>
                Between games, Heroes and Champions who survived the last battle
                may venture into the ruins of Mordheim to seek treasure, allies,
                and opportunities. The cursed city holds many secrets, and those
                brave enough to explore its darkened streets may find fortune —
                or death.
              </p>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Who Can Explore
              </strong>
              <br />
              <br />
              Only certain members of your warband are capable of independent
              exploration of Mordheim's dangerous ruins.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Eligible Explorers:</strong>
              <br />• <strong>Heroes</strong> may explore if they were not taken
              Out of Action in the last game
              <br />• <strong>Champions</strong> may explore if they were not
              taken Out of Action in the last game
              <br />• A warband may send both their Hero and Champion to explore
              separately, rolling on the table twice
              <br />• Regular soldiers are assumed to be helping the Hero or
              Champion explore, being coordinated by them.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                The Exploration Phase
              </strong>
              <br />
              <br />
              Exploration happens during the post-game sequence, after injuries
              have been resolved and treasure has been rolled and before
              spending experience.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Exploration Steps:</strong>
              <br />• <strong>Declare Explorers:</strong> Choose which Heroes
              and/or Champions will explore (if any are eligible)
              <br />• <strong>Roll for Each Explorer:</strong> For each
              explorer, roll 1d100 on the Exploration Events table below
              <br />• <strong>Resolve Events:</strong> Resolve each event
              immediately, following the instructions in the event description
              <br />• <strong>Pay Costs or Make Checks:</strong> Many events
              require payment, stat checks (Fight, Shoot, Will), or both
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Understanding the Table
              </strong>
              <br />
              <br />
              The Exploration Table is structured to balance risk and reward.
              Understanding the odds helps you decide whether to send your
              valuable Heroes and Champions into danger.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                The Exploration Table Structure:
              </strong>
              <br />• <strong>Low Rolls (01-15):</strong> Dangerous events —
              ambushes, traps, or finding nothing at all. Greater risk, modest
              rewards
              <br />• <strong>Mid-Range (16-65):</strong> Locations, Hired
              Swords, and legendary Dramatis Personae. Mixed opportunities
              requiring negotiation or combat
              <br />• <strong>High Rolls (66-97):</strong> Increasingly valuable
              discoveries with minimal danger — treasure caches, training
              opportunities, and equipment
              <br />• <strong>Very High (98-99):</strong> Exceptional fortune —
              immediate advancement and permanent bonuses
              <br />• <strong>Perfect Roll (00):</strong> Legendary discovery —
              campaign-changing rewards that can define your warband's legacy
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Event Types
              </strong>
              <br />
              <br />
              Exploration events fall into several categories, each with
              different mechanics and outcomes.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Event Categories:</strong>
              <br />• <strong>[Event]:</strong> Immediate occurrences requiring
              quick decisions or stat checks. Effects happen instantly
              <br />• <strong>[Discovery]:</strong> Finding treasure, equipment,
              or resources. Often requires checks to secure safely
              <br />• <strong>[Location]:</strong> Safe havens or bases your
              warband can occupy. Provides ongoing benefits
              <br />• <strong>[Hired Sword]:</strong> Encounters with
              mercenaries who may join your warband. Depends on warband type and
              negotiations
              <br />• <strong>[Dramatis Personae]:</strong> Meetings with unique
              legendary individuals. Extremely powerful but often dangerous or
              expensive
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Stat Checks During Exploration
              </strong>
              <br />
              <br />
              Many exploration events require the explorer to make stat checks
              using their Fight, Shoot, or Will values.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Making Stat Checks:</strong>
              <br />• Roll 1d20 and add the explorer's stat modifier (Fight,
              Shoot, or Will as specified)
              <br />• Compare the result to the Target Number (TN) listed in the
              event
              <br />• If your result equals or exceeds the TN, you succeed
              <br />• If your result is lower than the TN, you fail and suffer
              the consequences
              <br />• Some events list "Automatic" checks — these cannot be
              avoided and must be rolled even if you don't want to engage
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Example: Your Hero with Fight +3 encounters an event requiring a
                Fight check (TN 15). You roll 1d20 and get 14. Add your Fight +3
                for a total of 17. Since 17 ≥ 15, you succeed.
              </em>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Costs and Payments
              </strong>
              <br />
              <br />
              Some events require payment in gold crowns (gc), wyrdstone shards,
              or other resources. These costs must be paid from your warband's
              treasury.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Payment Rules:</strong>
              <br />• If an event lists a cost, you may choose to pay it or not
              (unless stated otherwise)
              <br />• If you cannot or will not pay, the event describes the
              consequences
              <br />• Some events offer better outcomes if you pay, but have
              fallback options if you don't
              <br />• Payment happens immediately when the event is resolved —
              deduct the cost from your warband sheet
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Risk Management
              </strong>
              <br />
              <br />
              Exploration is inherently risky. Your Heroes and Champions can be
              injured, killed, or captured. Consider these factors before
              sending them into the ruins.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Exploration Risks:</strong>
              <br />• <strong>Injury Rolls:</strong> Some events force your
              explorer to roll on the Injury table. They could be killed
              permanently
              <br />• <strong>Experience Loss:</strong> Failed negotiations or
              poor decisions can cost your explorer hard-earned XP
              <br />• <strong>Gold Loss:</strong> Thieves, failed transactions,
              and traps can drain your treasury
              <br />• <strong>Permanent Consequences:</strong> Some events
              create lasting effects (bounties, enemies, curses) that affect
              future games
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Risk vs Reward:</strong>
              <br />
              Consider your explorer's current stats when deciding whether to
              explore. A Hero with low Will is more likely to fail Will checks,
              while a Champion with high Fight can better handle combat
              encounters. Sometimes it's wiser to skip exploration and keep your
              leaders safe for the next battle.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Special Interactions
              </strong>
              <br />
              <br />
              Many events have different outcomes based on your warband's type.
              Undead, Skaven, and Chaos warbands often face hostility from good
              characters, while lawful warbands may have trouble with criminals
              and dark mages.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Warband-Specific Outcomes:
              </strong>
              <br />• Read each event carefully — many list different options
              for different warband types
              <br />• "Good" warbands (Witch Hunters, Sisters of Sigmar) often
              face moral dilemmas or refuse to work with criminals
              <br />• "Evil" warbands (Undead, Possessed, Skaven) are often
              attacked on sight by holy warriors and heroes
              <br />• "Neutral" warbands (Mercenaries, Dwarfs, Orcs) usually
              have the most flexibility in negotiations
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                The Exploration Table:
              </strong>
              <br />
              Lower rolls (01-15) carry greater risks but modest rewards.
              Mid-range rolls (16-65) offer locations, hired swords, and
              legendary Dramatis Personae. Higher rolls (66-99) bring
              increasingly valuable discoveries with minimal danger. Rolling 00
              grants legendary fortune — the kind of discovery that changes a
              warband's fate forever.
            </ParchmentText>
          </div>

          {explorationEvents.map((event, index) => (
            <div key={index} id={slugify(event.title, { lower: true })}>
              <EventCard>
                <EventHeader>
                  <DiceRange>{event.range}</DiceRange>
                  <EventTitle>{event.title}</EventTitle>
                </EventHeader>
                <EventDescription
                  sx={{
                    whiteSpace: "pre-line",
                  }}
                >
                  {event.description}
                </EventDescription>
              </EventCard>
            </div>
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/rules")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Back to New Rules
          </StyledNavigationButton>

          <Box
            sx={{
              borderTop: "1px solid rgba(139, 115, 85, 0.3)",
              pt: 3,
              mt: 2,
            }}
          >
            <StyledNavigationButton
              onClick={() => navigate("/")}
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: "rgba(20, 18, 14, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(28, 24, 18, 0.8)",
                },
              }}
            >
              Return to Main Page
            </StyledNavigationButton>
          </Box>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default ExplorationPage;
